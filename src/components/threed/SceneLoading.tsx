"use client"

export function SceneLoading() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial wireframe color="#C7A45D" opacity={0.3} transparent />
    </mesh>
  )
}
