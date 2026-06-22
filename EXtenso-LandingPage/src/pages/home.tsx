import { useState } from "react";
import AppMockup from "../components/AppMockup";
import Button from "../components/Button";
import ContactForm from "../components/ContactForm";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TierCard from "../components/TierCard";

import "../styles/header.css";
import "../styles/utility.css";
import "../styles/hero.css";
import "../styles/pricing.css";
import "../styles/quote.css";
import "../styles/footer.css";

const benefits = [
  {
    icon: "▣",
    title: "Tudo em pastas visuais",
    description: "Separe faculdade, casa, trabalho e vida pessoal sem misturar suas tarefas no mesmo lugar.",
  },
  {
    icon: "◷",
    title: "Lembretes por contexto",
    description: "Cadastre tarefas com prazo, prioridade e categoria para saber exatamente o que fazer primeiro.",
  },
  {
    icon: "✦",
    title: "Rotina com personalidade",
    description: "Use cores, listas, cartões e blocos para organizar sua vida sem deixar a tela sem graça.",
  },
];

export default function Home() {
  const [] = useState<string | null>(null);

  return (
    <>
      <Header />

      <section className="hero-section" id="inicio">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-subtitle">Sua extensão.</span>
            <h1 className="hero-title">Organize sua vida do seu jeito.</h1>
            <p className="hero-desc">
              O EXtenso é um aplicativo de organização com uma proposta mais direta: juntar notas, tarefas, lembretes, metas e pastas em uma experiência dinâmica e visual.
            </p>
            <div className="hero-buttons">
              <a href="#contato">
                <Button text="Quero testar" />
              </a>
            </div>
            <div className="hero-stats" aria-label="Destaques do aplicativo">
              <span><strong>+10</strong> layouts</span>
              <span><strong>100%</strong> visual</span>
            </div>
          </div>

          <AppMockup />
        </div>
      </section>

      <main>
        <section className="container py-xl" id="beneficios">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Por que usar</span>
            <h2 className="section-title">Uma central para tirar as coisas da cabeça</h2>
            <p className="section-description">
              Em vez de espalhar lembretes em aplicativo de notas, agenda, papel e conversa fixada, o EXtenso organiza tudo em uma única extensão da sua vida.
            </p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit) => (
              <FeatureCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </section>

        <section className="tiers-section" id="precos">
          <div className="container">
            <div className="section-title-wrapper">
              <span className="section-subtitle">Planos</span>
              <h2 className="section-title">Escolha o nível de organização que combina com você</h2>
              <p className="section-description">
                Os valores abaixo são uma simulação para a landing page avaliativa. A ideia é demonstrar o componente de preços com planos claros e responsivos.
              </p>
            </div>

            <div className="tiers-grid">
              <TierCard
                name="Starter"
                tagline="Para começar a organizar"
                price="Grátis"
                suffix="/ uso pessoal"
                features={[
                  "Até 3 pastas principais",
                  "Notas e lembretes básicos",
                  "Visual padrão EXtenso",
                ]}
                buttonText="Começar grátis"
              />
              <TierCard
                name="Plus"
                tagline="Para estudos e rotina"
                price="R$ 14,90"
                suffix="/ mês"
                features={[
                  "Pastas ilimitadas",
                  "Controle de metas e hábitos",
                  "Cores por área da vida",
                  "Backup em nuvem",
                ]}
                buttonText="Escolher Plus"
                featured
              />
              <TierCard
                name="Team"
                tagline="Para pequenos grupos"
                price="R$ 39,90"
                suffix="/ mês"
                features={[
                  "Espaços compartilhados",
                  "Organização por projetos",
                  "Permissões por usuário",
                  "Suporte prioritário",
                ]}
                buttonText="Falar com vendas"
              />
            </div>
          </div>
        </section>

        <section className="quote-section">
          <div className="container quote-card">
            <div>
              <span className="section-subtitle">Organização visual</span>
              <h2>Uma interface feita para quem pensa em blocos, cores e categorias.</h2>
            </div>
            <p>
              O EXtenso transforma a organização em algo mais visual: cada área pode ter cor própria, lista própria e prioridade própria. É como ter uma mesa digital onde cada coisa finalmente encontra seu lugar.
            </p>
          </div>
        </section>

        <section className="inquiry-section" id="contato">
          <div className="container">
            <div className="section-title-wrapper">
              <span className="section-subtitle">Envie sua dúvida</span>
              <h2 className="section-title">Entre em contato</h2>
              <p className="section-description">
                Envie uma mensagem para saber mais sobre o EXtenso, testar a proposta ou tirar dúvidas sobre os planos.
              </p>
            </div>

            <div className="inquiry-card">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
