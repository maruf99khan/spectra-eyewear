"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, ContactShadows, Float } from "@react-three/drei"
import { GlassesModel } from "./GlassesModel"
import { Suspense, useEffect, useState } from "react"
import { SceneLoading } from "./SceneLoading"
import { ErrorBoundary } from "@/components/ui/ErrorBoundary"
import * as THREE from "three"

interface SceneProps {
  className?: string
  cameraPosition?: [number, number, number]
  floatSpeed?: number
  intensity?: number
  accentColor?: string
}

function WebGLFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-bg-secondary rounded-2xl">
      <div className="text-center p-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
        <p className="text-sm text-text-muted">3D preview requires WebGL</p>
      </div>
    </div>
  )
}

function SceneContent({
  cameraPosition,
  floatSpeed,
  intensity,
  accentColor,
}: {
  cameraPosition: [number, number, number]
  floatSpeed: number
  intensity: number
  accentColor?: string
}) {
  return (
    <>
      {/* Cinematic lighting — warm key + cool fill */}
      <ambientLight color="#222244" intensity={0.2} />
      <directionalLight
        color="#ffeedd"
        intensity={2}
        position={[5, 5, 5]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight
        color="#4466ff"
        intensity={0.5}
        position={[-3, 1, -2]}
      />
      <pointLight position={[0, -2, 3]} intensity={0.5} />

      <Float speed={floatSpeed} rotationIntensity={0.1} floatIntensity={0.3}>
        <GlassesModel accentColor={accentColor} />
      </Float>

      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.3}
        scale={6}
        blur={2.5}
        far={4}
      />

      <Environment preset="studio" />
    </>
  )
}

export function Scene({
  className = "",
  cameraPosition = [0, 0, 3.5],
  floatSpeed = 1.5,
  intensity = 0.5,
  accentColor,
}: SceneProps) {
  const [hasWebGL, setHasWebGL] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("webgl2")
      if (!gl) setHasWebGL(false)
    } catch {
      setHasWebGL(false)
    }
  }, [])

  useEffect(() => {
    const handleVisibility = () => {
      // Render loop pauses/resumes via R3F's built-in handling
    }
    document.addEventListener("visibilitychange", handleVisibility)
    return () => document.removeEventListener("visibilitychange", handleVisibility)
  }, [])

  if (!hasWebGL) return <WebGLFallback />

  return (
    <div className={`w-full h-full ${className}`}>
      <ErrorBoundary>
      <Canvas
        camera={{ position: cameraPosition, fov: 40 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.8,
        }}
        onCreated={(state) => {
          state.gl.setClearColor(0x000000, 0)
        }}
      >
        <Suspense fallback={<SceneLoading />}>
          <SceneContent
            cameraPosition={cameraPosition}
            floatSpeed={floatSpeed}
            intensity={intensity}
            accentColor={accentColor}
          />
        </Suspense>
      </Canvas>
      </ErrorBoundary>
    </div>
  )
}
