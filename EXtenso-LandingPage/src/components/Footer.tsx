export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container footer-main">
        <div className="footer-brand">
          <span className="footer-logo">EX<span>tenso</span></span>
          <p>Sua extensão para lembrar, planejar e organizar o que importa.</p>
          <div className="footer-socials" aria-label="Redes sociais">
            <a href="#inicio" aria-label="Instagram">◎</a>
            <a href="#inicio" aria-label="Facebook">f</a>
            <a href="#inicio" aria-label="YouTube">▶</a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Empresa</h3>
          <a href="#beneficios">Sobre nós</a>
          <a href="#contato">Contato</a>
        </div>

        <div className="footer-column">
          <h3>Recursos</h3>
          <a href="#precos">Planos</a>
          <a href="#contato">Teste a demo</a>
          <a href="#inicio">IOS & Android</a>
          <a href="#contato">Suporte</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>©2026 EXtenso - Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
