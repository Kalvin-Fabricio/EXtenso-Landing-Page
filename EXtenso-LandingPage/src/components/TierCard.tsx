import Button from "./Button";

interface TierCardProps {
  name: string;
  tagline: string;
  price: string;
  suffix: string;
  features: string[];
  buttonText: string;
  featured?: boolean;
}

export default function TierCard({ name, tagline, price, suffix, features, buttonText, featured }: TierCardProps) {
  return (
    <article className={`tier-card ${featured ? "featured" : ""}`}>
      {featured && <span className="featured-badge">Mais escolhido</span>}
      <h3 className="tier-name">{name}</h3>
      <span className="tier-tagline">{tagline}</span>
      <div className="tier-price-box">
        <span className="tier-price">{price}</span>
        <span className="tier-price-suffix">{suffix}</span>
      </div>
      <ul className="tier-features">
        {features.map((feature) => (
          <li key={feature}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
            {feature}
          </li>
        ))}
      </ul>
      <a href="#contato">
        <Button text={buttonText} secondary={!featured} />
      </a>
    </article>
  );
}
