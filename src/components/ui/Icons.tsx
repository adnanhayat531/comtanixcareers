import {
  Dumbbell,
  Trophy,
  Star,
  GraduationCap,
  PartyPopper,
  Gamepad2,
} from "lucide-react";

const lifeIcons = {
  gym: Dumbbell,
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
