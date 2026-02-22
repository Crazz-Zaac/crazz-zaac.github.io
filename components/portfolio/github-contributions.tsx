"use client"

import { useEffect, useState, useMemo } from "react"

const GITHUB_USERNAME = "Crazz-Zaac"

interface Contribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface ContributionsData {
  total: Record<string, number>
  contributions: Contribution[]
}

const LEVEL_COLORS = [
  "var(--contribution-0)",
  "var(--contribution-1)",
  "var(--contribution-2)",
  "var(--contribution-3)",
  "var(--contribution-4)",
]

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const DAYS = ["Mon", "Wed", "Fri"]

function getWeeks(contributions: Contribution[]): Contribution[][] {
  const weeks: Contribution[][] = []
  let currentWeek: Contribution[] = []

  contributions.forEach((c, i) => {
    const dayOfWeek = new Date(c.date).getDay()
    if (dayOfWeek === 0 && i > 0) {
      weeks.push(currentWeek)
      currentWeek = []
    }
    currentWeek.push(c)
  })
  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  return weeks
}

function ContributionGrid({ contributions }: { contributions: Contribution[] }) {
  const weeks = useMemo(() => getWeeks(contributions), [contributions])

  const monthLabels = useMemo(() => {
    const labels: { label: string; col: number }[] = []
    let lastMonth = -1
    weeks.forEach((week, weekIndex) => {
      const firstDay = week[0]
      if (firstDay) {
        const month = new Date(firstDay.date).getMonth()
        if (month !== lastMonth) {
          labels.push({ label: MONTHS[month], col: weekIndex })
          lastMonth = month
        }
      }
    })
    return labels
  }, [weeks])

  const cellSize = 11
  const cellGap = 2
  const step = cellSize + cellGap
  const leftPad = 32
  const topPad = 20
  const svgWidth = leftPad + weeks.length * step + 4
  const svgHeight = topPad + 7 * step + 4

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className="block"
      role="img"
      aria-label="GitHub contribution chart"
    >
      {monthLabels.map(({ label, col }) => (
        <text
          key={`${label}-${col}`}
          x={leftPad + col * step}
          y={12}
          className="fill-muted-foreground"
          fontSize="10"
          fontFamily="var(--font-sans)"
        >
          {label}
        </text>
      ))}

      {DAYS.map((day, i) => (
        <text
          key={day}
          x={0}
          y={topPad + (i * 2 + 1) * step + cellSize / 2 + 3}
          className="fill-muted-foreground"
          fontSize="9"
          fontFamily="var(--font-sans)"
        >
          {day}
        </text>
      ))}

      {weeks.map((week, weekIndex) =>
        week.map((day) => {
          const dayOfWeek = new Date(day.date).getDay()
          return (
            <rect
              key={day.date}
              x={leftPad + weekIndex * step}
              y={topPad + dayOfWeek * step}
              width={cellSize}
              height={cellSize}
              rx={2}
              ry={2}
              fill={LEVEL_COLORS[day.level]}
              className="transition-opacity duration-150 hover:opacity-80"
            >
              <title>{`${day.count} contributions on ${day.date}`}</title>
            </rect>
          )
        })
      )}
    </svg>
  )
}

export function GitHubContributions() {
  const [data, setData] = useState<ContributionsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        )
        if (!res.ok) throw new Error("Failed to fetch")
        const json = await res.json()
        setData(json)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchContributions()
  }, [])

  const totalLastYear = data?.total?.lastYear ?? 0

  if (error) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
        Unable to load GitHub contributions.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <h3 className="text-sm font-medium text-foreground">
          GitHub Contributions
        </h3>
        {!loading && (
          <span className="text-xs text-muted-foreground">
            {totalLastYear.toLocaleString()} contributions in the last year
          </span>
        )}
      </div>

      {loading ? (
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="h-[120px] animate-pulse rounded bg-muted" />
        </div>
      ) : data ? (
        <div className="rounded-lg border border-border bg-card p-4 overflow-x-auto">
          <ContributionGrid contributions={data.contributions} />
          <div className="flex items-center justify-end gap-1 mt-3 text-[10px] text-muted-foreground">
            <span>Less</span>
            {LEVEL_COLORS.map((color, i) => (
              <span
                key={i}
                className="inline-block size-[10px] rounded-[2px]"
                style={{ backgroundColor: color }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}
