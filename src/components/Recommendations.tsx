import React, { useState, useEffect } from "react";
import { recommendations } from "../data/portfolio";
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
    <div className="relative p-5 min-h-[260px] flex flex-col justify-between overflow-hidden">
      <div className="relative w-full">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className={cn(
              "transition-all duration-700 ease-in-out flex flex-col",
              index === activeIndex
                ? "opacity-100 translate-x-0 relative z-10"
                : "opacity-0 translate-x-4 absolute inset-0 pointer-events-none z-0"
            )}
          >
            <blockquote className="text-sm md:text-base leading-relaxed text-foreground/90 font-medium mb-8">
              "{rec.content}"
            </blockquote>

            <div className="pt-4 border-t border-border/50">
              <p className="text-sm font-semibold text-foreground">
                {rec.author}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {rec.author === "Project Teammate" ? "Collaborator" : "Peer Recommendation"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator - Small left-aligned rectangles */}
      <div className="flex justify-start gap-1.5 mt-8">
        {recommendations.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "h-1 transition-all duration-500 rounded-px",
              index === activeIndex ? "w-4 bg-foreground" : "w-1.5 bg-border hover:bg-muted-foreground"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
