import { useEffect, useState } from "react";
import type { FormEvent } from "react";
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
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");

  useEffect(() => {
    if (!statusMessage) return undefined;

    const timer = window.setTimeout(() => {
      setStatusMessage("");
      setStatusType("");
    }, 6000);

    return () => window.clearTimeout(timer);
  }, [statusMessage]);

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setFormData((currentData) => ({ ...currentData, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.company) return;

    setLoading(true);
    setStatusMessage("");
    setStatusType("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Não foi possível enviar sua mensagem.");
      }

      setFormData(initialForm);
      setStatusType("success");
      setStatusMessage("Mensagem enviada com sucesso! O contato chegou no e-mail configurado.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro inesperado ao enviar.";
      setStatusType("error");
      setStatusMessage(message);
    } finally {
      setLoading(false);
    }
  };

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

      {statusMessage && <p className={`form-status ${statusType}`}>{statusMessage}</p>}

      <div className="form-submit-container">
        <Button type="submit" text={loading ? "Enviando..." : "Enviar mensagem"} disabled={loading} />
      </div>
    </form>
  );
}
