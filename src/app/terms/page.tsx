import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of the ${SITE.name} website.`,
};

export default function TermsPage() {
  return (
    <Section className="theme-light site-light-section">
      <Container className="max-w-3xl">
        <SectionHeading title="Terms of Service" />
        <div className="type-body space-y-4 text-muted">
          <p>
            By using the {SITE.name} website, you agree to use it for lawful
            purposes only and to provide accurate information in any forms you
            submit.
          </p>
          <p>
            Website content is provided for general information about our
            company and career opportunities. We may update these terms or site
            content at any time.
          </p>
          <p>
            Questions about these terms can be sent to{" "}
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
