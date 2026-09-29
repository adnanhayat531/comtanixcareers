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
        <h2 className="mb-12 text-center font-display text-[clamp(1.75rem,3vw,2.75rem)] font-extrabold tracking-tight text-ink leading-[1.2] md:mb-14">
          Get In <span className="font-extrabold text-brand">Touch</span> With Us
        </h2>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <ul className="space-y-10">
            {contactRows.map(({ icon: Icon, label, content }) => (
              <li key={label} className="flex gap-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand text-white shadow-brand">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <div className="min-w-0 pt-1">
                  <p className="text-sm font-medium text-brand">{label}</p>
                  <div className="mt-1.5 text-[15px] md:text-base">{content}</div>
                </div>
              </li>
            ))}
          </ul>

          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
