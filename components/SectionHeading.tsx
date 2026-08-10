export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && (
        <div
          className={`mb-3 flex items-center gap-3 font-mono-data text-xs font-medium uppercase tracking-[0.25em] text-rust ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-rust" />
          {eyebrow}
        </div>
      )}
      <h2
        className={`font-display text-3xl font-semibold uppercase tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-carbon"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
