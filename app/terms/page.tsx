import type { Metadata } from "next"
import { LegalLayout, LegalSection, LegalList } from "@/components/legal-layout"

const EMAIL = "makomarketing0@gmail.com"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing your use of the Mako Marketing website and services, governed by the laws of the Province of Ontario, Canada.",
}

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      updated="February 1, 2026"
      intro="These Terms and Conditions (“Terms”) govern your access to and use of the website and services provided by Mako Marketing (“Mako Marketing,” “we,” “us,” or “our”). By accessing our website or engaging our services, you agree to be bound by these Terms. If you do not agree, please do not use our website or services."
    >
      <LegalSection n={1} title="Acceptance of these terms">
        <p>
          By accessing or using this website, requesting an audit or proposal, or
          engaging Mako Marketing to provide services, you acknowledge that you
          have read, understood, and agree to be bound by these Terms and by our{" "}
          <a href="/privacy-policy">Privacy Policy</a>. If you are entering into
          these Terms on behalf of a business or other legal entity, you represent
          that you have the authority to bind that entity.
        </p>
      </LegalSection>

      <LegalSection n={2} title="Our services">
        <p>
          Mako Marketing provides digital marketing services, which may include
          Google Ads, Meta Ads, Google Local Service Ads, search engine
          optimization, website design and development, CRM development, and
          related consulting. The specific scope, deliverables, fees, and timelines
          for any engagement will be set out in a separate written agreement,
          proposal, or statement of work (each, an “Engagement Agreement”). In the
          event of a conflict between these Terms and an Engagement Agreement, the
          Engagement Agreement will govern for that engagement.
        </p>
      </LegalSection>

      <LegalSection n={3} title="No guarantee of results">
        <p>
          Digital marketing outcomes depend on many factors outside our control,
          including third-party advertising platforms, market conditions, and your
          own products, pricing, and responsiveness. Any figures, projections, or
          examples shown on our website or in our proposals are illustrative and do
          not constitute a guarantee of specific results, rankings, revenue, or
          return on investment.
        </p>
      </LegalSection>

      <LegalSection n={4} title="Client responsibilities">
        <p>When you engage our services, you agree to:</p>
        <LegalList
          items={[
            "Provide accurate, complete, and timely information, access, and materials that we reasonably require",
            "Hold all rights and permissions necessary for the content, trademarks, and materials you provide to us",
            "Comply with the policies and terms of any third-party platforms used in your campaigns (including Google and Meta)",
            "Review and approve deliverables within agreed timelines, and pay all fees when due",
          ]}
        />
      </LegalSection>

      <LegalSection n={5} title="Fees and payment">
        <p>
          Fees, payment schedules, and any third-party advertising spend are set
          out in the applicable Engagement Agreement. Unless otherwise stated,
          invoices are due on receipt, fees are exclusive of applicable taxes
          (including GST/HST), and advertising spend paid to third-party platforms
          is separate from and in addition to our service fees. We may suspend
          services on overdue accounts after providing reasonable notice.
        </p>
      </LegalSection>

      <LegalSection n={6} title="Third-party services and platforms">
        <p>
          Our services rely on third-party platforms and tools (such as Google,
          Meta, and Calendly), each governed by its own terms and policies. We are
          not responsible for the availability, performance, decisions, or actions
          of these third parties, including account suspensions, policy changes, or
          pricing changes that may affect your campaigns.
        </p>
      </LegalSection>

      <LegalSection n={7} title="Intellectual property">
        <p>
          All content on this website, including text, graphics, logos, and design,
          is owned by or licensed to Mako Marketing and is protected by applicable
          intellectual property laws. You may not copy, reproduce, or distribute it
          without our prior written consent.
        </p>
        <p>
          Ownership of deliverables created for a client is addressed in the
          applicable Engagement Agreement. Unless otherwise agreed in writing, you
          retain ownership of materials you provide to us, and we retain ownership
          of our pre-existing tools, methods, and know-how.
        </p>
      </LegalSection>

      <LegalSection n={8} title="Acceptable use">
        <p>
          You agree not to use our website or services in any way that is unlawful,
          infringing, or harmful, that attempts to gain unauthorized access to our
          systems, or that interferes with the operation or security of the
          website. We may restrict or terminate access for conduct that violates
          these Terms.
        </p>
      </LegalSection>

      <LegalSection n={9} title="Disclaimer of warranties">
        <p>
          Except as expressly stated in an Engagement Agreement, our website and
          services are provided on an “as is” and “as available” basis without
          warranties of any kind, whether express, implied, or statutory, including
          implied warranties of merchantability, fitness for a particular purpose,
          and non-infringement, to the fullest extent permitted by applicable law.
        </p>
      </LegalSection>

      <LegalSection n={10} title="Limitation of liability">
        <p>
          To the fullest extent permitted by applicable law, Mako Marketing will
          not be liable for any indirect, incidental, special, consequential, or
          punitive damages, or for any loss of profits, revenue, data, or business,
          arising out of or relating to your use of our website or services. Our
          total aggregate liability for any claim arising out of or relating to an
          engagement will not exceed the fees you paid to us for the services giving
          rise to the claim in the three (3) months preceding the event that gave
          rise to the liability. Nothing in these Terms excludes liability that
          cannot be excluded under applicable law.
        </p>
      </LegalSection>

      <LegalSection n={11} title="Indemnification">
        <p>
          You agree to indemnify and hold harmless Mako Marketing and its personnel
          from any claims, damages, liabilities, and expenses (including reasonable
          legal fees) arising out of your breach of these Terms, your violation of
          any law, or your infringement of any third-party right, including in
          relation to content or materials you provide to us.
        </p>
      </LegalSection>

      <LegalSection n={12} title="Termination">
        <p>
          Either party may terminate an engagement in accordance with the
          applicable Engagement Agreement. We may suspend or terminate your access
          to our website at any time if you breach these Terms. Provisions that by
          their nature should survive termination — including those relating to
          intellectual property, disclaimers, limitation of liability, and
          indemnification — will survive.
        </p>
      </LegalSection>

      <LegalSection n={13} title="Governing law and jurisdiction">
        <p>
          These Terms are governed by and construed in accordance with the laws of
          the Province of Ontario and the federal laws of Canada applicable
          therein, without regard to conflict-of-laws principles. You agree to the
          exclusive jurisdiction of the courts located in the Province of Ontario
          for the resolution of any dispute arising out of or relating to these
          Terms, subject to any mandatory consumer-protection rights available to
          you under the law of your province of residence.
        </p>
      </LegalSection>

      <LegalSection n={14} title="Changes to these terms">
        <p>
          We may update these Terms from time to time. The “Last updated” date at
          the top of this page indicates when they were last revised. Changes take
          effect when posted, and your continued use of our website or services
          constitutes acceptance of the updated Terms.
        </p>
      </LegalSection>

      <LegalSection n={15} title="Contact us">
        <p>
          If you have any questions about these Terms, please contact us at{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
