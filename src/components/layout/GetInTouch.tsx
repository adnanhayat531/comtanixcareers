import { Mail, MapPin, Phone } from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONFIG } from "@/lib/config";

const contactRows = [
  {
    icon: Phone,
    label: "Call Us",
    content: (
      <a
        href={`tel:+${CONFIG.whatsapp}`}
        className="font-semibold text-ink transition-colors hover:text-brand"
      >
        {CONFIG.whatsappShow}
      </a>
    ),
  },
  {
    icon: Mail,
    label: "Email Us",
    content: (
      <div className="space-y-1">
        <a
          href={`mailto:${CONFIG.email}`}
          className="block font-semibold text-ink transition-colors hover:text-brand"
        >
          {CONFIG.email}
        </a>
        <a
          href={`mailto:${CONFIG.careersEmail}`}
          className="block font-semibold text-ink transition-colors hover:text-brand"
        >
          {CONFIG.careersEmail}
        </a>
      </div>
    ),
  },
  {
    icon: MapPin,
    label: "Locations",
    content: (
      <p className="font-semibold leading-relaxed text-ink">{CONFIG.address}</p>
    ),
  },
] as const;

export function GetInTouch() {
  return (
    <Section className="bg-tint">
      <Container>
        <h2 className="mb-6 text-left font-display text-[clamp(1.4rem,3vw,2rem)] font-bold tracking-tight text-ink leading-[1.25] md:mb-8">
          Contact
        </h2>

        <div className="grid min-w-0 items-start gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <ul className="space-y-5 sm:space-y-6">
            {contactRows.map(({ icon: Icon, label, content }) => (
              <li key={label} className="flex min-w-0 gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-brand text-white">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-xs font-semibold tracking-[0.06em] text-brand uppercase">
                    {label}
                  </p>
                  <div className="mt-1 break-words text-sm md:text-[15px]">{content}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="min-w-0 w-full">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
