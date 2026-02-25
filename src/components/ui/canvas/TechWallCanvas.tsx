"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

function NodeNetwork() {
    const groupRef = useRef<THREE.Group>(null);
    const { mouse, viewport } = useThree();

    // Generate random nodes
    const nodeCount = 150;
    const nodes = useMemo(() => {
        const positions = new Float32Array(nodeCount * 3);
        const points = [];
        for (let i = 0; i < nodeCount; i++) {
            // Spread nodes across the viewport
            const x = (Math.random() - 0.5) * viewport.width * 1.5;
            const y = (Math.random() - 0.5) * viewport.height * 1.5;
            const z = (Math.random() - 0.5) * 5; // Slight depth
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
            points.push(new THREE.Vector3(x, y, z));
        }
        return { positions, points };
    }, [viewport]);

    // Generate connecting lines between close nodes
    const lines = useMemo(() => {
        const connections = [];
        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                const distance = nodes.points[i].distanceTo(nodes.points[j]);
                if (distance < 2.0) { // Connection threshold
                    connections.push([nodes.points[i], nodes.points[j]]);
                }
            }
        }
        return connections;
    }, [nodes]);

    // Animation & Parallax Hook
    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Slow chaotic rotation
        groupRef.current.rotation.y += delta * 0.05;
        groupRef.current.rotation.x += delta * 0.02;

        // Mouse Parallax effect
        const targetX = (mouse.x * viewport.width) / 10;
        const targetY = (mouse.y * viewport.height) / 10;

        groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
        groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    });

    return (
        <group ref={groupRef}>
            {/* The Nodes */}
            <Points positions={nodes.positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00ffcc"
                    size={0.08}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>

            {/* The Connecting Lines */}
            {lines.map((line, idx) => (
                <Line
                    key={idx}
                    points={line}
                    color="#00ffcc"
                    lineWidth={0.5}
                    transparent
                    opacity={0.15}
                />
            ))}
        </group>
    );
}

export default function TechWallCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 10], fov: 45 }}
            className="w-full h-full"
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
        >
            <ambientLight intensity={0.5} />
            <Float
                speed={1} // Animation speed
                rotationIntensity={0.2} // XYZ rotation intensity
                floatIntensity={0.5} // Up/down float intensity
            >
                <NodeNetwork />
            </Float>
            <fog attach="fog" args={["#000000", 5, 20]} />
        </Canvas>
    );
}
