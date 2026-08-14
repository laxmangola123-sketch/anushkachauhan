import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Privacy Policy | Anushka Chauhan Couture",
  description: "Read the Privacy Policy of Anushka Chauhan Couture.",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 text-[#1c1813]">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#aa9775] font-semibold mb-3 block">
            Legal & Policy
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl tracking-wide uppercase text-[#1c1813] mb-4">
            Privacy Policy
          </h1>
          <div className="w-16 h-[1px] bg-[#c5a880]/30 mx-auto mt-4" />
        </div>

        {/* Content */}
        <div className="font-sans text-xs sm:text-sm leading-relaxed text-[#1c1813]/85 space-y-8">
          <p className="italic text-[#1c1813]/60 text-right">
            Last Updated: August 2026
          </p>

          <p>
            At Anushka Chauhan, we are committed to protecting your privacy and safeguarding the personal information you share with us.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, store, and protect your information when you visit anuskhachauhan.com, place an order, book an appointment, subscribe to our communications, or otherwise interact with our brand.
          </p>
          <p>
            By using our website, you agree to the practices outlined in this Privacy Policy.
          </p>

          <div className="space-y-4 pt-4 border-t border-[#c5a880]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#aa9775] font-bold">
              Information We Collect
            </h2>
            <p>We may collect the following information:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Billing and shipping addresses</li>
              <li>Order history and purchase information</li>
              <li>Communication preferences</li>
              <li>Information submitted through enquiries, appointments, WhatsApp conversations, or customer service interactions</li>
            </ul>
            <p className="pt-2">We may also automatically collect certain technical information, including:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>IP address</li>
              <li>Browser type and device information</li>
              <li>Website activity and browsing behaviour</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#c5a880]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#aa9775] font-bold">
              How We Use Your Information
            </h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Process and fulfil orders</li>
              <li>Arrange deliveries and customer support</li>
              <li>Schedule appointments and consultations</li>
              <li>Respond to enquiries and requests</li>
              <li>Improve our website, products, and services</li>
              <li>Personalise your shopping experience</li>
              <li>Send updates regarding orders, collections, events, and marketing communications where permitted</li>
            </ul>
            <p className="italic text-[#1c1813]/60 pt-1">
              You may opt out of marketing communications at any time.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#c5a880]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#aa9775] font-bold">
              Cookies & Analytics
            </h2>
            <p>
              Our website uses cookies and similar technologies to improve functionality, understand website performance, and enhance your browsing experience.
            </p>
            <p>
              Cookies may help us remember your preferences, analyse website traffic, and provide a more personalised experience. Most web browsers allow you to control or disable cookies through browser settings.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#c5a880]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#aa9775] font-bold">
              Sharing Your Information
            </h2>
            <p>We do not sell your personal information.</p>
            <p>
              We may share your information with trusted third-party service providers who assist us in operating our business, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Payment processing providers</li>
              <li>Shipping and logistics partners</li>
              <li>Customer service platforms</li>
              <li>Marketing and analytics providers</li>
              <li>Technology and website service providers</li>
            </ul>
            <p className="pt-2">
              These partners are only permitted to use your information as necessary to perform services on our behalf.
            </p>
            <p>
              We may also disclose information where required by law or to protect the rights, safety, and integrity of Anushka Chauhan, our customers, or others.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#c5a880]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#aa9775] font-bold">
              Data Security
            </h2>
            <p>
              We take reasonable administrative, technical, and organisational measures to protect your personal information from unauthorised access, misuse, disclosure, or loss.
            </p>
            <p className="italic text-[#1c1813]/60">
              While we strive to safeguard your information, no method of transmission over the internet or electronic storage can be guaranteed to be completely secure.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#c5a880]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#aa9775] font-bold">
              Data Retention
            </h2>
            <p>
              We retain personal information only for as long as necessary to fulfil the purposes outlined in this Privacy Policy, including legal, accounting, and operational requirements.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#c5a880]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#aa9775] font-bold">
              Your Rights
            </h2>
            <p>
              Subject to applicable laws, you may request access to, correction of, or deletion of your personal information. To make such a request, please contact us using the details provided below.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#c5a880]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#aa9775] font-bold">
              Third-Party Websites
            </h2>
            <p>
              Our website may contain links to external websites. Anushka Chauhan is not responsible for the privacy practices, content, or policies of third-party websites, and we encourage you to review their privacy policies separately.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#c5a880]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#aa9775] font-bold">
              Children’s Privacy
            </h2>
            <p>
              Our website is not intended for individuals under the age of 18, and we do not knowingly collect personal information from children.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#c5a880]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#aa9775] font-bold">
              Changes to this Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our business practices, legal requirements, or website functionality. Any updates will be posted on this page and become effective immediately upon publication.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t-2 border-[#c5a880]/30">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#1c1813] font-bold">
              Contact Us
            </h2>
            <div className="space-y-1 font-semibold text-xs uppercase tracking-wider">
              <p className="font-editorial font-bold text-base text-[#1c1813]">Anushka Chauhan</p>
              <p className="text-[#1c1813]/60">Address: NA</p>
              <p>Email: <a href="mailto:business@anushkachauhan.com" className="underline hover:text-[#aa9775] transition-colors">business@anushkachauhan.com</a></p>
              <p>Phone: <a href="tel:+919041588678" className="underline hover:text-[#aa9775] transition-colors">+91 9041588678</a></p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
