import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses, and protects your information.`,
};

export default function PrivacyPage() {
  return (
    <Section className="theme-light site-light-section">
      <Container className="max-w-3xl">
        <SectionHeading title="Privacy Policy" />
        <div className="type-body space-y-4 text-muted">
          <p>
            {SITE.name} respects your privacy. Information you share through our
            website forms is used only to respond to inquiries, process
            applications, and improve our services.
          </p>
          <p>
            We do not sell your personal data. Access is limited to authorized
            team members who need it for recruiting or support purposes.
          </p>
          <p>
            For privacy questions, contact us at{" "}
            <a
              href={`mailto:info@${SITE.domain}`}
              className="font-semibold text-brand hover:underline"
            >
              info@{SITE.domain}
            </a>
            .
          </p>
        </div>
      </Container>
    </Section>
  );
}
