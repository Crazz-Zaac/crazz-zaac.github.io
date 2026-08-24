export function Footer() {
  return (
    <footer className="max-w-md pb-16 text-sm text-muted-foreground">
      <p className="leading-relaxed">
        Designed and built by Rabin BK with{" "}
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium"
        >
          Next.js
        </a>{" "}
        and{" "}
        <a
          href="https://tailwindcss.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium"
        >
          Tailwind CSS
        </a>
        .
      </p>
    </footer>
  )
}
