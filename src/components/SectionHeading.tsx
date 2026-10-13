type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
          <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
          {eyebrow}
          {centered && <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />}
        </p>
      )}
      <h2
        className={`font-display text-3xl font-extrabold tracking-tight text-brand-green sm:text-4xl ${
          eyebrow ? "mt-2" : ""
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-brand-muted">{description}</p>
      )}
    </div>
  );
}
