interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function FeatureCard({ icon, title, description, isSelected, onClick }: FeatureCardProps) {
  return (
    <article className={`feature-card ${isSelected ? "selected" : ""}`} onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
      <div className="feature-icon" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
