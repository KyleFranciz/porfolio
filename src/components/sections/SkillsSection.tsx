type SectionProps = {
  id?: string;
};

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Framer Motion",
  "Tailwind CSS",
  "Accessibility",
  "Content Strategy",
  "Design Systems",
];

export default function SkillsSection({ id = "skills" }: SectionProps) {
  return (
    <section
      id={id}
      className="min-h-screen snap-start flex items-center justify-center px-6 py-16"
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.4em] text-gray-500">Skills</p>
        <h2 className="mt-3 text-3xl font-semibold text-gray-900">What I bring to the table</h2>
        <div className="mt-8 grid gap-3 text-lg text-gray-700 sm:grid-cols-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium text-gray-800"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
