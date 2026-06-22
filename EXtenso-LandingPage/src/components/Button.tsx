import type { ButtonHTMLAttributes } from "react";
import "../styles/buttons.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  secondary?: boolean;
}

export default function Button({ text, secondary, className = "", ...props }: ButtonProps) {
  return (
    <button className={`${secondary ? "btn-secondary" : "btn-primary"} ${className}`.trim()} {...props}>
      {text}
    </button>
  );
}
