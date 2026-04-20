import React, { useState, useEffect } from "react";
import { recommendations } from "../data/portfolio";
import { Quote } from "lucide-react";
import { cn } from "../lib/utils";

export function Recommendations() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % recommendations.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative p-6 pt-8 min-h-[280px] flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Quote Icon */}
      <div className="mb-6 opacity-20">
        <Quote className="w-10 h-10 text-primary" />
      </div>

      <div className="relative w-full">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className={cn(
              "transition-all duration-700 ease-in-out flex flex-col items-center",
              index === activeIndex
                ? "opacity-100 translate-y-0 relative z-10"
                : "opacity-0 -translate-y-4 absolute inset-0 pointer-events-none z-0"
            )}
          >
            <blockquote className="text-base md:text-lg font-medium leading-relaxed text-foreground/90 italic mb-6">
              "{rec.content}"
            </blockquote>

            <div className="flex flex-col items-center">
              <div className="h-px w-8 bg-primary/30 mb-3" />
              <p className="text-[10px] font-bold tracking-widest uppercase text-primary">
                {rec.author}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {recommendations.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "h-1.5 transition-all duration-500 rounded-full",
              index === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-primary/40"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
