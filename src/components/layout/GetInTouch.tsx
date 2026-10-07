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
        <div className="mb-8 md:mb-10">
          <p className="type-eyebrow text-brand">Get in touch</p>
          <h2 className="type-h2 mt-2 text-ink">Contact</h2>
          <p className="type-body mt-3 max-w-xl text-muted">
            Reach hiring or partnerships — we respond during business hours.
          </p>
        </div>

        <div className="grid min-w-0 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <ul className="space-y-6 sm:space-y-7">
            {contactRows.map(({ icon: Icon, label, content }) => (
              <li key={label} className="flex min-w-0 gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand text-white">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="type-eyebrow text-brand">{label}</p>
                  <div className="type-meta mt-1.5 break-words">{content}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="min-w-0 w-full rounded-xl border border-line bg-white p-5 shadow-soft sm:p-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
