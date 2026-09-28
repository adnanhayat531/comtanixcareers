import type { Metadata } from "next";
import { GetInTouch } from "@/components/layout/GetInTouch";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Comtanix — call, email, or send a message about careers and partnerships.",
};

export default function ContactPage() {
  return (
    <div className="pt-4 md:pt-6">
      <GetInTouch />
    </div>
  );
}
