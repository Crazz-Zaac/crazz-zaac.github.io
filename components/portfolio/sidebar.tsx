import { ArrowUpRight, FileText } from "lucide-react"
import { Nav } from "./nav"
import { SocialLinks } from "./social-links"

export function Sidebar() {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-normal text-primary">
          MSc Data Science · AI/ML
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          <a href="/">Rabin BK</a>
        </h1>
        <a
          href="/rabin-bk-cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md hover:shadow-primary/25"
        >
          <FileText className="size-4" />
          View Full Resume
          <ArrowUpRight className="size-4" />
        </a>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-foreground/80">
          Applied Machine Learning & Data Analytics
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Building research-minded data systems across machine learning, scientific analytics,
          and reliable software engineering.
        </p>
        <div className="mt-12">
          <Nav />
        </div>
      </div>
      <div className="mt-8">
        <SocialLinks />
      </div>
    </header>
  )
}
