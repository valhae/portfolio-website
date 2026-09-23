import { cn } from "@/lib/utils/cn"

/**
 * Flat torii, drawn as ink. Used wherever the WebGL gate cannot run — no
 * WebGL, reduced motion, or the scene scrolled out of view — so the motif is
 * never absent, only quieter.
 */
export function ToriiMark({ className }: { className?: string }) {

  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g filter="url(#ink-torii)" fill="var(--foreground)">
        {/* kasagi — curved top beam */}
        <path d="M12,50 Q100,38 188,50 L188,61 Q100,50 12,61 Z" />
        {/* shimaki — second beam */}
        <path d="M24,64 Q100,57 176,64 L176,72 Q100,65 24,72 Z" />
        {/* gakuzuka — centre strut */}
        <path d="M95,72 L105,72 L104,98 L96,98 Z" />
        {/* nuki — tie beam */}
        <path d="M32,98 Q100,94 168,98 L168,108 Q100,104 32,108 Z" />
        {/* hashira — pillars, leaning in */}
        <path d="M50,60 L66,60 L72,190 L46,190 Z" />
        <path d="M134,60 L150,60 L154,190 L128,190 Z" />
      </g>
    </svg>
  )
}
