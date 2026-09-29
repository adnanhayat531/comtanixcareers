import {
  Utensils,
  Trophy,
  Star,
  GraduationCap,
  PartyPopper,
  Gamepad2,
} from "lucide-react";

const lifeIcons = {
  utensils: Utensils,
  trophy: Trophy,
  star: Star,
  graduation: GraduationCap,
  party: PartyPopper,
  game: Gamepad2,
} as const;

export function LifeIcon({
  name,
  className = "h-5 w-5",
}: {
  name: keyof typeof lifeIcons;
  className?: string;
}) {
  const Icon = lifeIcons[name];
  return <Icon className={className} aria-hidden />;
}

export function IconBadge({
  children,
  tone = "sea",
}: {
  children: React.ReactNode;
  tone?: "sea" | "brand" | "tint";
}) {
  const tones = {
    sea: "bg-brand text-white shadow-brand",
    brand: "bg-brand text-white shadow-brand",
    tint: "bg-tint text-brand",
  };
  return (
    <div
      className={`mb-4 grid h-11 w-11 place-items-center rounded-md ${tones[tone]}`}
    >
      {children}
    </div>
  );
}
