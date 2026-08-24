import { ArrowUpRight } from "lucide-react"

interface ExperienceItem {
  period: string
  title: string
  company: string
  companyUrl?: string
  description: string
  skills: string[]
}

const EXPERIENCES: ExperienceItem[] = [
  {
    period: "Dec 2024 — Present",
    title: "Working Student (Data Analyst)",
    company: "Primetals Technologies",
    companyUrl: "https://www.primetals.com/",
    description:
      "Applying AI and machine learning techniques to industrial data analytics. Working with large-scale datasets in Python to support insight generation, process understanding, and operational improvement.",
    skills: ["Python", "AI/ML", "Data Analysis", "Pandas"],
  },
  {
    period: "May 2024 — Jan 2025",
    title: "Working Student (Data Analyst)",
    company: "Forschungszentrum Jülich",
    companyUrl: "https://www.fz-juelich.de/en",
    description:
      "Analyzed scientific research data using MySQL, Python, Bash, and Jupyter Notebooks. Built reproducible workflows for processing, visualization, and exploratory analysis.",
    skills: ["MySQL", "Python", "Bash Scripting", "Jupyter Notebook"],
  },
  {
    period: "Jul 2021 — Oct 2021",
    title: "Backend Intern",
    company: "Wiseyak Solution, Pvt Ltd.",
    description:
      "Developed backend services and APIs using DGraph and Clojure. Built and maintained GraphQL endpoints for data querying and manipulation.",
    skills: ["DGraph", "Clojure", "GraphQL", "DGraph Query"],
  },
  {
    period: "Mar 2021 — Apr 2021",
    title: "Front-End Developer",
    company: "treeleaf.ai",
    description:
      "Built front-end web interfaces using Django templating, Python, and modern web technologies. Collaborated with the AI team to integrate machine learning model outputs into user-facing applications.",
    skills: ["Django", "Python", "HTML", "JavaScript", "CSS"],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24" aria-label="Work experience">
      <h2 className="lg:hidden text-sm font-semibold tracking-normal text-foreground uppercase mb-8 sticky top-0 z-20 bg-background/80 backdrop-blur-sm py-4 -mx-6 px-6">
        Experience
      </h2>
      <div className="flex flex-col gap-12">
        {EXPERIENCES.map((exp) => (
          <ExperienceCard key={`${exp.company}-${exp.period}`} {...exp} />
        ))}
      </div>
    </section>
  )
}

function ExperienceCard({
  period,
  title,
  company,
  companyUrl,
  description,
  skills,
}: ExperienceItem) {
  return (
    <div className="group relative flex flex-col lg:flex-row gap-4 lg:gap-6 rounded-md p-4 -mx-4 transition-all duration-300 hover:bg-secondary/45 hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]">
      <header className="shrink-0 text-xs font-semibold tracking-wide text-muted-foreground uppercase lg:w-32 lg:pt-1">
        {period}
      </header>
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-foreground font-medium leading-snug">
          {title} &middot;{" "}
          {companyUrl ? (
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 hover:text-primary transition-colors duration-200"
            >
              {company}
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ) : (
            <span>{company}</span>
          )}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        <ul className="flex flex-wrap gap-2 mt-2" aria-label="Technologies used">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
