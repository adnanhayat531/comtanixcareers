import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { ContactMap } from "@/components/contact/ContactMap";
import { GetInTouch } from "@/components/layout/GetInTouch";
import { CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Comtanix — call, email, or visit our office. Find us on the map.",
};

export default function ContactPage() {
  return (
    <>
      {/* Half hero */}
      <section className="relative flex min-h-[42vh] flex-col justify-end overflow-hidden sm:min-h-[46vh] md:min-h-[50vh] lg:min-h-[52vh]">
        <Image
          src="/contact/hero.jpg"
          alt="Contact Comtanix — email, phone, location, and chat"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        {/* Soft shade only behind copy — light image, dark text */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-full max-w-3xl bg-gradient-to-r from-white/70 via-white/35 to-transparent"
          aria-hidden
        />

        <Container className="relative z-10 py-8 sm:py-10 md:py-12">
          <div className="max-w-xl">
            <p className="mb-2 text-[11px] font-semibold tracking-[0.1em] text-ink uppercase">
              Contact
            </p>
            <h1 className="font-display text-[clamp(1.5rem,4.5vw,2.5rem)] font-bold tracking-tight text-ink leading-[1.15]">
              Let&apos;s talk. We&apos;re ready to help.
            </h1>
            <p className="mt-2.5 max-w-md text-[14px] font-medium leading-[1.55] text-ink/85 sm:mt-3 sm:text-[15px] md:text-base">
              Reach the Comtanix team for careers, partnerships, or general
              questions — by phone, email, or the form below.
            </p>
            <div className="mt-5 flex w-full max-w-md flex-col gap-2.5 sm:mt-6 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-3">
              <Button
                href={`mailto:${CONFIG.email}`}
                className="!bg-[#55ACB5] text-white hover:!brightness-110"
              >
                Email us <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href={`tel:+${CONFIG.whatsapp}`} variant="secondary">
                Call us <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <GetInTouch />
      <ContactMap />
    </>
  );
}
