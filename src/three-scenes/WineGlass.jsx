import React, { useMemo, useRef } from 'react';
import { MeshTransmissionMaterial, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const WineBottle = ({ isPremium = false, wineType = 'red' }) => {
    // 1. Procedural Bottle Geometry (Lathe)
    const bottleGeometry = useMemo(() => {
        const points = [];
        // Define profile (right side)
        // Scale: roughly 3 units high

        // Bottom/Punt
        points.push(new THREE.Vector2(0, 0));
        points.push(new THREE.Vector2(0.5, 0.05)); // Slight curve up

        // Base/Body
        points.push(new THREE.Vector2(0.7, 0.1));
        points.push(new THREE.Vector2(0.7, 1.8)); // Main body height

        // Shoulder (Curved taper)
        const shoulderSteps = 10;
        for (let i = 0; i <= shoulderSteps; i++) {
            const t = i / shoulderSteps;
            const x = 0.7 - (0.5 * Math.sin(t * Math.PI / 2)); // 0.7 -> 0.2
            const y = 1.8 + (t * 0.8); // 1.8 -> 2.6
            points.push(new THREE.Vector2(x, y));
        }

        // Neck
        points.push(new THREE.Vector2(0.2, 2.6));
        points.push(new THREE.Vector2(0.2, 3.2));

        // Lip/Finish
        points.push(new THREE.Vector2(0.25, 3.22)); // Bulge out
        points.push(new THREE.Vector2(0.25, 3.3));
        points.push(new THREE.Vector2(0.2, 3.3)); // Top edge
        points.push(new THREE.Vector2(0.18, 3.3)); // Inside lip (closed via thickness in material usually, but lathe needs solid)
        points.push(new THREE.Vector2(0, 3.3)); // Cap it (we'll rely on material thickness mostly)

        return new THREE.LatheGeometry(points, 64);
    }, []);

    // 2. Materials
    // Glass Color
    const glassColor = wineType === 'red' ? '#1a3c28' : '#eef'; // Dark Green vs Clear(ish)

    // Label Material
    const labelColor = isPremium ? '#000000' : '#f5f5dc'; // Black Premium vs Beige Standard
    const labelEmissive = isPremium ? '#d4af37' : '#000000'; // Gold glow for premium

    // Foil/Capsule Material
    const foilColor = isPremium ? '#d4af37' : (wineType === 'red' ? '#800000' : '#c0c0c0'); // Gold vs Red/Silver

    return (
        <group dispose={null} position={[0, -1.5, 0]}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                {/* BOTTLE GLASS */}
                <mesh castShadow receiveShadow geometry={bottleGeometry}>
                    <MeshTransmissionMaterial
                        backside={true}
                        samples={16}
                        resolution={512}
                        thickness={0.2}
                        roughness={0.15}
                        transmission={1}
                        clearcoat={1}
                        ior={1.5}
                        color={glassColor}
                        attenuationDistance={0.5}
                        attenuationColor={glassColor}
                    />
                </mesh>

                {/* LABEL (Cylinder wrapper) */}
                <mesh position={[0, 1.0, 0]} castShadow>
                    <cylinderGeometry args={[0.71, 0.71, 1.2, 64, 1, true]} />
                    <meshStandardMaterial
                        color={labelColor}
                        roughness={isPremium ? 0.2 : 0.8}
                        metalness={isPremium ? 0.6 : 0.0}
                        emissive={labelEmissive}
                        emissiveIntensity={isPremium ? 0.3 : 0}
                    />
                </mesh>

                {/* DECORATIVE TEXT ON LABEL (Simple Torus or Plane simulation? No, just keep it abstract clean or add a gold strip) */}
                {isPremium && (
                    <mesh position={[0, 1.3, 0.715]}>
                        <planeGeometry args={[0.8, 0.2]} />
                        <meshBasicMaterial color="#d4af37" side={THREE.DoubleSide} />
                    </mesh>
                )}
                {isPremium && (
                    <mesh position={[0, 0.7, 0.715]}>
                        <planeGeometry args={[0.8, 0.05]} />
                        <meshBasicMaterial color="#d4af37" side={THREE.DoubleSide} />
                    </mesh>
                )}

                {/* FOIL / CAPSULE (Neck wrapper) */}
                <mesh position={[0, 2.95, 0]}>
                    <cylinderGeometry args={[0.205, 0.205, 0.7, 32]} />
                    <meshPhysicalMaterial
                        color={foilColor}
                        metalness={0.7}
                        roughness={0.2}
                        clearcoat={0.5}
                    />
                </mesh>

                {/* LIQUID (Internal cylinder) */}
                <mesh position={[0, 1, 0]}>
                    <cylinderGeometry args={[0.65, 0.65, 1.8, 32]} />
                    <meshPhysicalMaterial
                        color={wineType === 'red' ? "#4a0404" : "#fdfbd0"}
                        transmission={0.4}
                        roughness={0.2}
                        ior={1.33}
                    />
                </mesh>

                {/* PREMIUM EFFECTS */}
                {isPremium && (
                    <Sparkles
                        count={50}
                        scale={4}
                        size={4}
                        speed={0.4}
                        opacity={0.5}
                        color="#ffcc00"
                        position={[0, 1.5, 0]}
                    />
                )}
            </Float>
        </group>
    );
};

export default WineBottle;

