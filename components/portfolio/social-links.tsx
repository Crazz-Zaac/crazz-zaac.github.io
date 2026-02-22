import { Linkedin, Mail } from "lucide-react"
import { GithubIcon } from "@/components/icons/github-icon"

const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/Crazz-Zaac",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rabin-bishwokarma",
    icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:rabinbk588@gmail.com",
    icon: Mail,
  },
]

export function SocialLinks() {
  return (
    <ul className="flex items-center gap-5" aria-label="Social media">
      {LINKS.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-muted-foreground transition-colors duration-200 hover:text-foreground"
            aria-label={`${label} (opens in a new tab)`}
          >
            <Icon className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  )
}
