import type { Metadata } from "next";
import Link from "next/link";
import { masterclassDocs } from "./_generated/content";

export const metadata: Metadata = {
  title: "ESA Academy Command Center",
  description: "Private ESA Academy filming dashboard and masterclass working files.",
  robots: { index: false, follow: false },
};

const moduleCards = [
  ["01", "STRs & Choosing Your Path", "Foundation, business models, location fit, Rule of 10 intro."],
  ["02", "Furnishing & Setup", "Guest-ready unit, room-by-room setup, essentials, photos."],
  ["03", "Listing Creation", "Positioning, photo order, title, copy, trust signals."],
  ["04", "Guest Acquisition", "Airbnb, direct, repeat, corporate, agents, channel rules."],
  ["05", "Pricing & Launch", "Rule of 10, pricing floor, launch pricing, reviews, market reads."],
  ["06", "Cleaning & Turnover", "Cleaner training, checklist, laundry, restocking, QC, backups."],
  ["07", "Guest Experience", "Journey, messages, check-in, support, complaints, reviews."],
  ["08", "Protection & Problems", "Vetting, rules, evidence, bad guests, refunds, review recovery."],
  ["09", "Finance & Scaling", "Revenue vs profit, reporting, SOPs, support, scaling models."],
  ["10", "Launch Blueprint", "Path-specific next steps, 30/60/90 plan, final checklist."],
];

const priorityDocs = [
  "COURSE_FILMING_DASHBOARD.html",
  "COURSE_FILMING_SYSTEM.md",
  "CURRICULUM_REBUILD_NOTES.md",
  "scripts/TODAY_FIRST_VIDEO_LESSON_CARD.md",
  "scripts/M5_RULE_OF_10_COURSE_SCRIPT.md",
];

function hrefFor(slug: string[]) {
  return `/class/docs/${slug.map(encodeURIComponent).join("/")}`;
}

export default function ClassCommandCenter() {
  const priority = priorityDocs
    .map((path) => masterclassDocs.find((doc) => doc.path === path))
    .filter(Boolean);
  const rest = masterclassDocs.filter((doc) => !priorityDocs.includes(doc.path));

  return (
    <div className="min-h-screen bg-[#15171c] text-slate-100">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(213,123,102,0.22),transparent_35%),linear-gradient(135deg,#181b22,#101217)]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-[#d57b66]/40 bg-[#d57b66]/10 px-3 py-1 text-sm font-medium text-[#f0b4a4]">
                Private command center
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                ESA Academy filming dashboard
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                One place for the course map, filming workflow, scripts, notes, and masterclass working files.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300 shadow-2xl">
              <div className="font-semibold text-white">File rule</div>
              <code className="mt-2 block rounded-lg bg-black/25 px-3 py-2 text-[#a7f3d0]">
                ESA_ACADEMY_M##_V##_short-title_RAW_YYYY-MM-DD.mp4
              </code>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-white/10 bg-[#1f232b] p-5 shadow-xl">
            <h2 className="text-lg font-semibold text-white">Start here</h2>
            <ol className="mt-4 space-y-3 text-sm text-slate-300">
              <li><span className="text-[#f0b4a4]">1.</span> Open the filming dashboard.</li>
              <li><span className="text-[#f0b4a4]">2.</span> Pick one video only.</li>
              <li><span className="text-[#f0b4a4]">3.</span> Open/build its script card.</li>
              <li><span className="text-[#f0b4a4]">4.</span> Record: desk, screen, field, or hybrid.</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#1f232b] p-5 shadow-xl">
            <h2 className="text-lg font-semibold text-white">Production lanes</h2>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-sky-200">Desk</span>
              <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-emerald-200">Screen record</span>
              <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-amber-200">Field shots</span>
              <span className="rounded-full border border-rose-400/40 bg-rose-400/10 px-3 py-1 text-rose-200">Hybrid</span>
            </div>
          </div>
        </aside>

        <div className="space-y-8">
          <section className="rounded-3xl border border-white/10 bg-[#1b1f27] p-5 shadow-xl sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Priority files</h2>
                <p className="mt-1 text-sm text-slate-400">The files you’ll use most while filming.</p>
              </div>
              <p className="text-sm text-slate-400">{masterclassDocs.length} masterclass files synced</p>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {priority.map((doc) => doc && (
                <Link key={doc.path} href={hrefFor(doc.slug)} className="group rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-[#d57b66]/60 hover:bg-[#d57b66]/10">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-white group-hover:text-[#ffd2c7]">{doc.title}</h3>
                    <span className="rounded-full bg-black/25 px-2 py-1 text-xs uppercase text-slate-400">{doc.type}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-400">{doc.excerpt || doc.path}</p>
                  <p className="mt-3 font-mono text-xs text-[#a7f3d0]">{doc.path}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#1b1f27] p-5 shadow-xl sm:p-6">
            <h2 className="text-2xl font-semibold text-white">Course map</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {moduleCards.map(([num, title, desc]) => (
                <div key={num} className="rounded-2xl border border-white/10 bg-[#15181f] p-4">
                  <div className="flex items-start gap-3">
                    <span className="rounded-xl bg-[#d57b66]/15 px-3 py-2 font-semibold text-[#f0b4a4]">M{num}</span>
                    <div>
                      <h3 className="font-semibold text-white">{title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#1b1f27] p-5 shadow-xl sm:p-6">
            <h2 className="text-2xl font-semibold text-white">All masterclass files</h2>
            <div className="mt-5 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
              {rest.map((doc) => (
                <Link key={doc.path} href={hrefFor(doc.slug)} className="block bg-white/[0.025] p-4 transition hover:bg-white/[0.06]">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-medium text-white">{doc.title}</h3>
                    <span className="font-mono text-xs text-slate-500">{doc.path}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{doc.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
