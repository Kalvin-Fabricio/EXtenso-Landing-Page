import { useState, useRef } from "react";
import type { FormEvent } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import Button from "./Button";

const initialForm = {
  name: "",
  email: "",
  plan: "Organização pessoal",
  message: "",
  company: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const siteKey = (import.meta.env.VITE_RECAPTCHA_SITE_KEY as string) || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  console.log("reCAPTCHA siteKey loaded:", siteKey);

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setFormData((currentData) => ({ ...currentData, [field]: value }));
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.company) return;

    if (!recaptchaToken) {
      toast.error("Por favor, confirme que você não é um robô (reCAPTCHA).");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Não foi possível enviar sua mensagem.");
      }

      toast.success("Mensagem enviada com sucesso!");
      setIsSubmitted(true);
      setFormData(initialForm);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro inesperado ao enviar.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="form-success-card">
        <div className="success-checkmark-container">
          <svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        <h3>Mensagem Enviada!</h3>
        <p>
          Obrigado pelo contato. Recebemos sua mensagem e entraremos em contato em breve.
        </p>
        <Button
          type="button"
          text="Enviar outra mensagem"
          secondary
          onClick={() => {
            setIsSubmitted(false);
            setRecaptchaToken(null);
            setTimeout(() => {
              recaptchaRef.current?.reset();
            }, 0);
          }}
        />
      </div>
    );
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <input
        className="honeypot"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={formData.company}
        onChange={(event) => updateField("company", event.target.value)}
        aria-hidden="true"
      />

      <div className="form-row-2">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Nome</label>
          <input
            type="text"
            id="name"
            className="form-input"
            placeholder="Ex: João da Silva"
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Ex: exemplo@gmail.com"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="plan" className="form-label">Interesse</label>
        <select
          id="plan"
          className="form-select"
          value={formData.plan}
          onChange={(event) => updateField("plan", event.target.value)}
        >
          <option>Organização pessoal</option>
          <option>Rotina de estudos</option>
          <option>Trabalho em equipe</option>
          <option>Plano EXtenso Pro</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">Mensagem</label>
        <textarea
          id="message"
          className="form-textarea"
          placeholder="Conte como você pretende usar o EXtenso ou tire uma dúvida sobre o aplicativo."
          value={formData.message}
          onChange={(event) => updateField("message", event.target.value)}
          required
        />
      </div>

      <div className="recaptcha-container">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={siteKey}
          onChange={handleRecaptchaChange}
          theme="dark"
        />
      </div>

      <div className="form-submit-container">
        <Button type="submit" text={loading ? "Enviando..." : "Enviar mensagem"} disabled={loading} />
      </div>
    </form>
  );
}
