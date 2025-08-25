"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Star, Trophy, Gift, Users, Zap, ArrowRight, Sparkles, ShieldCheck, Target, BarChart3, Clock, CheckCircle2, ChevronRight } from "lucide-react";


export default function RewardsLanding() {
  const [animate, setAnimate] = useState(false);

  // Estimator states
  const [checkin, setCheckin] = useState(true); // 20/month
  const [reviewsPerWeek, setReviewsPerWeek] = useState(2); // max 2/week
  const [updatesPerWeek, setUpdatesPerWeek] = useState(2); // max 3/week
  const [referralsPerMonth, setReferralsPerMonth] = useState(1); // max 2/month

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 250);
    return () => clearTimeout(t);
  }, []);

  // Copy-driven data
  const pointsData = [
    { action: "Sign‑up", points: "+2", limit: "One‑time", icon: "🎯" },
    { action: "Profile completion", points: "+3", limit: "One‑time", icon: "✨" },
    { action: "Daily check‑in", points: "+1", limit: "Max 20/month", icon: "🔥" },
    { action: "Write a review", points: "+2", limit: "Max 2/week", icon: "⭐" },
    { action: "Add/Update city data", points: "+3–5", limit: "Max 3/week", icon: "📝" },
    { action: "Referral (verified)", points: "+5", limit: "Max 2/month", icon: "🤝" },
  ];

  const levels = [
    {
      name: "Explorer",
      tag: "First reward • time‑gated",
      months: "2+ months",
      points: 200,
      rewards: [
        "Early access to beta features",
        "Featured on Travel Buddy (top placement)",
        "Explorer badge",
      ],
      gradient: "from-sky-100 to-sky-200",
    },
    {
      name: "Builder",
      tag: "Community status",
      months: "4–5 months",
      points: 500,
      rewards: [
        "Discounts on upcoming YesCity offers",
        "Invite to YesCity Insider group",
        "Builder badge & leaderboard placement",
      ],
      gradient: "from-sky-200 to-sky-300",
    },
    {
      name: "Influencer",
      tag: "Authority + reach",
      months: "7–8 months",
      points: 1000,
      rewards: [
        "Priority Travel Buddy ranking",
        "YesCity special discount bundle",
        "Influencer badge & spotlight feature",
      ],
      gradient: "from-sky-300 to-sky-400",
    },
    {
      name: "Legend",
      tag: "Partnership era",
      months: "12+ months",
      points: 2000,
      rewards: [
        "Big partner coupon bundle",
        "Official YesCity Ambassador title",
        "Legend badge & VIP event invites",
      ],
      gradient: "from-sky-400 to-sky-500",
    },
  ];

  // Lightweight estimator (uses average 4 pts for data update)
  const monthlyPoints = useMemo(() => {
    const checkinPts = checkin ? 20 : 0; // 1*20
    const reviewPts = Math.min(2, reviewsPerWeek) * 2 * 4; // weeks≈4
    const updatePts = Math.min(3, updatesPerWeek) * 4 * 4; // avg 4 pts * 4 weeks
    const referralPts = Math.min(2, referralsPerMonth) * 5;
    return checkinPts + reviewPts + updatePts + referralPts; // ~20–60 typical
  }, [checkin, reviewsPerWeek, updatesPerWeek, referralsPerMonth]);

  const monthsToExplorer = useMemo(() => {
    if (!monthlyPoints) return "—";
    const months = Math.ceil(200 / monthlyPoints);
    return Math.max(2, months); // hard floor: 2 months
  }, [monthlyPoints]);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-white focus:text-slate-900 focus:px-4 focus:py-2 focus:rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        Skip to content
      </a>

      {/* Header / Hero */}
      <header className="relative">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <nav
            className="flex items-center justify-between"
            aria-label="Primary"
          >
            <div className="flex items-center gap-3">
              <img src="./YCNewLogo.png" alt="YesCity" className="h-10 w-fit m-auto" />
            </div>
            <ul className="hidden md:flex items-center gap-6 text-lg font-semibold text-slate-600">
              <li>
                <a
                  className="hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  href="#how"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  className="hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  href="#points"
                >
                  Points
                </a>
              </li>
              <li>
                <a
                  className="hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  href="#levels"
                >
                  Levels
                </a>
              </li>
              <li>
                <a
                  className="hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  href="#faq"
                >
                  FAQ
                </a>
              </li>
            </ul>
            <button className="hidden md:inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-white font-bold shadow-sm hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              Join now <ArrowRight className="h-4 w-4" />
            </button>
          </nav>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-16 pt-6 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 pt-8">
             Rewards Program
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg md:text-xl text-slate-600">
            Turn your contributions into{" "}
            <strong className="text-slate-900">recognition</strong>,{" "}
            <strong className="text-slate-900">influence</strong>, and{" "}
            <strong className="text-slate-900">exclusive perks</strong>. Be more
            than a user—become a Legend.
          </p>
        </div>
      </header>

      <main id="main">
        {/* How it Works */}
        <section id="how" className="mx-auto max-w-7xl px-6 py-16">
          <SectionTitle eyebrow="Simple, fair, motivating" title="How it works" subtitle="Earn points, rise through levels, unlock exclusive YesCity perks. Partner coupons unlock only after month 4." />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={<Zap className="h-6 w-6" />} title="Earn points" desc="Contribute reviews, verified updates, referrals and more—within fair caps to protect quality." />
            <FeatureCard icon={<Trophy className="h-6 w-6" />} title="Reach levels" desc="Explorer • Builder • Influencer • Legend—each tier unlocks status, visibility, and access." />
            <FeatureCard icon={<Gift className="h-6 w-6" />} title="Unlock rewards" desc="Early access, Travel Buddy featuring, Insider community, and later—brand partner benefits." />
          </div>
        </section>

        {/* Points – table with mobile cards */}
        <section id="points" className="mx-auto max-w-7xl px-6 py-16">
          <SectionTitle eyebrow="Every action counts" title="Earn points for every move" subtitle="Progress is intentionally steady—expect a minimum of 2 months to reach your first reward." />

          {/* Estimator */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-bold">Your monthly points estimate</h3>
              </div>
              <div className="grid gap-4">
                <ToggleRow label="Daily check‑in (20 pts/mo)" checked={checkin} onChange={setCheckin} />
                <RangeRow label="Reviews per week" value={reviewsPerWeek} setValue={setReviewsPerWeek} max={2} unit="× 2 pts" />
                <RangeRow label="Data updates per week" value={updatesPerWeek} setValue={setUpdatesPerWeek} max={3} unit="× ~4 pts" />
                <RangeRow label="Referrals per month" value={referralsPerMonth} setValue={setReferralsPerMonth} max={2} unit="× 5 pts" />
              </div>
              <div className="mt-6 rounded-xl bg-gradient-to-r from-blue-50 to-sky-50 p-4">
                <p className="text-sm text-slate-600">Estimated monthly points</p>
                <div className="mt-1 text-3xl font-black text-slate-900">{monthlyPoints}</div>
                <p className="mt-2 text-sm text-slate-600">Estimated months to Explorer (200 pts): <span className="font-bold text-slate-900">{monthsToExplorer}</span> <span className="text-slate-500">(minimum 2 months)</span></p>
              </div>
            </div>

            {/* Responsive table/cards */}
            <div className="rounded-2xl border border-blue-100 bg-white p-0 shadow-sm overflow-hidden">
              <div className="hidden sm:grid grid-cols-3 gap-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-6 py-4 text-white">
                <div className="font-black">Action</div>
                <div className="text-center font-black">Points</div>
                <div className="text-right font-black">Limit</div>
              </div>
              <ul className="divide-y divide-blue-50">
                {pointsData.map((row, idx) => (
                  <li key={idx} className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 px-6 py-4 hover:bg-blue-50/40">
                    <div className="flex items-center gap-3 font-semibold text-slate-900">
                      <span aria-hidden className="text-xl">{row.icon}</span>
                      <span>{row.action}</span>
                    </div>
                    <div className="sm:text-center">
                      <span className="inline-block font-black text-2xl bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">{row.points}</span>
                    </div>
                    <div className="sm:text-right text-slate-600 font-medium">{row.limit}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Fair play note */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <CheckCircle2 className="h-4 w-4 text-green-600" /> Daily/weekly caps prevent spam; only verified contributions earn points.
          </div>
        </section>

        {/* Levels */}
        <section id="levels" className="mx-auto max-w-7xl px-6 py-16">
          <SectionTitle eyebrow="Aspirational, time‑gated" title="Choose your path" subtitle="Each level unlocks recognition, reach and access. Partner coupons appear only after month 4." />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {levels.map((lvl, i) => (
              <div key={lvl.name} className={`relative overflow-hidden rounded-3xl border border-white bg-gradient-to-br ${lvl.gradient} p-1 shadow-sm transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1`}>
                <div className="rounded-[22px] bg-white p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black tracking-tight text-slate-900">{lvl.name}</h3>
                      <p className="text-xs font-bold uppercase tracking-wider text-blue-700/80">{lvl.tag}</p>
                    </div>
                    <div className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">{lvl.months}</div>
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">{lvl.points} pts</div>
                  <ul className="mt-4 space-y-2">
                    {lvl.rewards.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-slate-700"><Star className="mt-0.5 h-4 w-4 text-blue-600" fill="currentColor" /><span>{r}</span></li>
                    ))}
                  </ul>
                  {i === 3 && (
                    <p className="mt-3 text-xs font-semibold text-slate-500">* Partner coupons are introduced after month 4 across the program.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-7xl px-6 pb-24">
          <SectionTitle eyebrow="Good to know" title="FAQ" subtitle="Quick answers about timing, fairness and costs." />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <FAQ q="When do I get my first reward?" a="Explorer (200 pts) is intentionally paced—expect at least 2 months. Your actual time depends on your monthly activity within fair caps." />
            <FAQ q="Are there cash rewards early on?" a="No. Early rewards focus on status, visibility and exclusive YesCity features. Brand partner coupons appear after month 4." />
            <FAQ q="How do caps work?" a="Daily/weekly limits safeguard quality: check‑ins (20/mo), reviews (max 2/wk), updates (max 3/wk), referrals (max 2/mo). Only verified actions count." />
          </div>
        </section>
      </main>

      {/* Desktop CTA */}
      <section className="mx-auto hidden max-w-7xl items-center justify-between gap-6 rounded-3xl border border-blue-100 bg-white px-6 py-8 shadow-sm md:flex">
        <div>
          <h3 className="text-2xl font-black tracking-tight">Ready to rise through the ranks?</h3>
          <p className="mt-1 text-slate-600">Start small, stay consistent, and unlock perks that put you at the heart of YesCity.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-bold text-white shadow-sm hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          Start earning points <ArrowRight className="h-5 w-5" />
        </button>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-3 shadow-2xl md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-3">
          <div className="text-sm">
            <div className="font-black">Climb the ladder</div>
            <div className="text-slate-600">2+ months to your first reward</div>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            Join now <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Animations & reduced-motion support */}
      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          .fade-up { opacity: 0; transform: translateY(16px); animation: fadeUp .6s ease-out forwards; }
        }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

// ————— Small internal UI helpers —————
function KPI({ chipIcon, label }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm">
      <span aria-hidden>{chipIcon}</span>
      <span>{label}</span>
    </div>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
        {eyebrow}
      </div>
      <h2 className="mt-4 text-3xl md:text-4xl font-black tracking-tight text-slate-900">{title}</h2>
      {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-sm">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-black text-slate-900">{title}</h3>
      <p className="mt-1 text-slate-600">{desc}</p>
    </div>
  );
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50">
      <span className="font-medium text-slate-800">{label}</span>
      <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className={`relative h-7 w-12 rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-slate-300"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}>
        <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${checked ? "-translate-x-6" : "translate-x-0"}`} />
      </button>
    </label>
  );
}

function RangeRow({ label, value, setValue, max, unit }) {
  return (
    <div className="rounded-xl border border-slate-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <span className="font-medium text-slate-800">{label} {unit && <span className="text-slate-500">({unit})</span>}</span>
        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-sm font-bold text-slate-900">{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="mt-3 w-full accent-blue-600"
        aria-label={label}
      />
      <div className="mt-1 flex justify-between text-xs text-slate-500">
        <span>0</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function FAQ({ q, a }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
        <Target className="h-3.5 w-3.5" />
        Answered
      </div>
      <h4 className="text-base font-black text-slate-900">{q}</h4>
      <p className="mt-1 text-sm text-slate-600">{a}</p>
    </div>
  );
}