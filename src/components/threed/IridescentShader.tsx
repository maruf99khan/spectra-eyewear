"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { ShaderMaterial, Color, Vector2 } from "three"

interface IridescentShaderProps {
  color?: string
  fresnelPower?: number
  speed?: number
}

export function IridescentShader({
  color = "#c7a45d",
  fresnelPower = 1.5,
  speed = 0.1,
}: IridescentShaderProps) {
  const ref = useRef<ShaderMaterial>(null)

  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new Color(color) },
          uFresnelPower: { value: fresnelPower },
          uSpeed: { value: speed },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vViewDir;

          void main() {
            vec4 worldPos = modelMatrix * vec4(position, 1.0);
            vNormal = normalize(normalMatrix * normal);
            vViewDir = normalize(cameraPosition - worldPos.xyz);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor;
          uniform float uFresnelPower;
          uniform float uSpeed;

          varying vec3 vNormal;
          varying vec3 vViewDir;

          vec3 iridescent(float angle) {
            float t = angle * 3.0 + uTime * uSpeed;
            return vec3(
              sin(t) * 0.5 + 0.5,
              sin(t + 2.094) * 0.5 + 0.5,
              sin(t + 4.188) * 0.5 + 0.5
            );
          }

          void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewDir);
            float fresnel = 1.0 - max(dot(viewDir, normal), 0.0);
            vec3 iriColor = iridescent(pow(fresnel, uFresnelPower));
            vec3 finalColor = mix(uColor, iriColor, 0.4);
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `,
      }),
    [color, fresnelPower, speed]
  )

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return <shaderMaterial ref={ref} args={[material]} />
}
