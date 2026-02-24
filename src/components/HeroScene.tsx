"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ── Solid slime torus knot ── */
function SlimeModel() {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: false,
        side: THREE.FrontSide,
        depthWrite: true,
        uniforms: {
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color("#f8cde0") },
          uColor2: { value: new THREE.Color("#d0edff") },
        },
        vertexShader: /* glsl */ `
          varying vec3 vPos;
          varying vec3 vNormal;
          varying vec3 vViewDir;
          void main() {
            vPos = position;
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewDir = normalize(-mvPosition.xyz);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec3 vPos;
          varying vec3 vNormal;
          varying vec3 vViewDir;

          void main() {
            // Animated slime color shift
            float t = sin(vPos.y * 1.2 + uTime * 0.5) * 0.5 + 0.5;
            vec3 baseColor = mix(uColor1, uColor2, t);

            // Strong directional light for deep colored shadows
            vec3 lightDir = normalize(vec3(1.0, 1.2, 0.8));
            float NdotL = max(dot(vNormal, lightDir), 0.0);
            float shadow = mix(0.35, 1.0, NdotL);

            // Fresnel edge highlight
            float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 3.0);

            // Deep saturated shadow color (dark rose/blue/lilac)
            vec3 shadowTint = baseColor * baseColor * 1.8; // boost saturation
            shadowTint = shadowTint * 0.4; // darken
            // Blend: lit areas get light baseColor, shadowed areas get deep colored tint
            vec3 color = mix(shadowTint, baseColor * 0.9, shadow);
            vec3 edgeHighlight = baseColor * 1.05;
            color = mix(color, edgeHighlight, fresnel * 0.3);

            // Glossy specular (key light)
            vec3 halfDir = normalize(vViewDir + lightDir);
            float spec = pow(max(dot(vNormal, halfDir), 0.0), 80.0);
            color += baseColor * spec * 0.4;

            // Second specular (fill)
            vec3 lightDir2 = normalize(vec3(-0.6, 0.4, 0.7));
            vec3 halfDir2 = normalize(vViewDir + lightDir2);
            float spec2 = pow(max(dot(vNormal, halfDir2), 0.0), 60.0);
            color += baseColor * spec2 * 0.15;

            // Clamp
            color = clamp(color, 0.0, 0.93);

            gl_FragColor = vec4(color, 1.0);
          }
        `,
      }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.12;
    meshRef.current.rotation.x = Math.sin(t * 0.08) * 0.15;
    material.uniforms.uTime.value = t;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
      <mesh ref={meshRef} material={material} scale={1.8}>
        <torusKnotGeometry args={[1.2, 0.42, 256, 64, 2, 3]} />
      </mesh>
    </Float>
  );
}

/* ── Ambient particles ── */
function Particles({ count = 100 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.getElapsedTime() * 0.015;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#d4a0b9"
        size={0.02}
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ── Main hero 3D scene ── */
export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <color attach="background" args={["#f5f7fb"]} />
        <fog attach="fog" args={["#f5f7fb", 8, 18]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 6, 5]} intensity={1.0} color="#f8e0f0" />
        <directionalLight position={[-4, 2, 4]} intensity={0.6} color="#d0e8f8" />
        <pointLight position={[0, -3, 3]} intensity={0.4} color="#e8d0e8" />

        <SlimeModel />
        <Particles />
      </Canvas>
    </div>
  );
}
