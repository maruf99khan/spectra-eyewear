"use client"

import { useRef, useMemo } from "react"
import { Color, Group, MeshPhysicalMaterial, MeshStandardMaterial, CircleGeometry, RingGeometry, TorusGeometry } from "three"
import { useFrame } from "@react-three/fiber"
import { useCustomizerStore } from "@/store/customizer"

const lensColor = new Color("#1a1a2e")
const lensMaterial = new MeshPhysicalMaterial({
  color: lensColor,
  roughness: 0.05,
  metalness: 0.1,
  transparent: true,
  opacity: 0.5,
  envMapIntensity: 0.8,
  clearcoat: 1.0,
  clearcoatRoughness: 0.05,
  iridescence: 0.3,
  iridescenceIOR: 1.5,
  iridescenceThicknessRange: [100, 400],
})

export function GlassesModel({ accentColor: propColor }: { accentColor?: string }) {
  const groupRef = useRef<Group>(null)
  const { autoRotate, selectedColor: storeColor } = useCustomizerStore()

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.25
    }
  })

  const activeColor = propColor || storeColor || "#C7A45D"
  const accentColor = useMemo(() => new Color(activeColor), [activeColor])

  const frameMat = useMemo(
    () =>
      new MeshStandardMaterial({
        color: accentColor,
        metalness: 0.6,
        roughness: 0.25,
        envMapIntensity: 1,
      }),
    [accentColor]
  )

  const lensMat = useMemo(() => lensMaterial.clone(), [])

  const ringGeo = useMemo(() => new RingGeometry(0.5, 0.62, 48), [])
  const circleGeo = useMemo(() => new CircleGeometry(0.5, 48), [])
  const torusGeo = useMemo(() => new TorusGeometry(0.56, 0.06, 16, 48), [])

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.8}>
      {/* Lens glow */}
      <pointLight position={[0, 0, 0.8]} intensity={0.3} color={accentColor} />

      {/* Left lens: frame ring */}
      <mesh position={[-1.0, 0, 0]} geometry={ringGeo} material={frameMat} />

      {/* Left lens: torus (bevel) */}
      <mesh position={[-1.0, 0, 0]} geometry={torusGeo}>
        <meshStandardMaterial color={accentColor} metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Left lens glass */}
      <mesh position={[-1.0, 0, 0.01]} geometry={circleGeo} material={lensMat} />

      {/* Left lens inner highlight */}
      <mesh position={[-1.0, 0, 0.02]}>
        <circleGeometry args={[0.45, 32]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.05} />
      </mesh>

      {/* Right lens: frame ring */}
      <mesh position={[1.0, 0, 0]} geometry={ringGeo} material={frameMat} />

      {/* Right lens: torus (bevel) */}
      <mesh position={[1.0, 0, 0]} geometry={torusGeo}>
        <meshStandardMaterial color={accentColor} metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Right lens glass */}
      <mesh position={[1.0, 0, 0.01]} geometry={circleGeo} material={lensMat} />

      {/* Right lens inner highlight */}
      <mesh position={[1.0, 0, 0.02]}>
        <circleGeometry args={[0.45, 32]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.05} />
      </mesh>

      {/* Bridge */}
      <mesh position={[0, 0.12, -0.05]}>
        <boxGeometry args={[0.6, 0.06, 0.06]} />
        <meshStandardMaterial color={accentColor} metalness={0.6} roughness={0.25} />
      </mesh>

      {/* Bridge detail */}
      <mesh position={[0, 0.12, -0.08]}>
        <boxGeometry args={[0.3, 0.03, 0.03]} />
        <meshStandardMaterial color={accentColor} metalness={0.8} roughness={0.15} />
      </mesh>

      {/* Left temple */}
      <mesh position={[-1.25, 0.08, -0.5]} rotation={[0.1, 0.12, -0.03]}>
        <boxGeometry args={[0.06, 0.04, 0.9]} />
        <meshStandardMaterial color={accentColor} metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh position={[-1.25, 0.08, -0.5]} rotation={[0.1, 0.12, -0.03]}>
        <cylinderGeometry args={[0.03, 0.03, 0.9, 8]} />
        <meshStandardMaterial color={accentColor} metalness={0.5} roughness={0.35} />
      </mesh>

      {/* Right temple */}
      <mesh position={[1.25, 0.08, -0.5]} rotation={[0.1, -0.12, 0.03]}>
        <boxGeometry args={[0.06, 0.04, 0.9]} />
        <meshStandardMaterial color={accentColor} metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh position={[1.25, 0.08, -0.5]} rotation={[0.1, -0.12, 0.03]}>
        <cylinderGeometry args={[0.03, 0.03, 0.9, 8]} />
        <meshStandardMaterial color={accentColor} metalness={0.5} roughness={0.35} />
      </mesh>

      {/* Temple tips */}
      <mesh position={[-1.5, 0.12, -1.05]} rotation={[0.1, 0.12, -0.03]}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshStandardMaterial color="#222" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[1.5, 0.12, -1.05]} rotation={[0.1, -0.12, 0.03]}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshStandardMaterial color="#222" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Nose pads */}
      <mesh position={[-0.25, -0.3, 0.08]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#666" metalness={0.2} roughness={0.5} />
      </mesh>
      <mesh position={[0.25, -0.3, 0.08]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#666" metalness={0.2} roughness={0.5} />
      </mesh>

      {/* Nose pad arms */}
      <mesh position={[-0.15, -0.2, 0.05]}>
        <boxGeometry args={[0.03, 0.12, 0.03]} />
        <meshStandardMaterial color={accentColor} metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0.15, -0.2, 0.05]}>
        <boxGeometry args={[0.03, 0.12, 0.03]} />
        <meshStandardMaterial color={accentColor} metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  )
}
