interface EducationItem {
  period: string
  degree: string
  institution: string
  institutionUrl?: string
}

const EDUCATION: EducationItem[] = [
  {
    period: "May 2023 — Present",
    degree: "MSc. Data Science",
    institution: "Friedrich-Alexander-Universität Erlangen-Nürnberg (FAU)",
    institutionUrl: "https://www.fau.eu/",
  },
  {
    period: "2016 — 2020",
    degree: "BSc. Computer Science and Information Technology",
    institution: "College of Applied Business, Tribhuvan University",
  },
  {
    period: "2013 — 2015",
    degree: "+2 Computer Science",
    institution: "Bagmati Modern College",
  },
]

export function EducationSection() {
  return (
    <section id="education" className="scroll-mt-24" aria-label="Education">
      <h2 className="lg:hidden text-sm font-semibold tracking-widest text-foreground uppercase mb-8 sticky top-0 z-20 bg-background/80 backdrop-blur-sm py-4 -mx-6 px-6">
        Education
      </h2>
      <div className="flex flex-col gap-10">
        {EDUCATION.map((edu) => (
          <EducationCard key={edu.institution} {...edu} />
        ))}
      </div>
    </section>
  )
}

function EducationCard({
  period,
  degree,
  institution,
  institutionUrl,
}: EducationItem) {
  return (
    <div className="group relative flex flex-col lg:flex-row gap-4 lg:gap-6 rounded-lg p-4 -mx-4 transition-all duration-300 hover:bg-card/60 hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] hover:drop-shadow-lg">
      <header className="shrink-0 text-xs font-semibold tracking-wide text-muted-foreground uppercase lg:w-32 lg:pt-1">
        {period}
      </header>
      <div className="flex flex-col gap-1 flex-1">
        <h3 className="text-foreground font-medium leading-snug">{degree}</h3>
        {institutionUrl ? (
          <a
            href={institutionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            {institution}
          </a>
        ) : (
          <p className="text-sm text-muted-foreground">{institution}</p>
        )}
      </div>
    </div>
  )
}
