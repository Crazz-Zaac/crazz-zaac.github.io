"use client"

import { useEffect, useRef } from "react"

export function SpotlightCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (ref.current) {
        ref.current.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, oklch(0.78 0.12 180 / 0.06), transparent 80%)`
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-30 transition-[background] duration-300 lg:block hidden"
      aria-hidden="true"
    />
  )
}
