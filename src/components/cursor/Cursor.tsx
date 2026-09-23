"use client"

import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "@/lib/animation/useMediaQuery"
import { usePrefersReducedMotion } from "@/lib/animation/usePrefersReducedMotion"

type CursorState = "default" | "hover" | "view" | "open" | "drag"

const labels: Partial<Record<CursorState, string>> = {
  view: "View",
  open: "Open",
  drag: "Drag",
}

/**
 * Desktop only. Touch and coarse pointers keep the native model entirely —
 * the element is never mounted for them.
 */
export function Cursor() {
  const reducedMotion = usePrefersReducedMotion()
  // Coarse pointers keep the native cursor; the element is never mounted.
  const enabled = useMediaQuery("(pointer: fine)")
  const [state, setState] = useState<CursorState>("default")
  const dotRef = useRef<HTMLDivElement>(null)
  const frame = useRef<number | undefined>(undefined)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) return
    document.documentElement.dataset.customCursor = "true"
    return () => {
      delete document.documentElement.dataset.customCursor
    }
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    const onMove = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY }

      const element = (event.target as HTMLElement | null)?.closest?.(
        "[data-cursor], a, button",
      ) as HTMLElement | null

      const declared = element?.dataset?.cursor as CursorState | undefined
      if (declared) setState(declared)
      else if (element) setState("hover")
      else setState("default")
    }

    const render = () => {
      // Interpolate toward the pointer; reduced motion snaps instead.
      const factor = reducedMotion ? 1 : 0.18
      current.current.x += (target.current.x - current.current.x) * factor
      current.current.y += (target.current.y - current.current.y) * factor
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`
      }
      frame.current = requestAnimationFrame(render)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    frame.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("pointermove", onMove)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [enabled, reducedMotion])

  if (!enabled) return null

  const label = labels[state]

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[70] flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        width: label ? 76 : state === "hover" ? 28 : 10,
        height: label ? 76 : state === "hover" ? 28 : 10,
        border: "1px solid #ffffff",
        background: label || state === "hover" ? "transparent" : "#ffffff",
        transition: "width 0.35s ease, height 0.35s ease, background 0.35s ease",
      }}
    >
      {label ? (
        <span
          className="type-label"
          style={{ color: "#ffffff", fontSize: 9, letterSpacing: "0.2em" }}
        >
          {label}
        </span>
      ) : null}
    </div>
  )
}
