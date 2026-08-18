import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Terms & Conditions | Anushka Chauhan Couture",
  description: "Read the Terms & Conditions of Anushka Chauhan Couture.",
};

export default function TermsPage() {
  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 text-[#1c1813]">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#9c6d68] font-semibold mb-3 block">
            Agreement & terms
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl tracking-wide uppercase text-[#1c1813] mb-4">
            Terms & Conditions
          </h1>
          <div className="w-16 h-[1px] bg-[#cca09d]/30 mx-auto mt-4" />
        </div>

        {/* Content */}
        <div className="font-sans text-xs sm:text-sm leading-relaxed text-[#1c1813]/85 space-y-8">
          <p className="italic text-[#1c1813]/60 text-right">
            Last Updated: August 2026
          </p>

          <p>
            Welcome to anuskhachauhan.com. By accessing or using this website, you agree to be bound by these Terms & Conditions, together with our Privacy Policy and any other policies referenced on this website.
          </p>
          <p>
            Throughout these Terms & Conditions, “Anushka Chauhan”, “we”, “us”, and “our” refer to Anushka Chauhan. “You” and “your” refer to any user, visitor, or customer accessing this website.
          </p>

          <div className="space-y-4 pt-4 border-t border-[#cca09d]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#9c6d68] font-bold">
              Your Information
            </h2>
            <p>
              When placing an order or creating an account, you may be required to provide personal information including your name, email address, phone number, billing address, shipping address, and order history.
            </p>
            <p>
              You are responsible for ensuring that the information provided is accurate, complete, and kept up to date.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#cca09d]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#9c6d68] font-bold">
              Payments
            </h2>
            <p>
              All payments on anuskhachauhan.com are processed through secure third-party payment providers.
            </p>
            <p>
              Anushka Chauhan does not store or have access to your complete credit card, debit card, banking, or payment credentials. Such information is handled directly by our authorised payment partners in accordance with applicable security and compliance standards.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#cca09d]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#9c6d68] font-bold">
              Intellectual Property
            </h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, videos, artwork, designs, product photography, digital assets, and website layout, is the exclusive property of Anushka Chauhan or its licensors and is protected by applicable intellectual property laws.
            </p>
            <p>
              No content from this website may be copied, reproduced, distributed, modified, published, transmitted, or otherwise used without prior written consent from Anushka Chauhan.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#cca09d]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#9c6d68] font-bold">
              Product Information
            </h2>
            <p>
              We make every effort to ensure that product descriptions, imagery, pricing, availability, and other information displayed on our website are accurate and up to date.
            </p>
            <p>
              However, slight variations may occur due to the handcrafted nature of our garments. Colours may also appear differently across screens, devices, and lighting conditions, and therefore exact colour accuracy cannot be guaranteed.
            </p>
            <p>
              We reserve the right to correct any errors, inaccuracies, omissions, or pricing discrepancies and to update or modify information without prior notice.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#cca09d]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#9c6d68] font-bold">
              Limitation of Liability
            </h2>
            <p>
              While we strive to maintain accurate and current information on this website, Anushka Chauhan makes no warranties or representations regarding the completeness, accuracy, reliability, or suitability of any content available on the website.
            </p>
            <p>
              Your use of this website and reliance on any information provided is entirely at your own discretion and risk.
            </p>
            <p>
              To the fullest extent permitted by applicable law, Anushka Chauhan shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>The use or inability to use this website</li>
              <li>Any errors or omissions in website content</li>
              <li>Delays or interruptions in website availability</li>
              <li>Products purchased through the website</li>
            </ul>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#cca09d]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#9c6d68] font-bold">
              Third-Party Links
            </h2>
            <p>
              This website may contain links to third-party websites for your convenience and reference. These links do not constitute an endorsement by Anushka Chauhan, and we are not responsible for the content, policies, security, or practices of any external websites.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#cca09d]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#9c6d68] font-bold">
              Unauthorised Use
            </h2>
            <p>
              Unauthorised use of this website, including attempts to interfere with its operation, misuse its content, access restricted areas, or infringe upon intellectual property rights, may result in legal action and other remedies available under applicable law.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#cca09d]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#9c6d68] font-bold">
              Linking to our Website
            </h2>
            <p>
              You may not create links to anuskhachauhan.com from another website, publication, platform, or digital medium without prior written permission from Anushka Chauhan.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#cca09d]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#9c6d68] font-bold">
              Changes to these Terms
            </h2>
            <p>
              Anushka Chauhan reserves the right to update, modify, or revise these Terms & Conditions at any time without prior notice. By continuing to use this website after any changes are published, you acknowledge and agree to be bound by the revised Terms & Conditions.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#cca09d]/15">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#9c6d68] font-bold">
              Governing Law
            </h2>
            <p>
              These Terms & Conditions shall be governed by and construed in accordance with the laws of India.
            </p>
            <p>
              Any disputes arising from the use of this website, purchases made through it, or these Terms & Conditions shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t-2 border-[#cca09d]/30 font-semibold text-xs uppercase tracking-wider">
            <h2 className="font-editorial text-lg tracking-wide uppercase text-[#1c1813] font-bold normal-case mb-2">
              Contact Details
            </h2>
            <p>Email: <a href="mailto:business@anushkachauhan.com" className="underline hover:text-[#9c6d68] transition-colors">business@anushkachauhan.com</a></p>
            <p>Phone: <a href="tel:+919041588678" className="underline hover:text-[#9c6d68] transition-colors">+91 9041588678</a></p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
