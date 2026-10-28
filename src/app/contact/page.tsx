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
    "Whether you're interested in joining our team or exploring business opportunities, we'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Connect With Us"
        description="Whether you're interested in joining our team or exploring business opportunities, we'd love to hear from you."
        image="/contact/comtanix_hero_2880x738.png"
        imageAlt="Comtanix office building at night with Comtanix signage visible"
        imageFit="contain"
        objectPosition="center center"
        className="page-hero-banner contact-hero w-full !aspect-[2880/738] !h-auto !min-h-0 !max-h-none !bg-transparent max-sm:!min-h-0 max-sm:!aspect-[2880/738]"
      >
        <Button href={`mailto:${CONFIG.email}`} variant="white">
          Email Us <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href={`tel:+${CONFIG.whatsapp}`} variant="outlineLight">
          Call Us <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </PageHero>

      <GetInTouch />
      <ContactMap />
    </>
  );
}
