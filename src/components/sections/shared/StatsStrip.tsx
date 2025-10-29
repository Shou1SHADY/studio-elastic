"use client";

type Stat = { label: string; value: string };

export default function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="bg-foreground/[0.06] backdrop-blur-sm border border-border/30 rounded-2xl p-6 md:p-8 shadow-md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i} className="space-y-1">
              <div className="text-2xl md:text-3xl font-headline font-bold">{s.value}</div>
              <div className="text-foreground/70 text-sm md:text-base">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
