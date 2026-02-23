import { SkillIcon, icons } from "@/components/icons/skill-icons"

const SKILL_GROUPS = [
  {
    category: "Languages",
    items: ["Python", "C++", "C", "SQL"],
  },
  {
    category: "ML / Data",
    items: ["PyTorch", "Keras", "Pandas", "NumPy", "Seaborn", "Matplotlib", "Scikit-learn", "OpenCV"],
  },
  {
    category: "Web & Backend",
    items: ["Django", "FastAPI", "Pydantic", "SQLAlchemy", "SQLModel", "Alembic", "Streamlit", "HTML", "CSS"],
  },
  {
    category: "Tools",
    items: ["Git", "Linux", "Bash", "MySQL", "Docker", "LaTeX", "Jupyter", "VS Code", "Postman"],
  },
]

export function SkillsGrid() {
  return (
    <div className="flex flex-col gap-6 mt-6 mb-2">
      {SKILL_GROUPS.map(({ category, items }) => (
        <div key={category}>
          <h4 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">
            {category}
          </h4>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-secondary-foreground transition-colors duration-200 hover:border-primary/50 hover:text-primary"
              >
                {icons[item] && <SkillIcon name={item} className="size-3.5 shrink-0" />}
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
