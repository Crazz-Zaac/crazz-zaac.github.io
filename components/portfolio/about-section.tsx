export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24" aria-label="About me">
      <h2 className="lg:hidden text-sm font-semibold tracking-normal text-foreground uppercase mb-8 sticky top-0 z-20 bg-background/80 backdrop-blur-sm py-4 -mx-6 px-6">
        About
      </h2>
      <div className="flex flex-col gap-5 text-muted-foreground leading-relaxed">
        <p>
          I am an MSc Data Science student at{" "}
          <span className="text-foreground font-medium">FAU Erlangen-Nürnberg</span> with a
          focus on <span className="text-foreground font-medium">machine learning</span>,
          scientific data analysis, and practical AI systems. My work connects research-oriented
          experimentation with production-minded software development.
        </p>
        <p>
          I am especially interested in applying learning-based methods to complex, real-world
          datasets, from industrial analytics to scientific workflows. Outside of work, I keep
          following advances in AI research and believe in{" "}
          <span className="text-foreground font-medium italic">
            {'"Per aspera, ad astra"'}
          </span>{" "}
          - through hardships, to the stars.
        </p>
      </div>
    </section>
  )
}
