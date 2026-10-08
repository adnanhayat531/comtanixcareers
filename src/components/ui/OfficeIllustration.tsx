import Image from "next/image";

export function OfficeIllustration({
  caption,
}: {
  caption?: string;
}) {
  return (
    <figure className="relative max-w-full min-w-0 overflow-hidden rounded-2xl border border-line bg-tint shadow-soft">
      <div className="relative aspect-[4/3] w-full max-w-full overflow-hidden sm:aspect-[3/2]">
        <Image
          src="/office-comtanix.jpg"
          alt="Comtanix office building at night — Bahria Town Phase 8, Rawalpindi"
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 55vw, 640px"
          priority={false}
        />
        {caption ? (
          <figcaption className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/55 to-transparent px-5 py-4 sm:px-6 sm:py-5">
            <p className="type-meta font-medium leading-snug text-white/95">
              {caption}
            </p>
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}
