"use client"

import { Component, type ReactNode } from "react"

type Props = { children: ReactNode; fallback: ReactNode }
type State = { failed: boolean }

/**
 * A shader that fails to compile, or a lost WebGL context, must not cost the
 * visitor the gate — the flat ink torii takes over instead of leaving a hole
 * in the composition.
 */
export class InkBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.error("Digital Ink failed, falling back to the flat torii:", error)
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
