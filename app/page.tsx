import { Sidebar } from "@/components/portfolio/sidebar"
import { AboutSection } from "@/components/portfolio/about-section"
import { ExperienceSection } from "@/components/portfolio/experience-section"
import { EducationSection } from "@/components/portfolio/education-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { Footer } from "@/components/portfolio/footer"
import { SpotlightCursor } from "@/components/portfolio/spotlight-cursor"
import { SkillsGrid } from "@/components/portfolio/skills-section"
import { GitHubContributions } from "@/components/portfolio/github-contributions"
import { ThemeToggle } from "@/components/portfolio/theme-toggle"

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  )
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <SpotlightCursor />
      <ThemeToggle />
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          <Sidebar />
          <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
            <div className="flex flex-col gap-16 lg:gap-20">
              <SectionCard>
                <AboutSection />
              </SectionCard>
              <SectionCard>
                <ExperienceSection />
              </SectionCard>
              <SectionCard>
                <EducationSection />
              </SectionCard>
              <SectionCard>
                <section id="skills" className="scroll-mt-24" aria-label="Skills">
                  <h2 className="lg:hidden text-sm font-semibold tracking-widest text-foreground uppercase mb-8 sticky top-0 z-20 bg-background/80 backdrop-blur-sm py-4 -mx-6 px-6">
                    Skills & Technologies
                  </h2>
                  <SkillsGrid />
                </section>
              </SectionCard>
              <SectionCard>
                <ProjectsSection />
              </SectionCard>
              <SectionCard>
                <section id="github" className="scroll-mt-24" aria-label="GitHub Activity">
                  <h2 className="lg:hidden text-sm font-semibold tracking-widest text-foreground uppercase mb-8 sticky top-0 z-20 bg-background/80 backdrop-blur-sm py-4 -mx-6 px-6">
                    GitHub Activity
                  </h2>
                  <GitHubContributions />
                </section>
              </SectionCard>
            </div>
            <div className="mt-16">
              <Footer />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
