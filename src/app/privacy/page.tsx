import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Highcroft Digital",
};

export default function PrivacyPage() {
  return (
    <>
      {/* Sticky header */}
      <header className="sticky-header show" id="stickyHeader">
        <Link href="/" className="header-link">
          <div className="logo-mark">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="wordmark">
            <span className="wordmark-main">HIGHCROFT</span>
            <span className="wordmark-sub">DIGITAL</span>
          </div>
        </Link>
      </header>

      {/* Content */}
      <main className="policy-page">
        <Link href="/" className="back-link">
          &larr; Back to home
        </Link>

        <h1 className="policy-title">Privacy Policy</h1>
        <p className="policy-updated">Last updated: 31 March 2026</p>

        <div className="policy-body">
          <p>
            Highcroft Digital (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a digital studio run by Ed
            Togher, based in Surrey, UK. We take your privacy seriously and are
            committed to protecting any personal data you share with us. This
            policy explains what data we collect through this website, why we
            collect it, and what rights you have.
          </p>

          <h2>What data we collect</h2>
          <p>
            We keep data collection to a minimum. When you visit this website,
            the following may be collected automatically:
          </p>
          <ul>
            <li>
              <strong>Server logs</strong> -- your IP address, browser type,
              referring page, and the pages you visit. These are generated
              automatically by our hosting provider.
            </li>
            <li>
              <strong>Analytics data</strong> -- we use Vercel Analytics, which
              collects anonymised usage data such as page views, device type,
              and country. Vercel Analytics is privacy-focused and does not use
              cookies for tracking.
            </li>
          </ul>
          <p>
            We do not collect names, email addresses, or any other personal
            information through this website unless you contact us directly
            (for example, by emailing us).
          </p>

          <h2>How we use your data</h2>
          <p>Any data we collect is used solely to:</p>
          <ul>
            <li>
              Understand how visitors use the website so we can improve it
            </li>
            <li>Maintain the security and performance of the site</li>
            <li>Respond to enquiries if you contact us directly</li>
          </ul>
          <p>
            We do not sell, rent, or share your data with third parties for
            marketing purposes.
          </p>

          <h2>Third parties</h2>
          <p>
            This website is hosted on <strong>Vercel</strong>. Vercel processes
            server logs and analytics data on our behalf. You can read{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vercel&apos;s privacy policy
            </a>{" "}
            for details on how they handle data.
          </p>
          <p>
            We do not use any other third-party services that collect personal
            data through this website.
          </p>

          <h2>Cookies</h2>
          <p>
            This website uses only essential cookies required for the site to
            function. We do not use tracking cookies or advertising cookies. For
            more detail, see our{" "}
            <a href="/cookies">Cookie Policy</a>.
          </p>

          <h2>Data retention</h2>
          <p>
            Server logs are retained by our hosting provider according to their
            standard retention periods (typically up to 30 days). Analytics
            data is aggregated and anonymised -- it cannot be used to identify
            individual visitors. If you contact us by email, we will keep your
            correspondence for as long as needed to deal with your enquiry,
            unless you ask us to delete it sooner.
          </p>

          <h2>Your rights under UK GDPR</h2>
          <p>
            Under UK data protection law, you have the right to:
          </p>
          <ul>
            <li>
              <strong>Access</strong> -- request a copy of any personal data we
              hold about you
            </li>
            <li>
              <strong>Correction</strong> -- ask us to correct inaccurate or
              incomplete data
            </li>
            <li>
              <strong>Deletion</strong> -- ask us to delete your personal data
            </li>
            <li>
              <strong>Restriction</strong> -- ask us to restrict how we process
              your data
            </li>
            <li>
              <strong>Portability</strong> -- request your data in a
              machine-readable format
            </li>
            <li>
              <strong>Objection</strong> -- object to our processing of your
              data
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the
            details below. We will respond within 30 days.
          </p>
          <p>
            You also have the right to lodge a complaint with the{" "}
            <a
              href="https://ico.org.uk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Information Commissioner&apos;s Office (ICO)
            </a>{" "}
            if you believe your data has been handled improperly.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. Any changes will be
            posted on this page with an updated date.
          </p>

          <h2>Contact</h2>
          <p>
            If you have any questions about this privacy policy or want to make
            a data request, please get in touch:
          </p>
          <p>
            Ed Togher
            <br />
            Highcroft Digital
            <br />
            Email:{" "}
            <a href="mailto:ed@highcroftdigital.com">
              ed@highcroftdigital.com
            </a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <span className="footer-copy">&copy; 2026 Highcroft Digital</span>
          <span className="footer-location">Surrey, UK</span>
        </div>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms &amp; Conditions</a>
          <a href="/cookies">Cookie Policy</a>
        </div>
      </footer>
    </>
  );
}
