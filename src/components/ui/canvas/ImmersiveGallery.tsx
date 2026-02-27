"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───
interface CardData {
    title: string;
    image: string;
    position: [number, number, number];
    scale?: number;
}

// ─── Scroll state shared between DOM and R3F ───
const scrollState = {
    progress: 0,
    mouseX: 0,
    mouseY: 0,
    velocity: 0,
    mouseActive: 0,
    lastMouseMove: 0,
};

// ─── Displacement Shader Background (merged into this scene) ───
const bgVertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const bgFragmentShader = `
precision highp float;
varying vec2 vUv;

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uMouseActive;
uniform sampler2D uTexture;

float ripple(vec2 uv, vec2 center, float age, float strength) {
    float dist = length(uv - center);
    float wave = sin(dist * 30.0 - age * 6.0) * exp(-dist * 5.0) * exp(-age * 1.2);
    return wave * strength;
}

void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 uvA = vec2((uv.x - 0.5) * aspect + 0.5, uv.y);
    float eps = 0.004;
    vec2 mouseA = vec2((uMouse.x - 0.5) * aspect + 0.5, uMouse.y);

    // Mouse ripples
    float rC = ripple(uvA, mouseA, 0.0, 1.0) * uMouseActive;
    float rX = ripple(uvA + vec2(eps, 0.0), mouseA, 0.0, 1.0) * uMouseActive;
    float rY = ripple(uvA + vec2(0.0, eps), mouseA, 0.0, 1.0) * uMouseActive;

    // Autonomous emitters
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

    float totalC = rC + a1C + a2C;
    float totalX = rX + a1X + a2X;
    float totalY = rY + a1Y + a2Y;

    vec2 distortedUV = uv + vec2(totalC * 0.02);
    vec4 texColor = texture2D(uTexture, distortedUV);

    // Normal from ripples
    vec3 rippleNormal = normalize(vec3(
        -(totalX - totalC) / eps * 1.5,
        -(totalY - totalC) / eps * 1.5,
        1.0
    ));

    // Lighting
    vec3 lightPos = vec3(mouseA, 0.5);
    vec3 fragPos = vec3(uvA, 0.0);
    vec3 lightDir = normalize(lightPos - fragPos);
    float diff = max(dot(rippleNormal, lightDir), 0.0);
    vec3 halfDir = normalize(lightDir + vec3(0.0, 0.0, 1.0));
    float spec = pow(max(dot(rippleNormal, halfDir), 0.0), 48.0);

    vec3 lit = texColor.rgb * (0.7 + diff * 0.4) + vec3(0.4, 0.6, 0.9) * spec * 0.25;

    // Dark theme: invert luminance
    float lum = dot(lit, vec3(0.299, 0.587, 0.114));
    vec3 inverted = vec3(1.0 - lum) * 0.15;
    float colorAmount = length(lit - vec3(lum)) * 3.0;
    vec3 circuitGlow = lit * 1.8;
    vec3 darkened = mix(inverted, circuitGlow, clamp(colorAmount, 0.0, 1.0));
    darkened *= vec3(0.6, 0.7, 0.9);
    darkened = clamp(darkened, 0.0, 1.0);

    float vignette = 1.0 - length((uv - 0.5) * 1.3) * 0.3;
    darkened *= vignette;
    vec3 finalColor = mix(vec3(0.02, 0.03, 0.06), darkened, 0.8);

    gl_FragColor = vec4(finalColor, 1.0);
}
`;

function ShaderBackground() {
    const meshRef = useRef<THREE.Mesh>(null);
    const { size, camera } = useThree();
    const texture = useLoader(THREE.TextureLoader, "/images/Spatial_background_ (1).webp");

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

    useFrame((state) => {
        const mat = meshRef.current?.material as THREE.ShaderMaterial;
        if (!mat || !meshRef.current) return;

        mat.uniforms.uTime.value = state.clock.getElapsedTime();
        mat.uniforms.uMouse.value.set(
            scrollState.mouseX * 0.5 + 0.5,
            scrollState.mouseY * -0.5 + 0.5
        );

        const elapsed = (performance.now() - scrollState.lastMouseMove) / 1000;
        mat.uniforms.uMouseActive.value = Math.max(0, 1 - elapsed / 3);

        // Keep background plane in front of camera, far away
        meshRef.current.position.copy(camera.position);
        meshRef.current.position.z -= 60;
        meshRef.current.lookAt(camera.position);
    });

    return (
        <mesh ref={meshRef} scale={[120, 70, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                vertexShader={bgVertexShader}
                fragmentShader={bgFragmentShader}
                uniforms={uniforms}
                depthWrite={false}
                depthTest={false}
            />
        </mesh>
    );
}

// ─── 3D Project Card ───
function ProjectCard3D({
    position,
    image,
    scale = 1,
}: {
    position: [number, number, number];
    image: string;
    scale?: number;
}) {
    const meshRef = useRef<THREE.Group>(null);
    const { camera } = useThree();
    const texture = useLoader(THREE.TextureLoader, image);

    useFrame(() => {
        if (!meshRef.current) return;
        const group = meshRef.current;

        // Mouse-reactive tilt
        group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, scrollState.mouseX * 0.15, 0.05);
        group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -scrollState.mouseY * 0.1, 0.05);

        // Distance-based opacity
        const dist = camera.position.distanceTo(group.position);
        const opacity = THREE.MathUtils.clamp(1 - Math.max(0, dist - 12) / 15, 0, 1);
        group.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material) {
                (child.material as THREE.MeshStandardMaterial).opacity = opacity;
            }
        });
    });

    return (
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
            <group ref={meshRef} position={position}>
                {/* Card frame */}
                <mesh scale={[3.5 * scale, 2.5 * scale, 0.05]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial
                        color="#0a0a1a"
                        metalness={0.6}
                        roughness={0.3}
                        transparent
                    />
                </mesh>
                {/* Image face */}
                <mesh position={[0, 0, 0.03]} scale={[3.3 * scale, 2.3 * scale, 1]}>
                    <planeGeometry args={[1, 1]} />
                    <meshStandardMaterial
                        map={texture}
                        transparent
                        metalness={0.1}
                        roughness={0.8}
                    />
                </mesh>
            </group>
        </Float>
    );
}

// ─── Horizontal Parallax Card ───
function ParallaxCard({
    baseX, y, z, speed, color
}: {
    baseX: number; y: number; z: number; speed: number; color: string;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (!meshRef.current) return;
        const horizProgress = Math.max(0, (scrollState.progress - 0.55) / 0.35);
        meshRef.current.position.x = baseX - horizProgress * 20 * speed;
        meshRef.current.rotation.y = scrollState.mouseX * 0.08;
        meshRef.current.rotation.x = -scrollState.mouseY * 0.05;
    });

    return (
        <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
            <mesh ref={meshRef} position={[baseX, y, z]}>
                <boxGeometry args={[2.5, 1.8, 0.08]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.4}
                    roughness={0.6}
                    transparent
                    opacity={0.85}
                />
            </mesh>
        </Float>
    );
}

// ─── Camera Rig ───
function CameraRig() {
    const { camera } = useThree();

    useFrame(() => {
        const p = scrollState.progress;
        const targetZ = 20 - p * 60;
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, scrollState.mouseX * 1.5, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, scrollState.mouseY * 0.8, 0.04);
        camera.lookAt(camera.position.x * 0.5, camera.position.y * 0.3, camera.position.z - 10);
    });

    return null;
}

// ─── Particles ───
function Particles() {
    const count = 150;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 80 - 10;
        }
        return pos;
    }, []);
    const ref = useRef<THREE.Points>(null);
    useFrame(() => { if (ref.current) ref.current.rotation.y += 0.0003; });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.04} color="#4488ff" transparent opacity={0.4} sizeAttenuation />
        </points>
    );
}

// ─── Main Scene ───
function Scene({ cards }: { cards: CardData[] }) {
    const horizCards = useMemo(() => [
        { baseX: 5, y: 0, z: -35, speed: 1.0, color: "#1a2744" },
        { baseX: 10, y: 1.5, z: -37, speed: 0.6, color: "#1f3355" },
        { baseX: 15, y: -1, z: -33, speed: 1.4, color: "#142240" },
        { baseX: 20, y: 0.5, z: -36, speed: 0.8, color: "#1a3050" },
        { baseX: 25, y: -0.5, z: -34, speed: 1.2, color: "#162d48" },
        { baseX: 30, y: 1, z: -38, speed: 0.5, color: "#1e3860" },
    ], []);

    return (
        <>
            <CameraRig />

            {/* Shader background — rendered FIRST, behind everything */}
            <ShaderBackground />

            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#6688cc" />
            <pointLight position={[-5, -5, -10]} intensity={0.4} color="#4466aa" />

            {/* Particles */}
            <Particles />

            {/* Gallery Cards */}
            {cards.map((card, i) => (
                <ProjectCard3D key={i} position={card.position} image={card.image} scale={card.scale || 1} />
            ))}

            {/* Horizontal Parallax Cards */}
            {horizCards.map((hc, i) => (
                <ParallaxCard key={`horiz-${i}`} {...hc} />
            ))}
        </>
    );
}

// ─── Exported Component ───
export default function ImmersiveGallery({ cards }: { cards: CardData[] }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
                scrollState.velocity = self.getVelocity() / 1000;
                scrollState.progress = self.progress;
            },
        });

        const onMouseMove = (e: MouseEvent) => {
            scrollState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            scrollState.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
            scrollState.lastMouseMove = performance.now();
        };
        window.addEventListener("mousemove", onMouseMove);

        return () => {
            trigger.kill();
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
            <div className="fixed inset-0 w-full h-full" style={{ zIndex: 0 }}>
                <Canvas
                    camera={{ position: [0, 0, 20], fov: 50 }}
                    gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
                    dpr={[1, 1.5]}
                    style={{ background: "#050510" }}
                >
                    <Scene cards={cards} />
                </Canvas>
            </div>
        </div>
    );
}
