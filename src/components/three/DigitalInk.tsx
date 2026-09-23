"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { getLenis } from "@/components/shell/SmoothScroll"
import { useTheme } from "@/components/theme/ThemeProvider"
import { usePrefersReducedMotion } from "@/lib/animation/usePrefersReducedMotion"
import { useMediaQuery } from "@/lib/animation/useMediaQuery"
import { cn } from "@/lib/utils/cn"

// WebGL never blocks first paint, and never ships to users who cannot run it.
const InkScene = dynamic(() => import("./InkScene"), { ssr: false })

let webglSupport: boolean | undefined

function supportsWebGL() {
  if (webglSupport !== undefined) return webglSupport
  try {
    const canvas = document.createElement("canvas")
    webglSupport = Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    )
  } catch {
    webglSupport = false
  }
  return webglSupport
}

const noopSubscribe = () => () => {}

/** Static, themed stand-in used for reduced motion, no WebGL, or offscreen. */
function InkFallback({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none flex items-center justify-center", className)}
    >
      <div
        className="aspect-square w-[62%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 34% 30%, var(--background) 0%, var(--muted) 52%, var(--foreground) 100%)",
          opacity: 0.85,
        }}
      />
    </div>
  )
}

export function DigitalInk({ className }: { className?: string }) {
  const { theme } = useTheme()
  const reducedMotion = usePrefersReducedMotion()
  // Small screens and touch devices get the cheaper scene.
  const lowPower = useMediaQuery("(max-width: 900px), (pointer: coarse)")
  const webgl = useSyncExternalStore(noopSubscribe, supportsWebGL, () => false)

  const containerRef = useRef<HTMLDivElement>(null)
  const velocity = useRef(0)
  const [visible, setVisible] = useState(false)

  // Rendering stops entirely once the object scrolls away.
  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const lenis = getLenis()
    if (!lenis) return
    const onScroll = ({ velocity: v }: { velocity: number }) => {
      velocity.current = v
    }
    lenis.on("scroll", onScroll)
    return () => lenis.off("scroll", onScroll)
  }, [visible])

  const canRender = webgl && !reducedMotion && visible

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {canRender ? (
        <InkScene
          theme={theme}
          quality={lowPower ? "reduced" : "full"}
          scrollVelocity={velocity}
        />
      ) : (
        <InkFallback className="absolute inset-0" />
      )}
    </div>
  )
}
