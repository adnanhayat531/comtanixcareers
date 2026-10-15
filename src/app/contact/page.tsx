import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { ContactMap } from "@/components/contact/ContactMap";
import { GetInTouch } from "@/components/layout/GetInTouch";
import { CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Comtanix. Call, email, or visit our office. Find us on the map.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk. We're ready to help."
        description="Reach the Comtanix team for careers, partnerships, or general questions by phone, email, or the form below."
        image="/contact/hero-building.jpg?v=wide"
        imageAlt="Comtanix office building at night, Bahria Town"
        imageFit="contain"
        imagePosition="right"
        imageBlend
        className="!min-h-[clamp(15rem,48svh,22rem)] sm:!min-h-[clamp(16rem,46svh,24rem)] md:!min-h-[clamp(17rem,42svh,26rem)]"
      >
        <Button href={`mailto:${CONFIG.email}`} variant="white">
          Email us <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href={`tel:+${CONFIG.whatsapp}`} variant="outlineLight">
          Call us <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </PageHero>

      <GetInTouch />
      <ContactMap />
    </>
  );
}
