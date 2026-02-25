"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

// Simple noise-based displacement fragment shader
const fragmentShader = `
uniform sampler2D uTexture;
uniform float uHoverState;
uniform float uTime;
varying vec2 vUv;

// Basic 2D noise
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;
    
    // Liquid ripple distortion based on hover and time
    float distortion = sin(uv.y * 10.0 + uTime * 2.0) * 0.05 * uHoverState;
    distortion += sin(uv.x * 20.0 - uTime) * 0.02 * uHoverState;
    
    uv.x += distortion;
    uv.y += distortion;
    
    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
}
`;

const vertexShader = `
varying vec2 vUv;
uniform float uHoverState;
uniform float uTime;

void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Subtle z-displacement on hover
    pos.z += sin(pos.x * 5.0 + uTime) * 0.1 * uHoverState;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

function LiquidImageMesh({ imageUrl, alt }: { imageUrl: string; alt: string }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const texture = useTexture(imageUrl);
    const [hovered, setHovered] = useState(false);

    const uniforms = useMemo(
        () => ({
            uTexture: { value: texture },
            uHoverState: { value: 0.0 },
            uTime: { value: 0.0 },
        }),
        [texture]
    );

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    const handlePointerOver = () => {
        setHovered(true);
        gsap.to(uniforms.uHoverState, {
            value: 1.0,
            duration: 1.2,
            ease: "expo.out",
        });
    };

    const handlePointerOut = () => {
        setHovered(false);
        gsap.to(uniforms.uHoverState, {
            value: 0.0,
            duration: 1.2,
            ease: "expo.out",
        });
    };

    return (
        <mesh
            ref={meshRef}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
            <planeGeometry args={[5, 3, 32, 32]} />
            <shaderMaterial
                ref={materialRef}
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
}

export default function LiquidImage({ imageUrl, alt }: { imageUrl: string; alt: string }) {
    return (
        <div className="w-full h-full relative overflow-hidden rounded-[2.5rem] bg-slate-950">
            {/* Fallback image for accessibility/parsing if 3D fails */}
            <img src={imageUrl} alt={alt} className="sr-only" />
            <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                <LiquidImageMesh imageUrl={imageUrl} alt={alt} />
            </Canvas>
        </div>
    );
}
