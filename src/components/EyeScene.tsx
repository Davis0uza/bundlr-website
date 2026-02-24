"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface EyeProps {
    position: [number, number, number];
    mousePos: { x: number; y: number };
}

function Eye({ position, mousePos }: EyeProps) {
    const groupRef = useRef<THREE.Group>(null);
    const target = useMemo(() => new THREE.Vector3(), []);

    useFrame((state) => {
        if (!groupRef.current) return;

        // Target for the eyes to look at
        // Amplified range for more expressive looking
        target.set(mousePos.x * 2.8, mousePos.y * 2.8, 5);

        // Smooth rotation
        const currentRotation = groupRef.current.quaternion.clone();
        groupRef.current.lookAt(target);
        const targetRotation = groupRef.current.quaternion.clone();
        groupRef.current.quaternion.copy(currentRotation).slerp(targetRotation, 0.2);

        // Subtle floating movement
        const time = state.clock.getElapsedTime();
        groupRef.current.position.y = position[1] + Math.sin(time * 1.5 + (position[0] > 0 ? 0.3 : 0)) * 0.04;
    });

    return (
        <group ref={groupRef} position={position}>
            {/* 1. Sclera (White Part) - Slightly smaller radius to prevent clipping */}
            <mesh>
                <sphereGeometry args={[0.75, 64, 64]} />
                <meshStandardMaterial
                    color="#ffffff"
                    roughness={0.2}
                    metalness={0.0}
                    emissive="#ffffff"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* 2. Iris (Blue circle) - Positioned on the surface (0.75 * 1.01) */}
            <mesh position={[0, 0, 0.76]} scale={[1, 1, 0.02]}>
                <sphereGeometry args={[0.48, 32, 32]} />
                <meshBasicMaterial color="#a2d3ee" />
            </mesh>

            {/* 3. Pupil (Pure Black) - Layered correctly */}
            <mesh position={[0, 0, 0.77]} scale={[1, 1, 0.02]}>
                <sphereGeometry args={[0.28, 32, 32]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* 4. Sharp White Highlight */}
            <mesh position={[0.16, 0.16, 0.78]} scale={[1, 1, 0.02]}>
                <sphereGeometry args={[0.11, 32, 32]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
        </group>
    );
}

export default function EyeScene({ externalMouse }: { externalMouse?: { x: number; y: number } }) {
    const [internalMouse, setInternalMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setInternalMouse({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            });
        };

        const handleTouch = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                setInternalMouse({
                    x: (touch.clientX / window.innerWidth) * 2 - 1,
                    y: -(touch.clientY / window.innerHeight) * 2 + 1,
                });
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("touchstart", handleTouch);
        document.addEventListener("touchmove", handleTouch);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("touchstart", handleTouch);
            document.removeEventListener("touchmove", handleTouch);
        };
    }, []);

    const activeMouse = externalMouse || internalMouse;

    return (
        <div className="w-full h-full min-h-[300px] flex items-center justify-center pointer-events-none overflow-visible">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 32 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                style={{ overflow: "visible" }}
            >
                <ambientLight intensity={2} />
                <directionalLight position={[0, 5, 10]} intensity={1} />

                <group position={[0, 0, 0]}>
                    {/* Reduced eye spacing to fit easier in small containers */}
                    <Eye position={[-0.9, 0, 0]} mousePos={activeMouse} />
                    <Eye position={[0.9, 0, 0]} mousePos={activeMouse} />
                </group>
            </Canvas>
        </div>
    );
}
