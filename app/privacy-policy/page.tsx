import type { Metadata } from "next"
import { LegalLayout, LegalSection, LegalList } from "@/components/legal-layout"

const EMAIL = "makomarketing0@gmail.com"
const PHONE = "905-260-5457"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Mako Marketing collects, uses, discloses, and protects your personal information in accordance with Canada's PIPEDA, CASL, and applicable provincial privacy laws.",
}

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="February 1, 2026"
      intro="Mako Marketing (“Mako Marketing,” “we,” “us,” or “our”) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information in accordance with the Personal Information Protection and Electronic Documents Act (PIPEDA), Canada's Anti-Spam Legislation (CASL), and applicable provincial privacy laws."
    >
      <LegalSection n={1} title="Scope of this policy">
        <p>
          This policy applies to personal information about identifiable
          individuals that we collect, use, or disclose in the course of our
          commercial activities, whether through our website, our marketing and
          advertising services, or any other interaction with us. It does not
          apply to information that is aggregated or anonymized so that it can no
          longer be associated with a specific individual.
        </p>
        <p>
          Mako Marketing is a business operating in the Province of Ontario,
          Canada. Where we act as a service provider on behalf of our clients,
          we process personal information under the direction of that client and
          in accordance with our agreements with them.
        </p>
      </LegalSection>

      <LegalSection n={2} title="What we mean by personal information">
        <p>
          “Personal information” means information about an identifiable
          individual, as defined under PIPEDA and applicable provincial
          legislation. It does not include the name, title, business address, or
          business telephone number of an employee of an organization when
          collected for the purpose of communicating with that person in
          relation to their employment.
        </p>
      </LegalSection>

      <LegalSection n={3} title="Information we collect">
        <p>We may collect the following categories of personal information:</p>
        <LegalList
          items={[
            <>
              <strong>Contact and identity information</strong> — your name,
              business name, email address, phone number, and mailing address,
              typically provided when you request an audit, book a call, or
              contact us.
            </>,
            <>
              <strong>Communications</strong> — the contents of messages, emails,
              form submissions, and call notes exchanged with us.
            </>,
            <>
              <strong>Commercial and account information</strong> — details about
              your business, marketing goals, advertising accounts, and billing
              information where you engage our services.
            </>,
            <>
              <strong>Technical and usage information</strong> — IP address,
              browser type, device information, pages viewed, referring URLs, and
              similar data collected automatically when you visit our website.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection n={4} title="How we collect information">
        <p>
          We collect personal information directly from you (for example, when
          you complete a form, email us, or speak with us), automatically through
          cookies and analytics technologies when you use our website, and, where
          applicable, from our clients or from third-party advertising and
          analytics platforms in the course of providing our services.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Consent">
        <p>
          Under PIPEDA, we collect, use, and disclose your personal information
          only with your knowledge and consent, except where otherwise permitted
          or required by law. Consent may be express (for example, when you
          submit a form or agree to receive communications) or implied (for
          example, where the purpose is obvious and you voluntarily provide the
          information).
        </p>
        <p>
          You may withdraw your consent at any time, subject to legal or
          contractual restrictions and reasonable notice. Withdrawing consent may
          limit our ability to provide you with certain services. To withdraw
          consent, contact us using the details in the “Contact us” section
          below.
        </p>
      </LegalSection>

      <LegalSection n={6} title="How we use your information">
        <p>We use personal information for purposes that a reasonable person would consider appropriate in the circumstances, including to:</p>
        <LegalList
          items={[
            "Respond to your enquiries and provide the audits, proposals, and services you request",
            "Provide, manage, and improve our marketing and advertising services",
            "Communicate with you about your account, our services, and relevant offers",
            "Process payments and administer our client relationships",
            "Operate, secure, and improve our website and understand how it is used",
            "Comply with our legal, regulatory, and contractual obligations",
          ]}
        />
      </LegalSection>

      <LegalSection n={7} title="Electronic communications and CASL">
        <p>
          We comply with Canada's Anti-Spam Legislation (CASL). We will only send
          you commercial electronic messages (such as marketing emails) where we
          have your express or implied consent to do so, and every such message
          will identify us and include a working unsubscribe mechanism. You may
          withdraw your consent to receive commercial electronic messages at any
          time by using the unsubscribe link in any message or by contacting us
          directly, and we will give effect to your request within the period
          required by law.
        </p>
      </LegalSection>

      <LegalSection n={8} title="Cookies and analytics">
        <p>
          Our website uses cookies and similar technologies to operate the site,
          remember your preferences, and understand aggregate usage through
          privacy-conscious analytics. You can control or disable cookies through
          your browser settings, though some features of the site may not
          function properly as a result. Where required, we will obtain your
          consent before using non-essential cookies.
        </p>
      </LegalSection>

      <LegalSection n={9} title="Disclosure to third parties">
        <p>
          We do not sell your personal information. We may disclose personal
          information to:
        </p>
        <LegalList
          items={[
            <>
              <strong>Service providers</strong> — third parties that perform
              services on our behalf, such as hosting, analytics, scheduling, and
              advertising platforms (for example, Google, Meta, and Calendly),
              who are authorized to use the information only as necessary to
              provide those services.
            </>,
            <>
              <strong>Our clients</strong> — where we collect information as a
              service provider on a client's behalf.
            </>,
            <>
              <strong>Legal and regulatory authorities</strong> — where required
              or permitted by law, including to comply with a subpoena, court
              order, or other legal process, or to protect our rights.
            </>,
            <>
              <strong>Business transactions</strong> — in connection with a sale,
              merger, or reorganization of our business, subject to appropriate
              safeguards.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection n={10} title="Transfers and storage outside Canada">
        <p>
          Some of our service providers may store or process personal information
          outside of Canada, including in the United States. Where personal
          information is transferred to a jurisdiction outside Canada, it may be
          subject to the laws of that jurisdiction, and foreign courts,
          governments, or agencies may be able to access it under those laws. We
          take reasonable contractual and organizational measures to ensure a
          comparable level of protection while the information is being processed
          by a third party on our behalf.
        </p>
      </LegalSection>

      <LegalSection n={11} title="Retention">
        <p>
          We retain personal information only for as long as necessary to fulfill
          the purposes for which it was collected, to provide our services, and
          to comply with our legal, tax, and accounting obligations. When personal
          information is no longer required, we will securely destroy, erase, or
          anonymize it.
        </p>
      </LegalSection>

      <LegalSection n={12} title="Safeguards">
        <p>
          We protect personal information using physical, organizational, and
          technological safeguards appropriate to its sensitivity, including
          restricted access, secure hosting, and encryption in transit where
          appropriate. No method of transmission or storage is completely secure,
          and we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection n={13} title="Your rights: access and correction">
        <p>
          Subject to certain exceptions permitted by law, you have the right to
          access the personal information we hold about you, to ask how it has
          been used and to whom it has been disclosed, and to request that
          inaccurate or incomplete information be corrected. We will respond to
          written requests within the timeframes required by applicable law and
          may need to verify your identity before doing so.
        </p>
      </LegalSection>

      <LegalSection n={14} title="Children's privacy">
        <p>
          Our website and services are directed to businesses and are not
          intended for individuals under the age of majority in their province of
          residence. We do not knowingly collect personal information from
          children. If you believe we have inadvertently collected such
          information, please contact us and we will take steps to delete it.
        </p>
      </LegalSection>

      <LegalSection n={15} title="Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or legal requirements. The “Last updated” date at the
          top of this page indicates when it was last revised. Your continued use
          of our website or services after any changes constitutes acceptance of
          the updated policy.
        </p>
      </LegalSection>

      <LegalSection n={16} title="Contact us and complaints">
        <p>
          If you have questions about this Privacy Policy, wish to access or
          correct your personal information, or want to withdraw consent, please
          contact our Privacy Officer at{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or{" "}
          <a href={`tel:${PHONE.replace(/-/g, "")}`}>{PHONE}</a>.
        </p>
        <p>
          If you are not satisfied with our response, you have the right to file a
          complaint with the Office of the Privacy Commissioner of Canada, or with
          the privacy regulator in your province where applicable.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
