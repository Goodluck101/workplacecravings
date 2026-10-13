import type { Metadata } from "next";
import { PlaceOrderForm } from "@/components/PlaceOrderForm";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order",
  description: `Place an order with ${siteConfig.name} on the website, or continue on WhatsApp.`,
};

export default function OrderPage() {
  return (
    <>
      <section className="page-hero py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Order"
            title="Order here, or on WhatsApp"
            description="Registered members can order with their email or phone. Guests can order by leaving a phone number. A confirmation is sent when the order is accepted."
          />
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <PlaceOrderForm />
        </div>
      </section>
    </>
  );
}
