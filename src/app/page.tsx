"use client";

import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in, .service").forEach((el) => {
      observer.observe(el);
    });

    const heroLogo = document.getElementById("heroLogo");
    const stickyHeader = document.getElementById("stickyHeader");

    let logoObserver: IntersectionObserver | undefined;
    if (heroLogo && stickyHeader) {
      logoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              stickyHeader.classList.remove("show");
            } else {
              stickyHeader.classList.add("show");
            }
          });
        },
        { threshold: 0, rootMargin: "0px 0px 0px 0px" }
      );
      logoObserver.observe(heroLogo);
    }

    return () => {
      observer.disconnect();
      logoObserver?.disconnect();
    };
  }, []);

  return (
    <>
      {/* Sticky header - appears when you scroll past the hero logo */}
      <header className="sticky-header" id="stickyHeader">
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
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="accent-yellow"></div>
        <p className="hero-label fade-in">Digital Design Studio</p>
        <div className="hero-logo fade-in" id="heroLogo">
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
        </div>
        <p className="hero-sub fade-in">
          Modern websites, AI tools, and automation systems for businesses that
          want real results without the agency runaround. Based in Surrey, UK.
        </p>
      </section>

      {/* Services */}
      <section className="services">
        <p className="services-label fade-in">What we build</p>
        <div className="services-grid">
          <div className="service">
            <div className="service-marker"></div>
            <h3>Modern Websites</h3>
            <p>
              Fast, responsive sites built with clean code. Designed to load
              quickly and convert visitors into customers.
            </p>
          </div>
          <div className="service">
            <div className="service-marker"></div>
            <h3>AI &amp; Automation</h3>
            <p>
              Custom AI tools and automated workflows that handle the repetitive
              work so your team doesn&apos;t have to.
            </p>
          </div>
          <div className="service">
            <div className="service-marker"></div>
            <h3>Ongoing Support</h3>
            <p>
              Hosting, updates, and maintenance handled. Your site stays fast,
              secure, and up to date.
            </p>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="approach fade-in">
        <div className="approach-left">
          <p className="approach-label">How we work</p>
          <h2 className="approach-heading">Direct. Fast. No filler.</h2>
        </div>
        <div className="approach-right">
          <p className="approach-text">
            You work directly with the person building your project. No account
            managers, no handoffs, no waiting. Just clear communication and real
            progress.
          </p>
          <p className="approach-text">
            We build in short cycles, stay close to the problem, and put working
            software in your hands fast.
          </p>
        </div>
      </section>

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
