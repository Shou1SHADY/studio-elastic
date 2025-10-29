"use client";

import Image from "next/image";

type ContentWithImageProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  bullets?: string[];
  imageSrc: string;
  imageAlt?: string;
  imageSide?: "left" | "right";
};

export default function ContentWithImage({
  eyebrow,
  title,
  body,
  bullets = [],
  imageSrc,
  imageAlt = "",
  imageSide = "right",
}: ContentWithImageProps) {
  const imageFirst = imageSide === "left";

  return (
    <section className="container mx-auto px-4 py-16 md:py-20">
      <div className={`grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12`}>
        {imageFirst && (
          <div className="relative order-1 md:order-none">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-foreground/[0.06] border border-border/30 shadow-md">
              <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
        )}
        <div className="bg-foreground/[0.06] backdrop-blur-sm border border-border/30 rounded-2xl p-6 md:p-8 shadow-md">
          {eyebrow && <p className="text-sm tracking-wide uppercase text-accent/90 font-medium mb-2">{eyebrow}</p>}
          <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">{title}</h2>
          {body && <p className="text-foreground/80 leading-relaxed mb-4">{body}</p>}
          {bullets.length > 0 && (
            <ul className="space-y-2">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 inline-block w-2 h-2 rounded-full bg-accent" />
                  <span className="text-foreground/85">{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {!imageFirst && (
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-foreground/[0.06] border border-border/30 shadow-md">
              <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
