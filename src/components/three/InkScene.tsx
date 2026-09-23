"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { Color, type Group, MathUtils, type ShaderMaterial } from "three"
import type { Theme } from "@/lib/theme"
import { InkMaterial } from "./inkMaterial"

type InkProps = {
  theme: Theme
  quality: "full" | "reduced"
  scrollVelocity: React.RefObject<number>
}

/**
 * Ink recipe per theme: the paper it sits on and the sumi it is painted with,
 * both taken straight from the theme tokens. Two values, no hue.
 */
const themeInk: Record<
  Theme,
  {
    paper: string
    ink: string
    roughness: number
    contrast: number
    bleed: number
  }
> = {
  paper: {
    paper: "#ffffff",
    ink: "#0a0a0a",
    roughness: 0.18,
    contrast: 0.95,
    bleed: 0.26,
  },
  ink: {
    paper: "#0a0a0a",
    ink: "#f5f5f5",
    roughness: 0.42,
    contrast: 1.1,
    bleed: 0.34,
  },
  void: {
    paper: "#000000",
    ink: "#ffffff",
    roughness: 0.6,
    contrast: 1.3,
    bleed: 0.44,
  },
  shiro: {
    paper: "#fafafa",
    ink: "#1c1c1c",
    roughness: 0.08,
    contrast: 0.72,
    bleed: 0.18,
  },
}

/**
 * Myōjin-style torii, assembled from unit primitives so every part shares the
 * same local coordinate range and the shader's drip logic works everywhere.
 *
 * kasagi   ▁▁▁▁▁▁▁▁▁▁  curved top beam
 * shimaki  ──────────   second beam
 * gakuzuka    ▐         centre strut
 * nuki     ────────     tie beam
 * hashira  ▌      ▐     two pillars, leaning in
 */
/**
 * `drip` is signed: positive loads the lower edge with ink (a wet beam),
 * negative thins it out toward the bottom, which is what makes a strand fade
 * into nothing part-way down instead of ending in a blunt cut.
 */
const PARTS = [
  // gate
  { kind: "pillar", position: [-0.72, -0.15, 0], scale: [0.115, 2.3, 0.115], rotation: 0.018, curve: 0, drip: 0.5 },
  { kind: "pillar", position: [0.72, -0.15, 0], scale: [0.115, 2.3, 0.115], rotation: -0.018, curve: 0, drip: 0.5 },
  { kind: "beam", position: [0, 1.08, 0], scale: [2.5, 0.13, 0.22], rotation: 0, curve: 0.09, drip: 0.9 },
  { kind: "beam", position: [0, 0.95, 0], scale: [2.28, 0.085, 0.19], rotation: 0, curve: 0.05, drip: 0.7 },
  { kind: "beam", position: [0, 0.54, 0], scale: [2.04, 0.1, 0.17], rotation: 0, curve: 0, drip: 1 },
  { kind: "beam", position: [0, 0.77, 0], scale: [0.11, 0.34, 0.13], rotation: 0, curve: 0, drip: 0.4 },

  // ink running off the beams
  { kind: "drip", position: [-0.96, 0.87, 0.02], scale: [0.017, 0.26, 0.017], rotation: 0, curve: 0, drip: -2.4 },
  { kind: "drip", position: [0.34, 0.83, 0.03], scale: [0.013, 0.34, 0.013], rotation: 0, curve: 0, drip: -2.8 },
  { kind: "drip", position: [-0.41, 0.35, 0.02], scale: [0.015, 0.3, 0.015], rotation: 0, curve: 0, drip: -2.6 },
  { kind: "drip", position: [0.87, 0.34, -0.02], scale: [0.011, 0.22, 0.011], rotation: 0, curve: 0, drip: -3 },
] as const

function Torii({ theme, quality, scrollVelocity }: InkProps) {
  const group = useRef<Group>(null)
  const pointer = useRef({ x: 0, y: 0 })
  // Materials live in a ref: useFrame writes their uniforms every frame, and
  // render-time values are not ours to mutate.
  const materials = useRef<(ShaderMaterial | null)[]>([])
  const { viewport } = useThree()

  const recipe = themeInk[theme]
  const segments = quality === "full" ? 32 : 10

  const colors = useMemo(
    () => ({
      paper: new Color(recipe.paper),
      ink: new Color(recipe.ink),
    }),
    [recipe.paper, recipe.ink],
  )

  useFrame((state, delta) => {
    pointer.current = {
      x: MathUtils.damp(pointer.current.x, state.pointer.x, 3, delta),
      y: MathUtils.damp(pointer.current.y, state.pointer.y, 3, delta),
    }

    // Scroll speed makes the ink run: more bleed, longer drips.
    const velocity = Math.min(Math.abs(scrollVelocity.current ?? 0) * 0.018, 0.4)

    for (const material of materials.current) {
      if (!material) continue
      const uniforms = material.uniforms
      uniforms.uTime.value += delta * (quality === "full" ? 1 : 0.55)
      uniforms.uPointer.value = [pointer.current.x, pointer.current.y]
      uniforms.uVelocity.value = MathUtils.damp(
        uniforms.uVelocity.value as number,
        velocity,
        4,
        delta,
      )
      uniforms.uBleed.value = recipe.bleed
      uniforms.uRoughness.value = recipe.roughness
      uniforms.uContrast.value = recipe.contrast
      uniforms.uPaper.value = colors.paper
      uniforms.uInk.value = colors.ink
    }

    if (group.current) {
      // Parallax only — the gate stays upright, it is architecture.
      group.current.rotation.y = pointer.current.x * 0.16
      group.current.rotation.x = -pointer.current.y * 0.06
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.015
    }
  })

  const scale = Math.min(viewport.width / 3.6, viewport.height / 3.5)

  return (
    <group ref={group} scale={scale} position={[0, -0.1, 0]}>
      {PARTS.map((part, index) => (
        <mesh
          key={`${part.kind}-${index}`}
          position={part.position as unknown as [number, number, number]}
          scale={part.scale as unknown as [number, number, number]}
          rotation={[0, 0, part.rotation]}
        >
          {part.kind === "beam" ? (
            <boxGeometry args={[1, 1, 1, segments, 6, 6]} />
          ) : (
            <cylinderGeometry
              args={
                part.kind === "drip"
                  ? [0.34, 0.5, 1, Math.max(6, segments / 3), 12, false]
                  : [0.44, 0.5, 1, segments, segments, false]
              }
            />
          )}
          <inkMaterial
            ref={(material: ShaderMaterial | null) => {
              materials.current[index] = material
            }}
            key={InkMaterial.key}
            uCurve={part.curve}
            uDrip={part.drip}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function InkScene(props: InkProps) {
  return (
    <Canvas
      // Capped DPR: the gate is atmosphere, never worth a retina budget.
      dpr={props.quality === "full" ? [1, 1.75] : 1}
      camera={{ position: [0, 0, 3.6], fov: 42 }}
      gl={{
        antialias: props.quality === "full",
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ pointerEvents: "none" }}
    >
      <Torii {...props} />
    </Canvas>
  )
}
