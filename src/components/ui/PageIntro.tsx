import type { ReactNode } from "react"
import { BrushRule } from "./BrushRule"

type Props = {
  index: string
  title: string
  lead?: string
  meta?: ReactNode
}

export function PageIntro({ index, title, lead, meta }: Props) {
  return (
    <header className="pt-36 pb-16 md:pt-44">
      <p className="type-meta accent">{index}</p>
      <h1 className="type-display mt-4 text-[clamp(3rem,13vw,10rem)] uppercase">
        {title}
      </h1>

      <div className="mt-8 max-w-[46ch]">
        <BrushRule accent weight="full" />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[1.4fr_1fr]">
        {lead ? <p className="type-lead">{lead}</p> : <span />}
        {meta ? <div className="type-meta md:text-right">{meta}</div> : null}
      </div>
    </header>
  )
}
