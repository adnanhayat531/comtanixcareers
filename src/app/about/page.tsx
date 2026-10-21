import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BrandAccentText } from "@/components/ui/BrandAccentText";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/ui/CtaBanner";
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
        objectPosition="70% 40%"
        className="!aspect-[1440/369] !h-auto !min-h-0 !max-h-none"
      >
        <Button href="/careers#openings" variant="white">
          View openings <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
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
              title="15 Years of Progress. A Commitment to Excellence."
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
            <Button href="/careers#openings" className="mt-7 w-full sm:w-auto">
              View openings <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
          <div className="order-1 min-w-0 w-full lg:order-2">
            <OfficeIllustration
              src="/about/embedded-teams.png"
              caption="15 years of progress — a commitment to excellence"
            />
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
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {VALUES.map((v, i) => (
              <li key={v.title} className="group">
                <div className="glass-card relative mb-3 aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)]">
                  <Image
                    src={v.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="type-eyebrow absolute bottom-3 left-3 z-10 text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="type-h3 text-ink">
                  <BrandAccentText>{v.title}</BrandAccentText>
                </h3>
                <p className="type-meta mt-2 text-muted">{v.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section id="learning" className="theme-light site-light-section scroll-mt-24 md:scroll-mt-28">
        <Container>
          <SectionHeading
            eyebrow="Growth"
            title="From Learning to Leadership"
            description="Professional growth at Comtanix is shaped by practical experience, continuous learning, and opportunities to take on new challenges."
          />
          <div className="grid min-w-0 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <ol className="relative min-w-0 space-y-5 md:space-y-6">
              {LEARNING.map((l, i) => {
                const offset = [
                  "ml-0",
                  "ml-3 sm:ml-6 md:ml-8",
                  "ml-6 sm:ml-12 md:ml-16",
                  "ml-9 sm:ml-16 md:ml-24",
                ][i] ?? "ml-0";

                return (
                  <li
                    key={l.title}
                    className={`relative flex gap-3.5 sm:gap-4 ${offset}`}
                  >
                    <span
                      className="type-eyebrow mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-brand !normal-case !tracking-normal text-white shadow-[0_8px_20px_-10px_rgba(13,148,136,0.55)]"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <div
                      className={`min-w-0 ${
                        i < LEARNING.length - 1
                          ? "border-b border-brand/15 pb-5 md:pb-6"
                          : ""
                      }`}
                    >
                      <h3 className="type-h3 text-ink">
                        <BrandAccentText>{l.title}</BrandAccentText>
                      </h3>
                      <p className="type-meta mt-1.5 max-w-xl text-muted">
                        {l.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="glass-card relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[var(--radius-lg)] lg:mx-0 lg:max-w-none lg:self-stretch lg:aspect-auto lg:min-h-[28rem]">
              <Image
                src="/about/learning-path.png"
                alt="Team collaborating during a learning session at Comtanix"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </Container>
      </Section>

      <CtaBanner
        tone="dark"
        eyebrow="Careers"
        title="Ready to grow with Comtanix?"
        description="Explore open roles or submit your CV for future opportunities."
      >
        <Button href="/careers" variant="white">
          View openings <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href="/submit-cv" variant="outlineLight">
          Submit CV <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </CtaBanner>
    </>
  );
}
