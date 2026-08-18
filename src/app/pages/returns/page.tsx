import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Returns & Exchanges | Anushka Chauhan Couture",
  description: "Read the returns, exchanges, and cancellation policies of Anushka Chauhan Couture.",
};

export default function ReturnsPage() {
  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 text-[#1c1813]">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#9c6d68] font-semibold mb-3 block">
            Customer Care
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl tracking-wide uppercase text-[#1c1813] mb-4">
            Returns & Exchanges
          </h1>
          <div className="w-16 h-[1px] bg-[#cca09d]/30 mx-auto mt-4" />
        </div>

        {/* Content */}
        <div className="font-sans text-xs sm:text-sm leading-relaxed text-[#1c1813]/85 space-y-8">
          <div className="space-y-3">
            <p>
              We take great care in ensuring every Anushka Chauhan piece meets the highest standards of craftsmanship and quality.
            </p>
            <p className="font-bold text-[#1c1813]">
              As a standard policy across all points of sale, we do not offer returns, exchanges, or refunds on any purchases — whether made-to-order or off-the-rack.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#cca09d]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#9c6d68] font-bold">
              Exceptions
            </h2>
            <p>
              In the rare event of an issue, we will assist you under the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The delivery arrives damaged or defective.</li>
              <li>There is an irreparable issue with a made-to-order piece that does not align with the confirmed specifications, such as sizing, colour, or construction.</li>
              <li>There has been an unforeseen delay in delivery that was not communicated in advance.</li>
            </ul>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#cca09d]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#9c6d68] font-bold">
              How to Raise a Request
            </h2>
            <p>
              If you experience any of the above, please contact us within 24 hours of receiving your order. Kindly include:
            </p>
            <ul className="list-disc pl-5 space-y-2 font-semibold">
              <li>Your order details</li>
              <li>A clear description of the concern</li>
              <li>Images highlighting the issue</li>
            </ul>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#cca09d]/15 bg-[#eedec8]/10 p-5 rounded-sm">
            <h2 className="font-editorial text-base tracking-widest uppercase text-[#1c1813] font-bold">
              Important Terms
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-[11px] sm:text-xs">
              <li>Returns will only be accepted once confirmed by our team.</li>
              <li>Unauthorised returns will not be accepted.</li>
              <li>Items must be unused, in original condition, and returned with all packaging.</li>
              <li>Once received, the piece will be reviewed and a decision will be communicated within 2–3 business days.</li>
              <li>All decisions are final and at the discretion of Anushka Chauhan.</li>
            </ul>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#cca09d]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#9c6d68] font-bold">
              Order Cancellations
            </h2>
            <p>
              All orders are final. Once confirmed, orders cannot be cancelled.
            </p>
            <p className="italic text-[#1c1813]/70">
              In the event of a cancellation request, the full payment will be retained as a cancellation fee. We do not offer refunds under any circumstances.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#cca09d]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#9c6d68] font-bold">
              Need Assistance?
            </h2>
            <p>
              For any queries regarding your order, returns, exchanges, or cancellations, our Client Services team is happy to assist you.
            </p>
            <div className="space-y-1 font-semibold">
              <p>Email: <a href="mailto:business@anushkachauhan.com" className="underline hover:text-[#9c6d68] transition-colors">business@anushkachauhan.com</a></p>
              <p>Phone: <a href="tel:+919041588678" className="underline hover:text-[#9c6d68] transition-colors">+91 9041588678</a></p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
