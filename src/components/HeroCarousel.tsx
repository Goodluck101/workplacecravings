"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { heroSlides, motion, type HeroSlide } from "@/lib/site";

type HeroCarouselProps = {
  slides?: HeroSlide[];
};

export function HeroCarousel({ slides = heroSlides }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback(
    (next: number) => {
      setIndex((next + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (paused || count < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, motion.heroIntervalMs);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  return (
    <section
      className="relative overflow-hidden bg-brand-green"
      aria-roledescription="carousel"
      aria-label="Featured food"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="flex transition-transform ease-out motion-reduce:transition-none"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transitionDuration: `${motion.heroTransitionMs}ms`,
        }}
      >
        {slides.map((slide, slideIndex) => (
          <article
            key={slide.id}
            className="relative h-[78vh] min-h-[32rem] w-full shrink-0 basis-full"
            aria-hidden={slideIndex !== index}
          >
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              priority={slideIndex === 0}
              sizes="100vw"
              className={`object-cover ${slideIndex === index ? "kenburns" : ""}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/55 to-brand-green/10 sm:bg-gradient-to-r sm:from-brand-green sm:via-brand-green/70 sm:to-transparent" />
            <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-4 pb-28 sm:items-center sm:px-6 sm:pb-16 lg:px-8">
              <div className="max-w-xl text-white">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
                  {slide.eyebrow}
                </p>
                <h2 className="font-display mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
                  {slide.description}
                </p>
                <Link
                  href={slide.href}
                  className="mt-7 inline-flex rounded-full bg-brand-orange px-6 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:bg-brand-orange-dark"
                  tabIndex={slideIndex === index ? 0 : -1}
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-green shadow-md transition hover:bg-white sm:flex"
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
      >
        <Chevron direction="left" />
      </button>
      <button
        type="button"
        className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-green shadow-md transition hover:bg-white sm:flex"
        aria-label="Next slide"
        onClick={() => go(index + 1)}
      >
        <Chevron direction="right" />
      </button>

      <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-2">
        {slides.map((slide, slideIndex) => {
          const active = slideIndex === index;
          return (
            <button
              key={slide.id}
              type="button"
              aria-label={`Show slide ${slideIndex + 1}: ${slide.eyebrow}`}
              aria-current={active}
              onClick={() => go(slideIndex)}
              className={`grid h-9 min-w-9 place-items-center rounded-full px-2 text-xs font-bold transition ${
                active
                  ? "bg-brand-orange text-white"
                  : "bg-white/80 text-brand-green hover:bg-white"
              }`}
            >
              {slideIndex + 1}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  );
}
