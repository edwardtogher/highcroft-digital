import Link from "next/link";

interface PreviewPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { slug } = await params;

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

      <main className="policy-page">
        <Link href="/" className="back-link">
          &larr; Back to home
        </Link>

        <h1 className="policy-title">Preview coming soon</h1>
        <div className="policy-body">
          <p>
            The preview for <strong>{slug}</strong> is being built. Check back
            soon.
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
