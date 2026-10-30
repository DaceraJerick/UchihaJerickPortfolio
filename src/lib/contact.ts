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
 *
 * The body is FormData (not JSON) on purpose: a JSON Content-Type makes the browser send a
 * CORS "preflight" request first, and FormSubmit does not answer it, so the message never left.
 */
export async function sendToEmail({ name, email, subject, message }: EmailPayload) {
  const body = new FormData();
  body.append("name", name.trim());
  body.append("email", email.trim());
  body.append("message", message);
  body.append("_subject", subject);
  body.append("_template", "table");
  body.append("_captcha", "false");
  body.append("_honey", "");

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  });

  const data = (await response.json().catch(() => null)) as {
    success?: string | boolean;
    message?: string;
  } | null;
  const ok = response.ok && (data?.success === true || data?.success === "true");
  if (!ok) {
    // Visible in the browser console, e.g. "This form needs Activation" on the very first message.
    console.warn("FormSubmit did not accept the message:", response.status, data?.message ?? data);
    throw new Error("Could not send the message");
  }
}
