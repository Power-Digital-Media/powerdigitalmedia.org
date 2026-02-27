"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";

/*
 * Immersive Garden-style displacement shader using the user's circuit marble images.
 * The image is displayed with fluid ripple distortion from mouse movement + autonomous emitters.
 * Ripples distort normals → lighting reveals the 3D texture (bas-relief feel).
 */

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;
varying vec2 vUv;

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uMouseActive;
uniform sampler2D uTexture;

// ── Ripple function ──
float ripple(vec2 uv, vec2 center, float age, float strength) {
    float dist = length(uv - center);
    float wave = sin(dist * 30.0 - age * 6.0) * exp(-dist * 5.0) * exp(-age * 1.2);
    return wave * strength;
}

void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 uvA = vec2((uv.x - 0.5) * aspect + 0.5, uv.y);

    // ── Compute ripple displacement ──
    float eps = 0.004;
    vec2 mouseA = vec2((uMouse.x - 0.5) * aspect + 0.5, uMouse.y);

    // Mouse ripples
    float rC = ripple(uvA, mouseA, 0.0, 1.0) * uMouseActive;
    float rX = ripple(uvA + vec2(eps, 0.0), mouseA, 0.0, 1.0) * uMouseActive;
    float rY = ripple(uvA + vec2(0.0, eps), mouseA, 0.0, 1.0) * uMouseActive;

    // Autonomous wandering emitters
    vec2 auto1 = vec2(0.5 + sin(uTime * 0.25) * 0.35, 0.5 + cos(uTime * 0.2) * 0.35);
    vec2 auto1A = vec2((auto1.x - 0.5) * aspect + 0.5, auto1.y);
    float a1C = ripple(uvA, auto1A, mod(uTime * 0.8, 4.0), 0.35);
    float a1X = ripple(uvA + vec2(eps, 0.0), auto1A, mod(uTime * 0.8, 4.0), 0.35);
    float a1Y = ripple(uvA + vec2(0.0, eps), auto1A, mod(uTime * 0.8, 4.0), 0.35);

    vec2 auto2 = vec2(0.5 + cos(uTime * 0.18) * 0.4, 0.5 + sin(uTime * 0.15) * 0.3);
    vec2 auto2A = vec2((auto2.x - 0.5) * aspect + 0.5, auto2.y);
    float a2C = ripple(uvA, auto2A, mod(uTime * 0.6 + 2.0, 4.0), 0.25);
    float a2X = ripple(uvA + vec2(eps, 0.0), auto2A, mod(uTime * 0.6 + 2.0, 4.0), 0.25);
    float a2Y = ripple(uvA + vec2(0.0, eps), auto2A, mod(uTime * 0.6 + 2.0, 4.0), 0.25);

    // Total displacement gradient
    float totalC = rC + a1C + a2C;
    float totalX = rX + a1X + a2X;
    float totalY = rY + a1Y + a2Y;

    // Displace UV for liquid distortion on the texture
    vec2 distortedUV = uv + vec2(totalC * 0.02, totalC * 0.02);

    // Sample the circuit marble texture with distortion
    vec4 texColor = texture2D(uTexture, distortedUV);

    // ── Normal from ripples for lighting ──
    vec3 rippleNormal = normalize(vec3(
        -(totalX - totalC) / eps * 1.5,
        -(totalY - totalC) / eps * 1.5,
        1.0
    ));

    // ── Lighting ──
    vec3 lightPos = vec3(mouseA, 0.5);
    vec3 fragPos = vec3(uvA, 0.0);
    vec3 lightDir = normalize(lightPos - fragPos);

    float diff = max(dot(rippleNormal, lightDir), 0.0);
    vec3 halfDir = normalize(lightDir + vec3(0.0, 0.0, 1.0));
    float spec = pow(max(dot(rippleNormal, halfDir), 0.0), 48.0);

    // Apply lighting to the texture
    vec3 lit = texColor.rgb * (0.7 + diff * 0.4) + vec3(0.4, 0.6, 0.9) * spec * 0.25;

    // ── Dark theme inversion ──
    // Invert luminance: marble white → dark, circuit traces → glowing
    float lum = dot(lit, vec3(0.299, 0.587, 0.114));
    // Dark base: high luminance (marble) = dark, low luminance (circuit) = bright
    vec3 inverted = vec3(1.0 - lum) * 0.15;
    // Preserve circuit color detail where the image is dark (has color)
    float colorAmount = length(lit - vec3(lum)) * 3.0; // saturation
    vec3 circuitGlow = lit * 1.8; // boost original colors
    vec3 darkened = mix(inverted, circuitGlow, clamp(colorAmount, 0.0, 1.0));

    // Overall dark tint
    darkened *= vec3(0.6, 0.7, 0.9); // cool blue cast
    darkened = clamp(darkened, 0.0, 1.0);

    // Subtle vignette
    float vignette = 1.0 - length((uv - 0.5) * 1.3) * 0.3;
    darkened *= vignette;

    // Dark base blend
    vec3 finalColor = mix(vec3(0.02, 0.03, 0.06), darkened, 0.8);

    gl_FragColor = vec4(finalColor, 1.0);
}
`;

function DisplacementPlane({ textureUrl }: { textureUrl: string }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const { size } = useThree();
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const mouseActiveRef = useRef(0);
    const lastMouseMoveRef = useRef(0);
    const texture = useLoader(THREE.TextureLoader, textureUrl);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
        uMouseActive: { value: 0 },
        uTexture: { value: texture },
    }), [texture]);

    useEffect(() => {
        uniforms.uResolution.value.set(size.width, size.height);
    }, [size, uniforms]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX / window.innerWidth;
            mouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
            mouseActiveRef.current = 1;
            lastMouseMoveRef.current = performance.now();
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useFrame((state) => {
        const mat = meshRef.current?.material as THREE.ShaderMaterial;
        if (!mat) return;
        mat.uniforms.uTime.value = state.clock.getElapsedTime();
        mat.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
        const elapsed = (performance.now() - lastMouseMoveRef.current) / 1000;
        mouseActiveRef.current = Math.max(0, 1 - elapsed / 3);
        mat.uniforms.uMouseActive.value = mouseActiveRef.current;
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

export default function CircuitRevealBackground() {
    // Cycle through the 3 spatial background images
    const images = [
        "/images/Spatial_background_ (1).webp",
        "/images/Spatial_background_ (2).webp",
        "/images/Spatial_background_ (3).webp",
    ];
    const [currentImage] = useState(0);

    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
            <Canvas
                className="w-full h-full"
                gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 1] }}
                style={{ pointerEvents: "none" }}
            >
                <DisplacementPlane textureUrl={images[currentImage]} />
            </Canvas>
        </div>
    );
}
