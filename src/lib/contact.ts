/** Where contact messages and call requests are delivered. */
export const CONTACT_EMAIL = "dacerajerick38@gmail.com";

const ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

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
 * Sends a message to CONTACT_EMAIL through FormSubmit (https://formsubmit.co).
 * The visitor's email is used as the reply-to address. Throws if it could not be sent.
 */
export async function sendToEmail({ name, email, subject, message }: EmailPayload) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: name.trim(),
      email: email.trim(),
      message,
      _subject: subject,
      _template: "table",
      _captcha: "false",
      _honey: "",
    }),
  });

  const data = (await response.json().catch(() => null)) as { success?: string | boolean } | null;
  const ok = response.ok && (data?.success === true || data?.success === "true");
  if (!ok) throw new Error("Could not send the message");
}
