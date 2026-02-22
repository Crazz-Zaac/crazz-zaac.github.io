export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24" aria-label="About me">
      <h2 className="lg:hidden text-sm font-semibold tracking-widest text-foreground uppercase mb-8 sticky top-0 z-20 bg-background/80 backdrop-blur-sm py-4 -mx-6 px-6">
        About
      </h2>
      <div className="flex flex-col gap-5 text-muted-foreground leading-relaxed">
        <p>
          I am passionate about{" "}
          <span className="text-foreground font-medium">Artificial Intelligence</span> and{" "}
          <span className="text-foreground font-medium">Machine Learning</span>, and I love
          exploring new data science techniques and tools. From building full-stack web
          applications to training deep learning models, I enjoy working across the entire spectrum of development.
        </p>
        <p>
          Outside of work, you can find me playing basketball, watching martial arts movies,
          or reading about the latest advances in AI research. I firmly believe in{" "}
          <span className="text-foreground font-medium italic">
            {'"Per aspera, ad astra"'}
          </span>{" "}
          &mdash; through hardships, to the stars.
        </p>
      </div>
    </section>
  )
}
