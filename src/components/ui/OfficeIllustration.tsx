import Image from "next/image";

export function OfficeIllustration({
  caption = "Comtanix office",
}: {
  caption?: string;
}) {
  return (
    <figure className="relative max-w-full min-w-0 overflow-hidden rounded-md border border-line">
      <div className="relative aspect-[3/2] w-full max-w-full overflow-hidden bg-tint">
        <Image
          src="/office-building.jpg"
          alt="Comtanix office building at night"
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 55vw, 640px"
          priority={false}
        />
        {caption ? (
          <figcaption className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/50 to-transparent px-5 py-4 sm:px-6 sm:py-5">
            <p className="type-meta font-medium leading-snug text-white/95">
              {caption}
            </p>
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}
