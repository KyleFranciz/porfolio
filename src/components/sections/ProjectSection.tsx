type SectionProps = {
  id?: string;
};

const projects = [
  {
    title: "Interactive Data Dashboard",
    description:
      "Built a dashboard with live data streams, responsive charts, and accessibility-first controls for a finance team.",
    stack: ["React", "Tailwind", "Chart.js"],
  },
  {
    title: "Design System Playground",
    description:
      "Created a component library with tokens, stories, and reusable patterns that keep multiple teams aligned.",
    stack: ["Storybook", "TypeScript", "Radix UI"],
  },
  {
    title: "Animated Landing Page",
    description:
      "Shipped a page with scroll-triggered motion, fluid typography, and lightweight assets that load in under 1 second.",
    stack: ["Framer Motion", "Next.js", "Vercel Edge"],
  },
];

export default function ProjectSection({ id = "projects" }: SectionProps) {
  return (
    <section id={id} className="min-h-screen snap-start px-6 py-20">
      <div className="mx-auto max-w-5xl space-y-10">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-gray-500">Projects</p>
          <h2 className="text-3xl font-semibold text-gray-900">Work I&apos;ve shipped</h2>
        </div>
        <div className="space-y-6">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-2xl border border-gray-200 bg-white/60 p-6 shadow-sm transition hover:border-gray-300 hover:shadow-md"
            >
              <h3 className="text-2xl font-semibold text-gray-900">{project.title}</h3>
              <p className="mt-3 text-gray-700">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-500">
                {project.stack.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-gray-200 px-3 py-1 font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
