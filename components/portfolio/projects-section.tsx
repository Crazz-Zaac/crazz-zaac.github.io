"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, ExternalLink, Star, GitFork } from "lucide-react"
import { GithubIcon } from "@/components/icons/github-icon"

interface PinnedRepo {
  name: string
  description: string | null
  url: string
  homepageUrl: string | null
  stars: number
  forks: number
  language: { name: string; color: string } | null
  topics: string[]
}

const FEATURED_PROJECTS: PinnedRepo[] = [
  {
    name: "llm-driven-clinical-study-analysis",
    description:
      "LLM-driven analysis workflow for clinical study data, focused on extracting insights from medical research context and supporting reproducible study review.",
    url: "https://github.com/Crazz-Zaac/llm-driven-clinical-study-analysis",
    homepageUrl: "",
    stars: 0,
    forks: 0,
    language: { name: "Python", color: "#3572A5" },
    topics: ["llm", "clinical-research", "data-analysis", "machine-learning", "healthcare-ai"],
  },
]

function formatRepoName(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bLlm\b/g, "LLM")
    .replace(/\bAi\b/g, "AI")
}

export function ProjectsSection() {
  const [repos, setRepos] = useState<PinnedRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchPinned() {
      try {
        // Fetch pre-built pinned repos data (generated at build time by CI)
        const res = await fetch("/pinned-repos.json")
        if (!res.ok) throw new Error("Failed to fetch")
        const data = await res.json()
        if (Array.isArray(data)) {
          setRepos(data)
        } else {
          throw new Error("Invalid data")
        }
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchPinned()
  }, [])

  return (
    <section id="projects" className="scroll-mt-24" aria-label="Pinned projects">
      <h2 className="lg:hidden text-sm font-semibold tracking-normal text-foreground uppercase mb-8 sticky top-0 z-20 bg-background/80 backdrop-blur-sm py-4 -mx-6 px-6">
        Projects
      </h2>

      {loading ? (
        <div className="flex flex-col gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-md border border-border bg-card p-5 animate-pulse">
              <div className="h-4 w-1/3 bg-muted rounded mb-3" />
              <div className="h-3 w-full bg-muted rounded mb-2" />
              <div className="h-3 w-2/3 bg-muted rounded mb-4" />
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-muted rounded-full" />
                <div className="h-5 w-12 bg-muted rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-md border border-border bg-card/40 p-6 text-sm text-muted-foreground">
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <GithubIcon className="size-10 text-muted-foreground/50" />
            <div className="flex flex-col gap-1.5">
              <p className="text-foreground font-medium">Pinned Repositories</p>
              <p className="text-muted-foreground max-w-sm">
                Add a <span className="font-mono text-xs text-primary">GITHUB_TOKEN</span> environment variable to dynamically display pinned repos, or visit my profile directly.
              </p>
            </div>
            <a
              href="https://github.com/Crazz-Zaac"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors duration-200"
            >
              <GithubIcon className="size-4" />
              View on GitHub
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {mergeFeaturedRepos(repos).map((repo) => (
            <PinnedRepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      )}

      <div className="mt-12">
        <a
          href="https://github.com/Crazz-Zaac?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 text-foreground font-semibold leading-tight hover:text-primary transition-colors duration-200"
        >
          View All Projects on GitHub
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  )
}

function mergeFeaturedRepos(repos: PinnedRepo[]): PinnedRepo[] {
  const featuredNames = new Set(FEATURED_PROJECTS.map((repo) => repo.name))
  return [
    ...FEATURED_PROJECTS,
    ...repos.filter((repo) => !featuredNames.has(repo.name)),
  ].slice(0, 6)
}

function PinnedRepoCard({ repo }: { repo: PinnedRepo }) {
  return (
    <div className="group relative flex flex-col gap-3 rounded-md border border-border/80 bg-background/35 p-5 transition-all duration-300 hover:bg-secondary/45 hover:border-primary/30">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-foreground font-medium leading-snug">
          {formatRepoName(repo.name)}
        </h3>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label={`View ${repo.name} on GitHub`}
          >
            <GithubIcon className="size-4" />
          </a>
          {repo.homepageUrl && (
            <a
              href={repo.homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label={`View ${repo.name} live demo`}
            >
              <ExternalLink className="size-4" />
            </a>
          )}
        </div>
      </div>

      {repo.description && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {repo.description}
        </p>
      )}

      <div className="flex items-center justify-between gap-4 mt-1">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block size-2.5 rounded-full"
                style={{ backgroundColor: repo.language.color }}
              />
              {repo.language.name}
            </span>
          )}
          {repo.stars > 0 && (
            <span className="flex items-center gap-1">
              <Star className="size-3.5" />
              {repo.stars}
            </span>
          )}
          {repo.forks > 0 && (
            <span className="flex items-center gap-1">
              <GitFork className="size-3.5" />
              {repo.forks}
            </span>
          )}
        </div>
      </div>

      {repo.topics.length > 0 && (
        <ul className="flex flex-wrap gap-2 mt-1" aria-label="Topics">
          {repo.topics.map((topic) => (
            <li
              key={topic}
              className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
            >
              {topic}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
