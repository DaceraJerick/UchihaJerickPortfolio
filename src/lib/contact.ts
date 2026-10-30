/** Where contact messages and call requests are delivered. */
export const CONTACT_EMAIL = "dacerajerick38@gmail.com";

const ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Web3Forms access key. It is meant to be public (it only allows sending to the email it was
 * created for), so it is safe in the repo. Get one at https://web3forms.com using CONTACT_EMAIL.
 */
export const WEB3FORMS_ACCESS_KEY = "";

/** Lets the buttons outside the contact panel open a step inside it. */
export const OPEN_CONTACT_EVENT = "contactflow:open";
export type ContactStep = "date" | "email";

export function openContactFlow(step: ContactStep) {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "center" });
  window.dispatchEvent(new CustomEvent<ContactStep>(OPEN_CONTACT_EVENT, { detail: step }));
}

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

interface EmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Builds a mailto: link with the message already filled in. Used as a fallback when sending fails,
 * so a visitor never loses what they wrote.
 */
export function mailtoHref(subject: string, body: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Sends a message to CONTACT_EMAIL through Web3Forms (https://web3forms.com).
 * The visitor's email becomes the reply-to address. Throws if it could not be sent.
 *
 * The body is FormData (not JSON) on purpose: a JSON Content-Type makes the browser send a
 * CORS "preflight" request first, which some form services do not answer.
 */
export async function sendToEmail({ name, email, subject, message }: EmailPayload) {
  if (!WEB3FORMS_ACCESS_KEY) {
    console.warn("Contact form: set WEB3FORMS_ACCESS_KEY in src/lib/contact.ts");
    throw new Error("Contact form is not configured");
  }

  const body = new FormData();
  body.append("access_key", WEB3FORMS_ACCESS_KEY);
  body.append("name", name.trim());
  body.append("email", email.trim());
  body.append("subject", subject);
  body.append("from_name", "Portfolio contact form");
  body.append("message", message);
  body.append("botcheck", ""); // honeypot field: real visitors never fill it

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  });

  const data = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;
  if (!response.ok || data?.success !== true) {
    // Visible in the browser console to help find out why a message was refused.
    console.warn("Web3Forms did not accept the message:", response.status, data?.message ?? data);
    throw new Error("Could not send the message");
  }
}
