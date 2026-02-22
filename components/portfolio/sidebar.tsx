import { Nav } from "./nav"
import { SocialLinks } from "./social-links"

export function Sidebar() {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          <a href="/">Rabin Bishwokarma</a>
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-foreground/80">
          Software Developer
        </h2>
        {/* <p className="mt-4 max-w-xs text-muted-foreground leading-relaxed">
          I build data-driven solutions and explore the frontiers of AI and machine learning.
        </p> */}
        <div className="mt-16">
          <Nav />
        </div>
      </div>
      <div className="mt-8">
        <SocialLinks />
      </div>
    </header>
  )
}
