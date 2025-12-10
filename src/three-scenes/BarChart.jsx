import React, { useMemo } from 'react';
import { Text, Float } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

const Bar = ({ position, height, color, label, value, delay }) => {
    const { scaleY } = useSpring({
        from: { scaleY: 0 },
        to: { scaleY: height },
        delay: delay,
        config: { mass: 1, tension: 170, friction: 26 }
    });

    return (
        <group position={position}>
            {/* Bar */}
            <animated.mesh position-y={scaleY.to(s => s / 2)} scale-y={scaleY}>
                <boxGeometry args={[0.8, 1, 0.8]} />
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
            </animated.mesh>

            {/* Label */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                <Text
                    position={[0, height + 0.5, 0]}
                    fontSize={0.3}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#000"
                >
                    {label}
                    {'\n'}
                    {value.toFixed(1)}%
                </Text>
            </Float>
        </group>
    );
};

const BarChart = ({ data }) => {
    // data: [{ name, importance, direction }]
    // Layout bars in a line or grid

    return (
        <group>
            {data.map((item, index) => {
                const x = (index - data.length / 2) * 1.5;
                const color = item.direction === 'positive' ? '#ff0055' : // Red/Pink
                    item.direction === 'negative' ? '#00ccff' : // Blue
                        '#cccccc'; // Grey

                // Scale importance to height (e.g. 0.35 -> 5.25 units)
                const height = item.importance * 15;
                const percentage = item.importance * 100;

                return (
                    <Bar
                        key={item.name}
                        position={[x, 0, 0]}
                        height={height}
                        value={percentage}
                        color={color}
                        label={item.name}
                        delay={index * 200}
                    />
                );
            })}

            {/* Ground Plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color="#0A0A0F" roughness={0.5} metalness={0.8} />
                <gridHelper args={[50, 50, 0x333333, 0x111111]} rotation={[-Math.PI / 2, 0, 0]} />
            </mesh>
        </group>
    );
};

export default BarChart;
