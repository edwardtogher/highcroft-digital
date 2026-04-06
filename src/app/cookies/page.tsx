import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | Highcroft Digital",
};

export default function CookiesPage() {
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

        <h1 className="policy-title">Cookie Policy</h1>
        <p className="policy-updated">Last updated: 31 March 2026</p>

        <div className="policy-body">
          <p>
            This policy explains what cookies are, how this website uses them,
            and how you can manage them.
          </p>

          <h2>What are cookies?</h2>
          <p>
            Cookies are small text files that websites place on your device
            when you visit. They are widely used to make websites work properly,
            improve the user experience, and provide information to site owners.
            Cookies can be &quot;session&quot; cookies (deleted when you close your
            browser) or &quot;persistent&quot; cookies (stored until they expire or you
            delete them).
          </p>

          <h2>What cookies does this site use?</h2>
          <p>
            We keep cookie usage to a bare minimum. This site does not use
            advertising cookies, social media tracking cookies, or any
            third-party marketing cookies.
          </p>

          <h3>Essential cookies</h3>
          <p>
            These are cookies that are strictly necessary for the website to
            function. They may include cookies set by our hosting provider
            (Vercel) for things like load balancing and security. You cannot opt
            out of these without affecting how the site works.
          </p>

          <h3>Analytics</h3>
          <p>
            We use Vercel Analytics, which is designed to be privacy-friendly.
            Vercel Analytics works without placing tracking cookies on your
            device. It collects anonymised, aggregated data about page views
            and site performance -- it does not track individual visitors or
            build user profiles.
          </p>

          <h2>Third-party cookies</h2>
          <p>
            We do not embed any third-party content (such as social media
            widgets, ads, or external video players) that would set their own
            cookies on your device.
          </p>

          <h2>How to manage cookies</h2>
          <p>
            Most browsers allow you to control cookies through their settings.
            You can usually:
          </p>
          <ul>
            <li>View what cookies are stored on your device</li>
            <li>Delete some or all cookies</li>
            <li>Block cookies from specific sites or from all sites</li>
            <li>Set your browser to notify you when a cookie is set</li>
          </ul>
          <p>
            Here are links to cookie management instructions for common
            browsers:
          </p>
          <ul>
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>
          <p>
            Please note that blocking all cookies may affect the functionality
            of some websites, though this site should work fine with cookies
            disabled.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If we change what cookies this site uses, we will update this page.
            If we ever introduce non-essential cookies (such as analytics
            cookies that require consent), we will add a cookie consent
            mechanism to the site.
          </p>

          <h2>Contact</h2>
          <p>
            If you have any questions about our use of cookies, please get in
            touch:
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
