import { useEffect, useState } from "react";
import Button from "./Button";
import Close from "../assets/close.svg";
import Menu from "../assets/menu.svg";
import Logo from "../assets/logo.svg";
import LogoTransition from "../assets/logotransicao.svg";

const links = [
  { id: "inicio", label: "Início" },
  { id: "beneficios", label: "Benefícios" },
  { id: "precos", label: "Preços" },
  { id: "contato", label: "Contato" },
];

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          const topVisibleEntry = visibleEntries.reduce((top, current) => {
            return current.boundingClientRect.top < top.boundingClientRect.top ? current : top;
          });
          
          setActiveSection(topVisibleEntry.target.id);
        }
      },
      { rootMargin: "0px 0px 0px 0px", threshold: 0.1 },
    );

    links.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (id: string) => {
    setActiveSection(id);
    setShowMobileMenu(false);
  };

  const renderLinks = () =>
    links.map((link) => (
      <li key={link.id}>
        <a
          href={`#${link.id}`}
          className={activeSection === link.id ? "active" : ""}
          onClick={() => handleLinkClick(link.id)}
        >
          {link.label}
        </a>
      </li>
    ));

  return (
    <header className="header-nav">
      <div className="container header-container">
        <a href="#inicio" className="logo-mark" onClick={() => handleLinkClick("inicio")} onMouseEnter={() => setLogoHovered(true)} onMouseLeave={() => setLogoHovered(false)}>
          <img src={logoHovered ? LogoTransition : Logo} alt="Logo Extenso" height={40} className="logo-img" />
        </a>

        <nav className="desktop-only" aria-label="Navegação principal">
          <ul className="nav-links">{renderLinks()}</ul>
        </nav>

        <div className="desktop-actions desktop-only">
          <a href="#contato" onClick={() => handleLinkClick("contato")}>
            <Button text="Testar agora" />
          </a>
        </div>

        <div className="mobile-menu">
          <button
            className="btn-wrapper"
            type="button"
            onClick={() => setShowMobileMenu((isOpen) => !isOpen)}
            aria-label={showMobileMenu ? "Fechar menu" : "Abrir menu"}
          >
            <img src={showMobileMenu ? Close : Menu} alt="" width={24} height={24} />
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <nav className="mobile-menu-content" aria-label="Menu mobile">
          <div className="container mobile-nav-container">
            <ul className="mobile-nav-links">{renderLinks()}</ul>
            <a href="#contato" onClick={() => handleLinkClick("contato")}>
              <Button text="Testar agora" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
