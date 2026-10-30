import { useEffect, useRef } from "react";

import jerickDark from "@/assets/jerick-dark.png";
import jerickLight from "@/assets/jerick-light.jpg";

const CARD_W = 128;
const CARD_H = 184;

// Swing physics (angles in radians, time in seconds).
const GRAVITY_OVER_LENGTH = 7; // pendulum stiffness: a swing takes about 2.4 s
const ROPE_DAMPING = 0.8;
const CARD_SPRING = 26; // how fast the card settles relative to the strap
const CARD_DAMPING = 2.2;
const MAX_ANGLE = 1.1;

interface IdBadgeProps {
  /** Length of the lanyard above the card, in px. */
  strapLength?: number;
  className?: string;
}

/**
 * A lanyard with an ID card that swings and can be dragged, like a real badge.
 * The rope is a damped pendulum; the card hangs from a clip and lags behind it.
 */
export function IdBadge({ strapLength = 170, className = "" }: IdBadgeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const rope = ropeRef.current;
    const card = cardRef.current;
    if (!root || !rope || !card) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let theta = 0; // strap angle
    let omega = 0;
    let phi = 0; // card angle, relative to the strap
    let phiVel = 0;
    let dragging = false;
    let moved = false;
    let raf = 0;
    let last = 0;
    let pointerId = -1;
    let startX = 0;
    let startY = 0;

    const render = () => {
      // Angles are measured towards +x; CSS rotate() is clockwise, which swings the card left.
      rope.style.transform = `rotate(${-theta}rad)`;
      card.style.transform = `rotate(${-phi}rad)`;
    };

    const atRest = () =>
      !dragging &&
      Math.abs(theta) < 0.002 &&
      Math.abs(omega) < 0.01 &&
      Math.abs(phi) < 0.002 &&
      Math.abs(phiVel) < 0.01;

    const step = (dt: number) => {
      const thetaAcc = dragging ? 0 : -GRAVITY_OVER_LENGTH * Math.sin(theta) - ROPE_DAMPING * omega;
      if (!dragging) {
        omega += thetaAcc * dt;
        theta += omega * dt;
      }
      const phiAcc = -CARD_SPRING * phi - CARD_DAMPING * phiVel - 0.7 * thetaAcc;
      phiVel += phiAcc * dt;
      phi = Math.max(-0.9, Math.min(0.9, phi + phiVel * dt));
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      step(dt / 2);
      step(dt / 2);
      render();
      if (atRest()) {
        theta = omega = phi = phiVel = 0;
        render();
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const kick = (impulse: number) => {
      omega += impulse;
      wake();
    };

    const pivot = () => {
      const rect = root.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top };
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      moved = false;
      pointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      card.setPointerCapture(e.pointerId);
      card.style.cursor = "grabbing";
      wake();
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      if (Math.hypot(e.clientX - startX, e.clientY - startY) > 4) moved = true;
      const p = pivot();
      const next = Math.max(
        -MAX_ANGLE,
        Math.min(MAX_ANGLE, Math.atan2(e.clientX - p.x, Math.max(e.clientY - p.y, 60))),
      );
      const now = performance.now();
      const dt = Math.max((now - last) / 1000, 0.008);
      omega = omega * 0.5 + ((next - theta) / dt) * 0.5; // remember the throw speed
      theta = next;
      last = now;
      render();
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      dragging = false;
      card.style.cursor = "";
      if (card.hasPointerCapture(e.pointerId)) card.releasePointerCapture(e.pointerId);
      omega = Math.max(-6, Math.min(6, omega));
      if (!moved) omega += (Math.random() < 0.5 ? -1 : 1) * 2.6; // a tap gives it a push
      wake();
    };

    card.addEventListener("pointerdown", onDown);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerup", onUp);
    card.addEventListener("pointercancel", onUp);

    const intro = reduceMotion ? 0 : window.setTimeout(() => kick(1.4), 500);

    return () => {
      window.clearTimeout(intro);
      cancelAnimationFrame(raf);
      card.removeEventListener("pointerdown", onDown);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerup", onUp);
      card.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`relative select-none ${className}`}
      style={{ width: CARD_W, height: strapLength + CARD_H }}
    >
      {/* Everything that swings hangs from this pivot at the top centre. */}
      <div
        ref={ropeRef}
        className="absolute left-1/2 top-0 w-0 will-change-transform"
        style={{ transformOrigin: "50% 0" }}
      >
        {/* Lanyard strap (it starts above the top of the page) */}
        <div
          aria-hidden="true"
          className="absolute -top-16 left-[-10px] flex w-5 flex-col items-center justify-around overflow-hidden bg-neutral-900 py-2 shadow-md ring-1 ring-white/10 dark:bg-neutral-100 dark:ring-black/10"
          style={{ height: strapLength + 64 + 6 }}
        >
          {Array.from({ length: Math.max(2, Math.floor((strapLength + 64) / 95)) }).map((_, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.25em] text-white/70 dark:text-black/60"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              jerick.dev
            </span>
          ))}
        </div>

        {/* Card, hinged at the clip */}
        <div
          ref={cardRef}
          title="Drag me!"
          className="absolute cursor-grab touch-none"
          style={{
            top: strapLength,
            left: -CARD_W / 2,
            width: CARD_W,
            height: CARD_H,
            transformOrigin: "50% 0",
          }}
        >
          {/* Metal clip */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[-14px] z-10 h-7 w-4 -translate-x-1/2 rounded-[4px] border border-neutral-500/60 bg-gradient-to-b from-neutral-200 via-neutral-400 to-neutral-300 shadow"
          >
            <div className="mx-auto mt-1 h-3 w-1.5 rounded-full bg-neutral-600/50" />
          </div>

          <div
            role="img"
            aria-label="ID badge: Hello, I'm Jerick"
            className="relative flex h-full w-full flex-col items-center overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-b from-white via-neutral-50 to-neutral-200 pt-7 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)]"
          >
            {/* Slot */}
            <div className="absolute top-2.5 h-1.5 w-10 rounded-full bg-neutral-400/60 shadow-inner" />

            {/* Photo */}
            <div className="relative h-[78px] w-[78px] shrink-0 overflow-hidden rounded-full border-[3px] border-white bg-neutral-300 shadow-md ring-1 ring-black/10">
              <img
                src={jerickLight}
                alt=""
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover object-[50%_18%] dark:opacity-0"
              />
              <img
                src={jerickDark}
                alt=""
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover object-[50%_18%] opacity-0 dark:opacity-100"
              />
            </div>

            <p className="mt-3 text-[26px] font-black uppercase leading-none tracking-tight text-neutral-900">
              Hello!
            </p>
            <p className="mt-2 rounded-md bg-neutral-900 px-3 py-1 text-[12px] font-extrabold uppercase tracking-[0.12em] text-white">
              I'm Jerick
            </p>

            {/* Accent strip */}
            <div className="mt-auto h-2 w-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
