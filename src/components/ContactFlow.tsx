import * as React from "react";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar as CalendarIcon,
  Mail,
  BookOpen,
  ChevronRight,
  ArrowLeft,
  Clock,
  CheckCircle2,
  Loader2,
  User,
  Send,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  CONTACT_EMAIL,
  mailtoHref,
  OPEN_CONTACT_EVENT,
  isValidEmail,
  sendToEmail,
  type ContactStep,
} from "@/lib/contact";

type Step = "initial" | "date" | "time" | "details" | "confirm" | "email" | "sent";
type SendState = "idle" | "sending" | "error";

export function ContactFlow() {
  const [step, setStep] = useState<Step>("initial");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sendState, setSendState] = useState<SendState>("idle");
  const [sentKind, setSentKind] = useState<"call" | "email">("call");

  // Buttons elsewhere on the page ("Schedule a Call", "Send Email") open a step here.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const target = (e as CustomEvent<ContactStep>).detail;
      setSendState("idle");
      setStep(target === "email" ? "email" : "date");
    };
    window.addEventListener(OPEN_CONTACT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONTACT_EVENT, onOpen);
  }, []);

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  const canSendEmail = name.trim() !== "" && isValidEmail(email) && message.trim() !== "";

  const handleBack = () => {
    if (step === "date") setStep("initial");
    else if (step === "time") setStep("date");
    else if (step === "details") setStep("time");
    else if (step === "confirm") setStep("details");
    else if (step === "email") setStep("initial");
    setSendState("idle");
  };

  const reset = () => {
    setStep("initial");
    setTime("");
    setName("");
    setEmail("");
    setMessage("");
    setSendState("idle");
  };

  const draft = (kind: "call" | "email") =>
    kind === "call"
      ? {
          subject: `Call request from ${name.trim()}`,
          message: `${name.trim()} would like to schedule a call.\n\nDate: ${date ? format(date, "PPPP") : "Not selected"}\nTime: ${time}\nEmail: ${email.trim()}`,
        }
      : { subject: `Message from ${name.trim()} (portfolio)`, message: message.trim() };

  const fallbackHref = (kind: "call" | "email") => {
    const { subject, message: body } = draft(kind);
    return mailtoHref(subject, body);
  };

  const submit = async (kind: "call" | "email") => {
    setSendState("sending");
    try {
      await sendToEmail({ name, email, ...draft(kind) });
      setSentKind(kind);
      setStep("sent");
      setSendState("idle");
    } catch {
      setSendState("error");
    }
  };

  return (
    <div className="relative min-h-[350px] w-full">
      {/* Header for back button if not in initial step */}
      {step !== "initial" && step !== "sent" && (
        <div className="mb-4 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="h-8 w-8 rounded-full p-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="ml-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {step === "date" && "Select Date"}
            {step === "time" && "Select Time"}
            {step === "details" && "Your Details"}
            {step === "confirm" && "Confirmation"}
            {step === "email" && "Send Email"}
          </span>
        </div>
      )}

      {/* Step 1: Initial */}
      {step === "initial" && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="mb-4">
            <p className="text-xs leading-relaxed text-muted-foreground">
              Choose how you'd like to reach out. I'm usually available for calls in the afternoons.
            </p>
          </div>
          
          <button
            onClick={() => setStep("date")}
            className="group flex w-full items-center justify-between rounded-xl border border-border bg-background/40 p-4 text-sm text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <CalendarIcon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Schedule a Call</div>
                <div className="text-xs text-muted-foreground">Pick a time that works for you</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={() => setStep("email")}
            className="group flex w-full items-center justify-between rounded-xl border border-border bg-background/40 p-4 text-sm text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20 text-secondary-foreground transition-transform group-hover:scale-110">
                <Mail className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Send Email</div>
                <div className="text-xs text-muted-foreground">Write me a message</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </button>

          <button
            className="group flex w-full items-center justify-between rounded-xl border border-border bg-background/40 p-4 text-sm text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20 text-secondary-foreground transition-transform group-hover:scale-110">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Read blog</div>
                <div className="text-xs text-muted-foreground">Insights on tech and development</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      )}

      {/* Step 2: Date */}
      {step === "date" && (
        <div className="flex flex-col items-center animate-in fade-in duration-300">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              if (d) {
                setDate(d);
                setStep("time");
              }
            }}
            className="rounded-md border bg-card/50 shadow-sm"
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          />
          <p className="mt-4 text-xs text-muted-foreground">
            Select a date for our 15-30 minute meeting.
          </p>
        </div>
      )}

      {/* Step 3: Time */}
      {step === "time" && (
        <div className="animate-in fade-in duration-300">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <Clock className="h-4 w-4 text-primary" />
            {date && format(date, "EEEE, MMMM do")}
          </div>
          <div className="grid grid-cols-2 gap-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                variant={time === slot ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setTime(slot);
                }}
                className={cn(
                  "h-10 text-xs transition-all",
                  time === slot && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                )}
              >
                {slot}
              </Button>
            ))}
          </div>
          {time && (
            <Button
              className="mt-6 w-full group"
              onClick={() => setStep("details")}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          )}
        </div>
      )}

      {/* Step 4: Details */}
      {step === "details" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/50"
            />
          </div>
          <Button
            className="w-full mt-2"
            disabled={!name.trim() || !isValidEmail(email)}
            onClick={() => setStep("confirm")}
          >
            Review Summary
          </Button>
        </div>
      )}

      {/* Step 5: Confirm */}
      {step === "confirm" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
            <div className="flex justify-center mb-2">
              <CheckCircle2 className="h-10 w-10 text-primary animate-pulse" />
            </div>
            <h3 className="font-bold text-foreground">Ready to Schedule</h3>
            <p className="text-xs text-muted-foreground mt-1">Review your call details below</p>
          </div>

          <div className="space-y-3 px-1">
            <div className="flex items-center gap-3 text-sm">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{date && format(date, "PPPP")}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{time}</span>
            </div>
            <div className="flex items-center gap-3 text-sm border-t pt-3 border-border/50">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{name}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="break-all text-foreground">{email}</span>
            </div>
          </div>

          <SubmitButton
            sending={sendState === "sending"}
            label="Send request"
            onClick={() => submit("call")}
          />
          {sendState === "error" && <SendError href={fallbackHref("call")} />}
        </div>
      )}

      {/* Send Email */}
      {step === "email" && (
        <form
          className="space-y-4 animate-in fade-in duration-300"
          onSubmit={(e) => {
            e.preventDefault();
            if (canSendEmail && sendState !== "sending") submit("email");
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="mail-name" className="text-xs uppercase tracking-wider text-muted-foreground">
              Your Name
            </Label>
            <Input
              id="mail-name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mail-email" className="text-xs uppercase tracking-wider text-muted-foreground">
              Your Email
            </Label>
            <Input
              id="mail-email"
              type="email"
              autoComplete="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mail-message" className="text-xs uppercase tracking-wider text-muted-foreground">
              Message
            </Label>
            <Textarea
              id="mail-message"
              rows={4}
              placeholder="How can I help?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-background/50"
            />
          </div>
          <SubmitButton
            type="submit"
            sending={sendState === "sending"}
            disabled={!canSendEmail}
            label="Send message"
          />
          {sendState === "error" && <SendError href={fallbackHref("email")} />}
        </form>
      )}

      {/* Sent */}
      {step === "sent" && (
        <div className="space-y-5 py-4 text-center animate-in fade-in duration-300">
          <div className="flex justify-center">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">
              {sentKind === "call" ? "Request sent!" : "Message sent!"}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {sentKind === "call"
                ? "Thanks! I'll reply to your email to confirm the call."
                : "Thanks for reaching out! I'll reply to your email soon."}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={reset}>
            Done
          </Button>
        </div>
      )}
    </div>
  );
}

function SubmitButton({
  sending,
  label,
  onClick,
  disabled,
  type = "button",
}: {
  sending: boolean;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <Button
      type={type}
      className="w-full shadow-lg shadow-primary/20"
      disabled={disabled || sending}
      onClick={onClick}
    >
      {sending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          {label}
        </>
      )}
    </Button>
  );
}

function SendError({ href }: { href: string }) {
  return (
    <p role="alert" className="text-xs leading-relaxed text-destructive">
      Sorry, that didn't send. Please try again, or{" "}
      <a href={href} className="underline">
        open it in your email app
      </a>{" "}
      (to {CONTACT_EMAIL}).
    </p>
  );
}
