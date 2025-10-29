"use client";

import Image from "next/image";

type SectionBannerProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  imageSrc?: string;
  imageAlt?: string;
  align?: "left" | "right";
};

export default function SectionBanner({
  eyebrow,
  title,
  subtitle,
  ctaText,
  onCtaClick,
  imageSrc,
  imageAlt = "",
  align = "left",
}: SectionBannerProps) {
  const withImage = Boolean(imageSrc);
  const imageFirst = align === "right";

  return (
    <section className="relative container mx-auto px-4 pt-28 md:pt-36 pb-10">
      <div className={`grid grid-cols-1 ${withImage ? "md:grid-cols-2" : ""} items-center gap-8 md:gap-12`}>
        {withImage && imageFirst && (
          <div className="relative order-1 md:order-none">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-foreground/[0.06] border border-border/30 shadow-md">
              <Image
                src={imageSrc!}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        )}
        <div className="space-y-4">
          {eyebrow && (
            <p className="text-sm tracking-wide uppercase text-accent/90 font-medium">{eyebrow}</p>
          )}
          <h1 className="text-4xl md:text-5xl font-headline font-bold bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl">{subtitle}</p>
          )}
          {ctaText && (
            <button
              onClick={onCtaClick}
              className="inline-flex mt-2 px-5 py-3 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition"
            >
              {ctaText}
            </button>
          )}
        </div>
        {withImage && !imageFirst && (
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-foreground/[0.06] border border-border/30 shadow-md">
              <Image
                src={imageSrc!}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
