import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const HeroParticles = ({ count = 2000, color = "#722F37" }) => {
    const mesh = useRef();

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            // Create a wine glass-like shape (cylinder/cone) approx
            const angle = Math.random() * Math.PI * 2;
            const radius = 2 + Math.random() * 3; // Wider radius
            const height = (Math.random() - 0.5) * 10;

            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.005 + Math.random() / 200; // Slower speed

            // Position based on vague cylinder
            const x = Math.cos(angle) * radius * (1 + height / 10); // Tapered
            const y = height;
            const z = Math.sin(angle) * radius * (1 + height / 10);

            temp.push({ t, factor, speed, x, y, z, mx: 0, my: 0, originalX: x, originalY: y, originalZ: z });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!mesh.current) return;

        particles.forEach((particle, i) => {
            let { t, speed, originalX, originalY, originalZ } = particle;

            // Update time
            t = particle.t += speed;

            // Gentle floating motion around original position
            const floatRange = 0.5;
            const currX = originalX + Math.sin(t) * floatRange;
            const currY = originalY + Math.cos(t * 0.8) * floatRange;
            const currZ = originalZ + Math.sin(t * 1.2) * floatRange;

            dummy.position.set(currX, currY, currZ);

            // Scale based on "sparkle" or breathing
            const s = (Math.sin(t * 2) + 1.5) / 20; // Improved scale
            dummy.scale.set(s, s, s);

            dummy.rotation.set(t, t, t);
            dummy.updateMatrix();

            mesh.current.setMatrixAt(i, dummy.matrix);

            // Color variation if needed (optional optimization: keep uniform for performance)
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <sphereGeometry args={[1, 16, 16]} />
            {/* Additive blending makes them look like glowing light particles */}
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2}
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </instancedMesh>
    );
};

export default HeroParticles;
