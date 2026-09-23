"use client"

import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

/**
 * One registration point for the whole app. Registering in each component
 * risks a component animating before its plugin exists, and useGSAP handles
 * the cleanup that React's double-invoked effects would otherwise leak.
 */
gsap.registerPlugin(useGSAP, ScrollTrigger)

export { gsap, ScrollTrigger, useGSAP }
