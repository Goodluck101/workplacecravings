import type { Metadata } from "next";
import { RegisterForm } from "@/components/RegisterForm";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Register",
  description: `Register as a person or a company with ${siteConfig.name}, using an email address or a phone number.`,
};

export default function RegisterPage() {
  return (
    <>
      <section className="page-hero py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Register"
            title="Join as a person or a company"
            description="Use an email address or a phone number. A confirmation is sent as soon as the registration succeeds. Ordering on WhatsApp remains open."
          />
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <RegisterForm />
        </div>
      </section>
    </>
  );
}
