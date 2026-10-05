import Image from "next/image";
import {
  ArrowRight,
  GraduationCap,
  Handshake,
  Lock,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

const ICONS = [
  ShieldCheck,
  Users,
  TrendingUp,
  Lock,
  Handshake,
  GraduationCap,
] as const;

type GoalCardProps = {
  title: string;
  body: string;
  image: string;
  tag: string;
  index: number;
};

export function GoalCard({ title, body, image, tag, index }: GoalCardProps) {
  const Icon = ICONS[index] ?? ShieldCheck;

  return (
    <article className="flex flex-col overflow-hidden rounded-md border border-line bg-white">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col px-4 py-4 md:px-5 md:py-5">
        <div className="mb-2.5 flex items-center justify-between gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-brand text-white">
            <Icon className="h-3.5 w-3.5" aria-hidden />
          </div>
          <span className="font-display text-lg font-bold text-brand/20 md:text-xl">
            0{index + 1}
          </span>
        </div>

        <h3 className="font-display text-[15px] font-bold tracking-tight text-ink md:text-base">
          {title}
        </h3>
        <p className="mt-1.5 flex-1 text-sm leading-[1.55] text-muted">{body}</p>

        <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-brand uppercase">
          {tag}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </p>
      </div>
    </article>
  );
}
