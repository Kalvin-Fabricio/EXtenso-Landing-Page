import type { Handler, HandlerEvent } from "@netlify/functions";
import nodemailer from "nodemailer";

interface ContactPayload {
  name?: string;
  email?: string;
  plan?: string;
  message?: string;
  company?: string;
  recaptchaToken?: string;
}

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? "";

const corsHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN || origin || "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
});

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const handler: Handler = async (event: HandlerEvent) => {
  const origin = event.headers.origin ?? "";

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders(origin),
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: "Método não permitido." }),
    };
  }

  let payload: ContactPayload;

  try {
    payload = JSON.parse(event.body ?? "{}");
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: "Body inválido." }),
    };
  }

  const recaptchaToken = payload.recaptchaToken;
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;

  if (recaptchaSecret) {
    if (!recaptchaToken) {
      return {
        statusCode: 400,
        headers: corsHeaders(origin),
        body: JSON.stringify({ error: "reCAPTCHA obrigatório ausente." }),
      };
    }

    try {
      const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
      });
      const verifyData = (await verifyResponse.json()) as { success: boolean };
      if (!verifyData.success) {
        return {
          statusCode: 400,
          headers: corsHeaders(origin),
          body: JSON.stringify({ error: "Falha na validação do reCAPTCHA." }),
        };
      }
    } catch (error) {
      console.error("Erro ao validar reCAPTCHA:", error);
      return {
        statusCode: 500,
        headers: corsHeaders(origin),
        body: JSON.stringify({ error: "Erro interno ao validar reCAPTCHA." }),
      };
    }
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const plan = payload.plan?.trim() ?? "Não informado";
  const message = payload.message?.trim() ?? "";

  if (payload.company) {
    return {
      statusCode: 200,
      headers: corsHeaders(origin),
      body: JSON.stringify({ message: "Mensagem recebida." }),
    };
  }

  if (!name || !email || !message) {
    return {
      statusCode: 422,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: "Preencha nome, e-mail e mensagem." }),
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      statusCode: 422,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: "E-mail inválido." }),
    };
  }

  const requiredEnvVars = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CONTACT_EMAIL"];
  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missingEnvVars.length > 0) {
    return {
      statusCode: 500,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: `Variáveis ausentes: ${missingEnvVars.join(", ")}.` }),
    };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePlan = escapeHtml(plan);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  try {
    await transporter.sendMail({
      from: `"EXtenso Landing Page" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_EMAIL,
      subject: "[EXtenso] Nova mensagem da landing page",
      text: `Nome: ${name}\nE-mail: ${email}\nInteresse: ${plan}\n\nMensagem:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #222; line-height: 1.5;">
          <h2>Nova mensagem da landing page EXtenso</h2>
          <p><strong>Nome:</strong> ${safeName}</p>
          <p><strong>E-mail:</strong> ${safeEmail}</p>
          <p><strong>Interesse:</strong> ${safePlan}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${safeMessage}</p>
        </div>
      `,
    });

    return {
      statusCode: 200,
      headers: corsHeaders(origin),
      body: JSON.stringify({ message: "E-mail enviado com sucesso." }),
    };
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);

    return {
      statusCode: 500,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: "Falha ao enviar o e-mail. Verifique as variáveis SMTP." }),
    };
  }
};

export { handler };
