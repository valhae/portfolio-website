"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { Color, type Mesh, MathUtils, type ShaderMaterial } from "three"
import type { Theme } from "@/lib/theme"
import { InkMaterial } from "./inkMaterial"

void InkMaterial // keep the extend() side effect after tree shaking

type InkProps = {
  theme: Theme
  quality: "full" | "reduced"
  scrollVelocity: React.RefObject<number>
}

/** Theme drives material, not colour — the palette stays black and white. */
const themeMaterial: Record<
  Theme,
  { background: string; foreground: string; roughness: number; contrast: number; distortion: number }
> = {
  paper: { background: "#ffffff", foreground: "#0a0a0a", roughness: 0.18, contrast: 0.9, distortion: 0.3 },
  ink: { background: "#0a0a0a", foreground: "#f5f5f5", roughness: 0.42, contrast: 1.15, distortion: 0.36 },
  void: { background: "#000000", foreground: "#ffffff", roughness: 0.6, contrast: 1.45, distortion: 0.44 },
  shiro: { background: "#fafafa", foreground: "#1c1c1c", roughness: 0.08, contrast: 0.6, distortion: 0.2 },
}

function InkObject({ theme, quality, scrollVelocity }: InkProps) {
  const mesh = useRef<Mesh>(null)
  const material = useRef<ShaderMaterial>(null)
  const pointer = useRef<[number, number]>([0, 0])
  const { viewport } = useThree()

  const config = themeMaterial[theme]
  const detail = quality === "full" ? 12 : 5

  const colors = useMemo(
    () => ({
      background: new Color(config.background),
      foreground: new Color(config.foreground),
    }),
    [config.background, config.foreground],
  )

  useFrame((state, delta) => {
    const uniforms = material.current?.uniforms
    if (!uniforms || !mesh.current) return

    // Pointer is smoothed here, not in an event handler, so the shader never
    // sees a jump the eye can catch.
    pointer.current[0] = MathUtils.damp(
      pointer.current[0],
      state.pointer.x,
      3,
      delta,
    )
    pointer.current[1] = MathUtils.damp(
      pointer.current[1],
      state.pointer.y,
      3,
      delta,
    )

    uniforms.uTime.value += delta * (quality === "full" ? 1 : 0.5)
    uniforms.uPointer.value = pointer.current
    uniforms.uVelocity.value = MathUtils.damp(
      uniforms.uVelocity.value as number,
      Math.min(Math.abs(scrollVelocity.current ?? 0) * 0.02, 0.35),
      4,
      delta,
    )
    uniforms.uRoughness.value = config.roughness
    uniforms.uContrast.value = config.contrast
    uniforms.uDistortion.value = config.distortion
    uniforms.uBackground.value = colors.background
    uniforms.uForeground.value = colors.foreground

    mesh.current.rotation.y += delta * 0.08
    mesh.current.rotation.x = pointer.current[1] * 0.18
  })

  const scale = Math.min(viewport.width, viewport.height) * 0.36

  return (
    <mesh ref={mesh} scale={scale}>
      <icosahedronGeometry args={[1, detail]} />
      <inkMaterial ref={material} key={InkMaterial.key} />
    </mesh>
  )
}

export default function InkScene(props: InkProps) {
  return (
    <Canvas
      // Capped DPR: the object is atmosphere, never worth a retina budget.
      dpr={props.quality === "full" ? [1, 1.75] : 1}
      camera={{ position: [0, 0, 3.2], fov: 42 }}
      gl={{ antialias: props.quality === "full", alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <InkObject {...props} />
    </Canvas>
  )
}
