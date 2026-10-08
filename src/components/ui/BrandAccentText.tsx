/** Accents the last word of a heading in brand teal (Who we are style). */
export function BrandAccentText({
  children,
  accentClassName = "text-brand",
}: {
  children: string;
  /** Override for light surfaces (e.g. white on brand banners) */
  accentClassName?: string;
}) {
  const text = children.trim();
  if (!text) return null;

  const words = text.split(/\s+/);
  const last = words[words.length - 1] ?? "";
  const match = last.match(/^(.*?)([.!?:;,]*)$/);
  const word = match?.[1] || last;
  const punct = match?.[2] || "";
  const head = words.slice(0, -1).join(" ");

  return (
    <>
      {head ? `${head} ` : null}
      <span className={accentClassName}>{word}</span>
      {punct}
    </>
  );
}
