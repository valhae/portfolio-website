import type { ReactNode } from "react"
import { cn } from "@/lib/utils/cn"
import { BrushRule } from "./BrushRule"

type Props = {
  index: string
  title: string
  aside?: ReactNode
  as?: "h1" | "h2"
  className?: string
}

export function SectionHeader({
  index,
  title,
  aside,
  as: Tag = "h2",
  className,
}: Props) {
  return (
    <div className={cn("pb-1", className)}>
      <div className="flex items-baseline justify-between gap-6 pb-4">
        <div className="flex items-baseline gap-4">
          <span className="type-meta">{index}</span>
          <Tag className="type-label text-foreground">{title}</Tag>
        </div>
        {aside ? <div className="type-meta text-right">{aside}</div> : null}
      </div>
      <BrushRule />
    </div>
  )
}
