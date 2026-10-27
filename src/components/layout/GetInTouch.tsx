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
    <Section className="site-dark-section">
      <Container>
        <div className="grid min-w-0 items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="min-w-0">
            <p className="type-eyebrow text-brand">Get in Touch</p>
            <h2 className="type-h2 mt-2 text-ink">
              <span className="text-brand">Reach the Right Team</span>
            </h2>
            <p className="type-body mt-2.5 max-w-xl text-muted">
              Have a question about careers or partnerships? Reach out to the
              right team, and we&apos;ll be happy to assist you during business
              hours.
            </p>

            <ul className="mt-6 space-y-5 sm:mt-8">
              {contactRows.map(({ icon: Icon, label, content }) => (
                <li key={label} className="flex min-w-0 gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-md)] bg-brand text-on-sea">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="type-eyebrow text-brand">{label}</p>
                    <div className="type-meta mt-1 break-words">{content}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card min-w-0 w-full self-start rounded-[var(--radius-lg)] p-4 sm:p-5">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
