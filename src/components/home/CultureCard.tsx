import Image from "next/image";
import { Medal, PartyPopper, Star, Users } from "lucide-react";

const ICONS = [Users, Medal, PartyPopper, Star] as const;

type CultureCardProps = {
  title: string;
  body: string;
  image: string;
  index: number;
};

export function CultureCard({ title, body, image, index }: CultureCardProps) {
  const Icon = ICONS[index] ?? Users;

  return (
    <article className="flex flex-col overflow-hidden rounded-md border border-line bg-white">
      <div className="relative aspect-[5/3] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      <div className="flex flex-1 flex-col px-4 py-4 md:px-5 md:py-5">
        <div className="mb-2.5 grid h-8 w-8 place-items-center rounded-md bg-brand text-white">
          <Icon className="h-3.5 w-3.5" aria-hidden />
        </div>
        <h3 className="font-display text-[15px] font-bold tracking-tight text-ink md:text-base">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </article>
  );
}
