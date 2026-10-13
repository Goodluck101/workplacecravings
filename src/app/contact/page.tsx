import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { contactEmails, siteConfig, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Order food, request corporate quotes, or ask about wholesale — ${siteConfig.name}, ${siteConfig.city}.`,
};

export default function ContactPage() {
  const waUrl = whatsappUrl(
    `Hello ${siteConfig.name}, I'd like to get in touch about an order.`,
  );

  return (
    <>
      <section className="page-hero py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Contact"
            title="Let's talk food"
            description="Individual orders, corporate catering, events, or wholesale — send a message and we'll get back to you quickly."
          />
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:gap-12 lg:px-8">
          <div className="lg:col-span-2">
            <h2 className="font-display text-lg font-bold text-brand-green">Reach us directly</h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <p className="text-xs font-bold uppercase text-brand-muted">WhatsApp (fastest)</p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block font-semibold text-brand-orange hover:underline"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <p className="text-xs font-bold uppercase text-brand-muted">Phone</p>
                <a
                  href={`tel:${siteConfig.phoneTel}`}
                  className="mt-1 block font-semibold text-brand-green hover:text-brand-orange"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <p className="text-xs font-bold uppercase text-brand-muted">Email</p>
                <ul className="mt-1 space-y-1">
                  {contactEmails.map((email) => (
                    <li key={email}>
                      <a
                        href={`mailto:${email}`}
                        className="font-semibold text-brand-green hover:text-brand-orange"
                      >
                        {email}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <p className="text-xs font-bold uppercase text-brand-muted">Location</p>
                <p className="mt-1 font-semibold text-brand-green">{siteConfig.location}</p>
              </li>
              <li>
                <p className="text-xs font-bold uppercase text-brand-muted">Hours</p>
                <p className="mt-1 font-semibold text-brand-green">{siteConfig.hours}</p>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
