"use client"

import { useEffect, useState } from "react"

const NAV_ITEMS = [
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "education", label: "EDUCATION" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "github", label: "GITHUB" },
]

export function Nav() {
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-40% 0px -60% 0px" }
    )

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="hidden lg:flex flex-col gap-4" aria-label="In-page navigation">
      {NAV_ITEMS.map(({ id, label }) => {
        const isActive = activeSection === id
        return (
          <a
            key={id}
            href={`#${id}`}
            className={`group flex items-center gap-4 py-1 transition-all duration-300`}
          >
            <span
              className={`block h-px transition-all duration-300 ${
                isActive ? "w-16 bg-foreground" : "w-8 bg-muted-foreground/50 group-hover:w-16 group-hover:bg-foreground"
              }`}
            />
            <span
              className={`text-xs font-semibold tracking-normal transition-colors duration-300 ${
                isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
              }`}
            >
              {label}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
