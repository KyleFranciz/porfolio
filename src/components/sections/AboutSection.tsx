type SectionProps = {
  id?: string;
};

export default function AboutSection({ id = "about" }: SectionProps) {
  return (
    <section
      id={id}
      className="min-h-screen snap-start flex items-center justify-center bg-white px-6 py-16"
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-gray-500">About</p>
          <h2 className="text-3xl font-semibold text-gray-900">Curious, intentional, and always learning.</h2>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">
          My background is in designing products for creative teams, which taught me how to translate
          complex goals into clear interactions. These days I focus on React, TypeScript, and modern
          animation techniques to give every interface a sense of polish without sacrificing
          performance.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          I enjoy collaborating with designers and engineers alike, mentoring others, and
          experimenting with motion libraries to add a handcrafted feel to every scroll.
        </p>
      </div>
    </section>
  );
}
