import * as React from "react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calendar as CalendarIcon,
  Mail,
  BookOpen,
  ChevronRight,
  ArrowLeft,
  Clock,
  CheckCircle2,
  Phone,
  Send,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type Step = "initial" | "date" | "time" | "details" | "confirm";

export function ContactFlow() {
  const [step, setStep] = useState<Step>("initial");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

  const handleBack = () => {
    if (step === "date") setStep("initial");
    else if (step === "time") setStep("date");
    else if (step === "details") setStep("time");
    else if (step === "confirm") setStep("details");
  };

  const handleSendTelegram = () => {
    const message = `Hello Jerick! I would like to schedule a call.\n\n📅 Date: ${date ? format(date, "PPPP") : "Not selected"}\n🕒 Time: ${time}\n👤 Name: ${name}\n📧 Email: ${email}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/+639984861498?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="relative min-h-[350px] w-full">
      {/* Header for back button if not in initial step */}
      {step !== "initial" && (
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

          <a
            href="mailto:dacerajerick38@gmail.com"
            className="group flex w-full items-center justify-between rounded-xl border border-border bg-background/40 p-4 text-sm text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20 text-secondary-foreground transition-transform group-hover:scale-110">
                <Mail className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Send Email</div>
                <div className="text-xs text-muted-foreground">dacerajerick38@gmail.com</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </a>

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
            disabled={!name || !email}
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
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{name}</span>
            </div>
          </div>

          <Button
            className="w-full shadow-lg shadow-primary/20 bg-[#0088cc] hover:bg-[#0077b5] text-white border-none"
            onClick={handleSendTelegram}
          >
            <Send className="mr-2 h-4 w-4" />
            Send to Telegram
          </Button>
        </div>
      )}
    </div>
  );
}
