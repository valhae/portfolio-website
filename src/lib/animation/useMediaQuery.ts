"use client"

import { useCallback, useSyncExternalStore } from "react"

/**
 * A media query is external state, so it is read through the store API rather
 * than mirrored into React state inside an effect. The server snapshot is
 * always `false`, which keeps hydration identical on both sides.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query)
      media.addEventListener("change", onChange)
      return () => media.removeEventListener("change", onChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}
