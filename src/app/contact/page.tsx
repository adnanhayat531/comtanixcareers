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
    "Interested in joining Comtanix or working with us? Our team is available by phone and email to guide you.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Connect"
        description="Interested in joining Comtanix or working with us? Our team is available by phone and email to guide you."
        image="/contact/hero-v3.jpg"
        imageAlt="Comtanix office building at night, Bahria Town"
        imageFit="cover"
        objectPosition="70% 42%"
        className="!h-[min(34svh,18rem)] !min-h-[12rem] !max-h-[20rem]"
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
