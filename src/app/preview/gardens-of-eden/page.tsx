import type { Metadata } from "next";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Scissors,
  Fence,
  Flower2,
  LayoutGrid,
  Leaf,
  Wrench,
  Droplets,
  GraduationCap,
  Ruler,
  Gem,
  Users,
  ChevronRight,
  Star,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Gardens of Eden — Your New Site",
  description: "A modern, professional website for Gardens of Eden. Transforming outdoor spaces in the West Midlands with passion and expertise.",
  openGraph: {
    title: "Gardens of Eden — Your New Site",
    description: "A modern, professional website for Gardens of Eden.",
    url: "https://highcroftdigital.com/preview/gardens-of-eden",
    images: ["https://gardensofedenlandscaping.co.uk/wp-content/uploads/2025/01/cropped-G.O.E-logo-e1737467187216.png"],
  },
};

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const SERVICES = [
  {
    icon: Scissors,
    title: "Hedge Trimming",
    desc: "Expert hedge cutting and shaping to keep your garden boundaries looking neat and well-maintained all year round.",
  },
  {
    icon: Flower2,
    title: "Lawns & Turfing",
    desc: "From new turf installation to complete lawn care, we create lush green spaces your family will love.",
  },
  {
    icon: Fence,
    title: "Fencing & Gates",
    desc: "Durable, attractive fencing and gate installation to secure your property and enhance its kerb appeal.",
  },
  {
    icon: LayoutGrid,
    title: "Patios",
    desc: "Beautiful patio designs using quality materials - perfect for outdoor entertaining and relaxation.",
  },
  {
    icon: Leaf,
    title: "Low Maintenance Garden Design",
    desc: "Clever garden layouts that look stunning with minimal upkeep, ideal for busy homeowners.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Tidy-Ups",
    desc: "Regular or one-off garden maintenance to keep your outdoor space looking its absolute best.",
  },
  {
    icon: Droplets,
    title: "High-Tech Jet Washing",
    desc: "Professional pressure washing for driveways, patios and paths - restoring surfaces to like-new condition.",
  },
];

const GALLERY_IMAGES = [
  {
    src: "https://gardensofedenlandscaping.co.uk/wp-content/uploads/2025/01/472787007_8823853144391794_5015855783127728754_n.jpg",
    alt: "Beautiful garden landscaping project",
  },
  {
    src: "https://gardensofedenlandscaping.co.uk/wp-content/uploads/2025/01/c485e738-4750-4a59-a976-aa10e9bb3542-e1737627791663.jpg",
    alt: "Professional patio installation",
  },
  {
    src: "https://gardensofedenlandscaping.co.uk/wp-content/uploads/2025/01/c493baf3-b700-43de-a710-1f8ec7cea419-e1737627946817.jpg",
    alt: "Garden transformation project",
  },
  {
    src: "https://gardensofedenlandscaping.co.uk/wp-content/uploads/2025/01/826b6414-62c8-48b4-bd05-e10b478de614-e1737628599486.jpg",
    alt: "Landscaping and turfing work",
  },
  {
    src: "https://gardensofedenlandscaping.co.uk/wp-content/uploads/2025/01/44f6d0fb-3372-4a6a-bdf8-363ca0a66101-e1737628209514.jpg",
    alt: "Fencing and garden borders",
  },
  {
    src: "https://gardensofedenlandscaping.co.uk/wp-content/uploads/2025/01/6416e688-7442-4fa8-80ca-639437a42133.jpg",
    alt: "Garden maintenance results",
  },
];

const TRUST_ITEMS = [
  {
    icon: GraduationCap,
    title: "Highly Trained",
    desc: "Skilled landscapers with years of hands-on experience across all garden services.",
  },
  {
    icon: Ruler,
    title: "Tailored To Your Space",
    desc: "Every garden is different. We design and deliver bespoke solutions to match your vision.",
  },
  {
    icon: Gem,
    title: "Quality Materials",
    desc: "We only use premium, long-lasting materials so your garden stands the test of time.",
  },
  {
    icon: Users,
    title: "Friendly, Local & Reliable",
    desc: "A trusted West Midlands team that turns up on time and treats your home with respect.",
  },
];

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function GardensOfEdenPreview() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ==================== STICKY NAV ==================== */}
      <header className="sticky top-0 z-50 w-full border-b border-garden-pale/40 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <Image
              src="https://gardensofedenlandscaping.co.uk/wp-content/uploads/2025/01/G.O.E-logo-e1737467187216.png"
              alt="Gardens of Eden logo"
              width={44}
              height={44}
              className="rounded-lg transition-transform group-hover:scale-105"
              unoptimized
            />
            <span className="hidden sm:block font-serif text-lg text-garden-forest font-medium tracking-tight">
              Gardens of Eden
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-garden-charcoal/70 rounded-lg transition-colors hover:text-garden-primary hover:bg-garden-pale/30"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a href="tel:07950150785">
              <Button
                className="bg-garden-primary hover:bg-garden-light text-white cursor-pointer hidden sm:inline-flex h-9 px-4 text-sm rounded-lg"
              >
                Get a Quote
                <ChevronRight className="ml-1 size-4" />
              </Button>
            </a>
            {/* Mobile menu icon (visual only for prototype) */}
            <button className="md:hidden p-2 text-garden-charcoal/70 hover:text-garden-primary transition-colors">
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-garden-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[85vh] items-center gap-8 py-16 lg:grid-cols-2 lg:gap-12">
            {/* Left content */}
            <div className="flex flex-col items-start gap-6 lg:gap-8">
              <Badge className="bg-garden-pale/60 text-garden-forest border-garden-light/30 px-3 py-1 text-xs font-medium tracking-wide uppercase">
                <MapPin className="mr-1.5 size-3" />
                Walsall & West Midlands
              </Badge>

              <h1 className="font-serif text-4xl leading-tight tracking-tight text-garden-charcoal sm:text-5xl lg:text-6xl">
                Transforming outdoor spaces{" "}
                <span className="text-garden-primary">with passion</span>
              </h1>

              <p className="max-w-lg text-base leading-relaxed text-garden-charcoal/70 sm:text-lg">
                Professional landscaping and garden services across Walsall,
                Sutton Coldfield, Streetly and Great Barr. From design to
                build, we bring your dream garden to life.
              </p>

              <div className="flex flex-wrap gap-3">
                <a href="tel:07950150785">
                  <Button className="bg-garden-primary hover:bg-garden-light text-white cursor-pointer h-11 px-6 text-sm rounded-lg gap-2">
                    <Phone className="size-4" />
                    Call Now
                  </Button>
                </a>
                <a href="#services">
                  <Button
                    variant="outline"
                    className="h-11 px-6 text-sm rounded-lg border-garden-primary/30 text-garden-primary hover:bg-garden-pale/30 cursor-pointer"
                  >
                    Our Services
                    <ChevronRight className="ml-1 size-4" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Right image */}
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-garden-forest/10">
                <Image
                  src="https://gardensofedenlandscaping.co.uk/wp-content/uploads/2025/01/161682526_3624081341035693_7056085236352732923_n.jpg"
                  alt="Gardens of Eden landscaping project showcase"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-garden-pale/40 blur-2xl" />
              <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-garden-light/10 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="bg-garden-forest text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 py-10 sm:py-12 lg:grid-cols-4 lg:gap-8">
            {[
              { value: "7", label: "Services Offered" },
              { value: "100%", label: "Satisfaction" },
              { value: "Free", label: "Quotes & Advice" },
              { value: "Local", label: "West Midlands Based" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center gap-1"
              >
                <span className="font-serif text-3xl sm:text-4xl font-medium text-garden-pale">
                  {stat.value}
                </span>
                <span className="text-sm text-white/70 font-medium tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section id="services" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mx-auto max-w-2xl text-center mb-14">
            <Badge className="bg-garden-pale/60 text-garden-forest border-garden-light/30 px-3 py-1 text-xs font-medium tracking-wide uppercase mb-4">
              What We Do
            </Badge>
            <h2 className="font-serif text-3xl tracking-tight text-garden-charcoal sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 text-base text-garden-charcoal/60 leading-relaxed">
              From hedges to patios, turfing to jet washing - we cover every
              aspect of your outdoor space.
            </p>
          </div>

          {/* Service cards grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  className="group border-0 ring-1 ring-garden-pale/60 bg-white hover:ring-garden-light/50 hover:shadow-lg hover:shadow-garden-primary/5 transition-all duration-300"
                >
                  <CardHeader className="pb-0">
                    <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-garden-pale/40 text-garden-primary transition-colors group-hover:bg-garden-primary group-hover:text-white">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="font-serif text-lg text-garden-charcoal">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-garden-charcoal/60 leading-relaxed text-sm">
                      {service.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== GALLERY ==================== */}
      <section id="gallery" className="bg-garden-cream py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mx-auto max-w-2xl text-center mb-14">
            <Badge className="bg-garden-pale/60 text-garden-forest border-garden-light/30 px-3 py-1 text-xs font-medium tracking-wide uppercase mb-4">
              Portfolio
            </Badge>
            <h2 className="font-serif text-3xl tracking-tight text-garden-charcoal sm:text-4xl">
              Our Work
            </h2>
            <p className="mt-4 text-base text-garden-charcoal/60 leading-relaxed">
              Browse a selection of recent projects across the West Midlands.
            </p>
          </div>

          {/* Gallery grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-md"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-garden-forest/0 group-hover:bg-garden-forest/30 transition-colors duration-500 flex items-end">
                  <span className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 p-4 text-white text-sm font-medium">
                    {img.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section className="bg-garden-forest py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left text */}
            <div>
              <Badge className="bg-garden-light/20 text-garden-pale border-garden-light/30 px-3 py-1 text-xs font-medium tracking-wide uppercase mb-4">
                Why Us
              </Badge>
              <h2 className="font-serif text-3xl tracking-tight text-white sm:text-4xl">
                Why Choose{" "}
                <span className="text-garden-pale">Gardens of Eden?</span>
              </h2>
              <p className="mt-4 text-base text-white/70 leading-relaxed max-w-lg">
                We are a dedicated landscaping team serving Walsall and the
                wider West Midlands. Every project gets our full attention
                because your garden deserves nothing less.
              </p>
            </div>

            {/* Right trust cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {TRUST_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.title}
                    className="bg-white/5 border-0 ring-1 ring-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
                  >
                    <CardHeader className="pb-0">
                      <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-garden-pale/10 text-garden-pale">
                        <Icon className="size-5" />
                      </div>
                      <CardTitle className="font-serif text-base text-white">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-white/60 text-sm leading-relaxed">
                        {item.desc}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section id="about" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="https://gardensofedenlandscaping.co.uk/wp-content/uploads/2025/01/e277a32f-8aff-4873-a566-9eae07380c8b-e1737628348438.jpg"
                alt="Gardens of Eden team at work"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Right content */}
            <div className="flex flex-col gap-6">
              <Badge className="bg-garden-pale/60 text-garden-forest border-garden-light/30 px-3 py-1 text-xs font-medium tracking-wide uppercase w-fit">
                About Us
              </Badge>
              <h2 className="font-serif text-3xl tracking-tight text-garden-charcoal sm:text-4xl">
                Passionate About <span className="text-garden-primary">Your Garden</span>
              </h2>
              <p className="text-base text-garden-charcoal/70 leading-relaxed">
                Gardens of Eden is a family-run landscaping business based in
                Walsall, West Midlands. We have built our reputation on quality
                workmanship, honest pricing and a genuine passion for
                transforming outdoor spaces.
              </p>
              <p className="text-base text-garden-charcoal/70 leading-relaxed">
                Whether it is a complete garden redesign or a simple tidy-up,
                we treat every project with the same care and attention. Our
                clients across Sutton Coldfield, Streetly and Great Barr trust
                us to deliver results that exceed expectations.
              </p>
              <Separator className="my-2 bg-garden-pale/60" />
              <div>
                <p className="font-serif text-xl text-garden-forest italic">
                  Gardens of Eden
                </p>
                <p className="text-sm text-garden-charcoal/60 mt-1">
                  Landscaping & Garden Services, Walsall
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT CTA ==================== */}
      <section
        id="contact"
        className="bg-gradient-to-br from-garden-forest via-garden-primary to-garden-forest py-20 sm:py-28"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-white/10 text-white border-white/20 px-3 py-1 text-xs font-medium tracking-wide uppercase mb-6">
            Get In Touch
          </Badge>
          <h2 className="font-serif text-3xl tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to transform your garden?
          </h2>
          <p className="mt-4 text-base text-white/70 leading-relaxed max-w-xl mx-auto">
            Get in touch today for a free, no-obligation quote. We would love
            to discuss your project.
          </p>

          {/* Phone number */}
          <a
            href="tel:07950150785"
            className="inline-flex items-center gap-3 mt-8 text-garden-pale hover:text-white transition-colors group"
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
              <Phone className="size-5" />
            </div>
            <span className="font-serif text-3xl sm:text-4xl tracking-tight">
              07950 150 785
            </span>
          </a>

          {/* Email */}
          <div className="mt-4">
            <a
              href="mailto:info@gardensofedenlandscaping.co.uk"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
            >
              <Mail className="size-4" />
              info@gardensofedenlandscaping.co.uk
            </a>
          </div>

          {/* CTA button */}
          <div className="mt-8">
            <a href="tel:07950150785">
              <Button className="bg-white text-garden-forest hover:bg-garden-pale cursor-pointer h-12 px-8 text-base rounded-lg font-medium gap-2">
                <Phone className="size-4" />
                Call For a Free Quote
              </Button>
            </a>
          </div>

          {/* Address & areas */}
          <div className="mt-10 space-y-2">
            <p className="flex items-center justify-center gap-2 text-white/60 text-sm">
              <MapPin className="size-4" />
              8b Catshill Rd, Brownhills WS8 6BL
            </p>
            <p className="text-white/50 text-xs">
              Serving Walsall, Sutton Coldfield, Streetly, Great Barr &
              surrounding areas
            </p>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-garden-charcoal py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} Gardens of Eden. All rights
              reserved.
            </p>
            <p className="text-sm text-white/40">
              Website by{" "}
              <a
                href="https://highcroftdigital.com"
                className="text-garden-pale/60 hover:text-garden-pale transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Highcroft Digital
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
