"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Environment } from "@react-three/drei";
import * as THREE from "three";

export default function Scene() {
    const sphereRef = useRef<THREE.Mesh>(null);

    // Subtle floating animation inside the canvas context
    useFrame((state) => {
        if (!sphereRef.current) return;
        const t = state.clock.getElapsedTime();
        sphereRef.current.position.y = Math.sin(t / 2) * 0.2;
        sphereRef.current.rotation.x = t * 0.1;
        sphereRef.current.rotation.y = t * 0.15;
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="#3b82f6" />
            <directionalLight position={[-10, -10, -5]} intensity={1} color="#22d3ee" />

            <Sphere ref={sphereRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
                <MeshDistortMaterial
                    color="#050a1f"
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    metalness={0.8}
                    roughness={0.2}
                    distort={0.4}
                    speed={2}
                />
            </Sphere>
            <Environment preset="city" />
        </>
    );
}
