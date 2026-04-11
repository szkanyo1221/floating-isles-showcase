import { useEffect, useRef, useState } from "react";
import { Mail, Phone, Leaf, Waves, TreePine, Droplets, Menu, X, Instagram, Facebook, ArrowDown } from "lucide-react";

const NAV_LINKS = [
  { href: "#acasa", label: "Acasă" },
  { href: "#despre", label: "Ce Facem" },
  { href: "#beneficii", label: "De Ce Noi" },
  { href: "#contact", label: "Contact" },
];

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <a href="#acasa" className="flex items-center gap-3">
              <img src="/images/logo.png" alt="insuleplutitoare.ro" className="h-10 sm:h-14 w-auto" />
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium tracking-wide text-foreground/70 hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="tel:+40755011500" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" />
                <span>+40 755 011 500</span>
              </a>
              <a href="mailto:jenoszabo68@gmail.com" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" />
                <span>jenoszabo68@gmail.com</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden p-2 text-foreground"
              aria-label="Meniu"
            >
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border">
            <div className="px-4 py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenu(false)}
                  className="block text-base font-medium text-foreground/80 hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border space-y-3 text-sm">
                <a href="tel:+40755011500" className="flex items-center gap-2 text-foreground/70">
                  <Phone className="w-4 h-4" /> +40 755 011 500
                </a>
                <a href="mailto:jenoszabo68@gmail.com" className="flex items-center gap-2 text-foreground/70">
                  <Mail className="w-4 h-4" /> jenoszabo68@gmail.com
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="acasa" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <iframe
            src="https://www.youtube.com/embed/lzDjzQGUcMI?autoplay=1&mute=0&loop=1&playlist=lzDjzQGUcMI&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full min-h-full h-[56.25vw]"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Insule Plutitoare Video"
            style={{ border: 0 }}
          />
          <div className="absolute inset-0 bg-foreground/40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <img src="/images/logo.png" alt="insuleplutitoare.ro" className="h-24 sm:h-32 md:h-40 w-auto mx-auto mb-8 drop-shadow-2xl invert brightness-200" />
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-primary-foreground mb-4 leading-tight">
            Ecosisteme Plutitoare
            <span className="block font-semibold">pentru Viitor</span>
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/80 font-light max-w-2xl mx-auto">
            Peisaje inovatoare care plutesc natural pe apă, transformând lacurile în ecosisteme vii.
          </p>
        </div>

        <a
          href="#despre"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-primary-foreground/60 hover:text-primary-foreground transition-colors animate-bounce"
        >
          <ArrowDown className="w-6 h-6" />
        </a>
      </section>

      {/* Ce Facem */}
      <section id="despre" className="py-24 sm:py-32" data-animate>
        <div
          className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            isVisible("despre") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">Ce Facem</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight">
              Insule plutitoare <span className="font-semibold">naturale</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Creăm ecosisteme plutitoare inovatoare — peisaje compuse din rădăcini, vegetație și sol care plutesc natural pe suprafața apei,
                fără a fi ancorate de fundul lacului.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Insulele noastre pot fi amplasate în orice lac sau corp de apă, oferind o soluție naturală
                pentru îmbunătățirea calității apei și creșterea biodiversității.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Leaf, label: "Vegetație naturală" },
                { icon: Waves, label: "Plutire liberă" },
                { icon: TreePine, label: "Ecosisteme vii" },
                { icon: Droplets, label: "Purificarea apei" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="bg-card rounded-lg p-6 text-center border border-border hover:border-accent/30 transition-colors"
                >
                  <Icon className="w-8 h-8 mx-auto mb-3 text-accent" />
                  <p className="text-sm font-medium text-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* De Ce Noi */}
      <section id="beneficii" className="py-24 sm:py-32 bg-card" data-animate>
        <div
          className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            isVisible("beneficii") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">De Ce Noi</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight">
              Beneficii <span className="font-semibold">dovedite</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                title: "Sustenabilitate",
                desc: "Soluții 100% naturale care funcționează în armonie cu ecosistemele acvatice existente.",
              },
              {
                title: "Biodiversitate",
                desc: "Creăm habitate pentru pești, păsări și insecte, îmbogățind fauna și flora locală.",
              },
              {
                title: "Calitatea Apei",
                desc: "Filtrare naturală a apei prin rădăcini și vegetație, reducând poluanții și algele.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-background rounded-lg p-8 border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 sm:py-32" data-animate>
        <div
          className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            isVisible("contact") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">Contact</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight">
              Hai să <span className="font-semibold">vorbim</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Contactați-ne pentru a afla cum putem transforma lacul dumneavoastră.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <a
              href="tel:+40755011500"
              className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-lg font-medium"
            >
              <Phone className="w-5 h-5" />
              +40 755 011 500
            </a>
            <a
              href="mailto:jenoszabo68@gmail.com"
              className="flex items-center gap-3 px-8 py-4 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors text-lg font-medium"
            >
              <Mail className="w-5 h-5" />
              Trimite Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="insuleplutitoare.ro" className="h-10 w-auto" />
              <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} insuleplutitoare.ro</span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
