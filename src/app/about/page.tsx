import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { OfficeIllustration } from "@/components/ui/OfficeIllustration";
import { LEARNING, VALUES } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Your partner in technology and innovation — trusted professionals delivering innovative, enterprise-grade IT services and measurable business value worldwide.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Your Partner in Technology and Innovation."
        description="Trusted technology professionals delivering innovative, enterprise-grade IT services and measurable business value worldwide."
        image="/about/hero-v4.jpg"
        imageAlt="Comtanix team collaborating around a laptop in the office"
        imageFit="cover"
        objectPosition="72% 42%"
        className="page-hero-banner w-full !aspect-[1440/369] !h-auto !min-h-0 !max-h-none max-sm:!min-h-[15rem] max-sm:!aspect-auto max-sm:!h-[min(34vh,15rem)]"
      >
        <Button href="/contact" variant="outlineLight">
          Contact us <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </PageHero>

      <Section id="story" className="theme-light site-light-section scroll-mt-24 md:scroll-mt-28">
        <Container className="grid min-w-0 items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="order-2 min-w-0 lg:order-1">
            <SectionHeading
              compact
              eyebrow="Our Story"
              title="10+ Years of Progress. A Commitment to Excellence."
              className="mb-6"
            />
            <div className="type-body space-y-4 text-muted">
              <p>
                Comtanix was founded on a clear ambition: to bring together
                technology, expertise, and people to address complex business
                challenges. Over the years, our capabilities have evolved
                alongside the needs of global organizations, spanning software
                development, AI and automation, cybersecurity, e-commerce,
                finance, and specialized business services.
              </p>
              <p>
                Today, we support organizations in advancing their technology
                initiatives, strengthening business operations, and responding
                to evolving market demands. Our approach combines an
                understanding of business priorities with the right expertise,
                disciplined execution, and accountability at every stage.
              </p>
              <p>
                As technology advances, so do we. Through continuous learning,
                emerging technologies, and investment in our people, we help
                enterprises navigate change and build capabilities for what
                comes next.
              </p>
            </div>
          </div>
          <div className="order-1 min-w-0 w-full lg:order-2">
            <OfficeIllustration src="/about/embedded-teams.png" />
          </div>
        </Container>
      </Section>

      <Section id="values" className="site-dark-section scroll-mt-24 md:scroll-mt-28">
        <Container>
          <SectionHeading
            eyebrow="Values"
            title="Principles That Define Who We Are"
            description="Our values establish the foundation for responsible decisions, trusted relationships, and a sustained commitment to professional excellence."
          />
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {VALUES.map((v) => (
              <li key={v.title} className="group">
                <div className="glass-card relative mb-3 aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)]">
                  <Image
                    src={v.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="type-h3 text-ink">
                  <BrandAccentText>{v.title}</BrandAccentText>
                </h3>
                <p className="type-meta mt-2 text-muted">{v.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="learning" className="theme-light site-light-section scroll-mt-24 md:scroll-mt-28">
        <Container>
          <SectionHeading
            eyebrow="Growth"
            title="From Learning to Leadership"
            description="Professional growth at Comtanix is shaped by practical experience, continuous learning, and opportunities to take on new challenges."
          />
          <ol className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
            {LEARNING.map((l, i) => (
              <li
                key={l.title}
                className="group relative flex min-w-0 gap-4 rounded-[1.15rem] border border-line bg-surface px-4 py-4 shadow-[0_10px_28px_-20px_rgba(7,21,24,0.28)] transition duration-300 hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-[0_16px_34px_-16px_rgba(13,148,136,0.35)] sm:gap-4 sm:px-5 sm:py-5"
              >
                <span
                  className="type-eyebrow mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand !normal-case !tracking-normal text-white shadow-[0_8px_20px_-10px_rgba(13,148,136,0.55)]"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="type-h3 text-ink">
                    <BrandAccentText>{l.title}</BrandAccentText>
                  </h3>
                  <p className="type-meta mt-1.5 text-muted">{l.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}
