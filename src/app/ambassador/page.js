export default function CampusAmbassadorPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-purple-50 text-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-black py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-blue-600">YesCity</span> Campus Ambassador
            Program
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto">
            Be the face of <span className="text-blue-600">YesCity</span> in your
            college. Gain real-world experience, unlock exclusive recognition,
            and earn your place as a{" "}
            <span className="font-bold text-blue-700">Campus Legend</span>.
          </p>
          <div className="mt-8">
            <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition">
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* Core Idea */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Why Join?
        </h2>
        <div className="mt-10 grid gap-4 md:gap-8 grid-cols-2 md:grid-cols-4">
          {[
            {
              title: "Build Skills",
              desc: "Learn marketing, networking & leadership.",
            },
            {
              title: "Industry Experience",
              desc: "Get real-world exposure to growth strategies.",
            },
            {
              title: "Recognition",
              desc: "Certificates, badges & public recognition.",
            },
            {
              title: "Unlimited Growth",
              desc: "No cap on referrals or impact.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-blue-100 bg-white shadow-md p-5 md:p-6 hover:shadow-xl hover:-translate-y-1 transition"
            >
              <h3 className="font-bold text-xl text-blue-700">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Program Structure */}
      <section className="bg-gradient-to-b from-slate-50 to-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Your Campus Ambassador Journey
          </h2>
          <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
            Level up step by step. Hit milestones, unlock rewards, and grow into
            a Campus Legend.
          </p>

          <div className="mt-16 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 -z-10"></div>

            <div className="grid md:grid-cols-3 gap-10">
              {/* Phase 1 */}
              <div className="relative group">
                <div className="p-6 md:p-8 bg-white rounded-2xl shadow-lg border hover:shadow-2xl transition transform group-hover:-translate-y-2">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-blue-100 text-blue-600 text-3xl">
                    📈
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-blue-700 text-center">
                    Phase 1: Referrals
                  </h3>
                  <p className="mt-2 text-slate-600 text-center">
                    Kickstart your journey by bringing friends on board.
                  </p>
                  <p className="mt-3 text-sm text-blue-700 font-semibold text-center">
                     (Start immediately)
                  </p>
                  <ul className="mt-4 space-y-2 text-left text-slate-600  list-disc px-2">
                    <li>Unlimited referrals allowed</li>
                    <li>Earn badges & recognition</li>
                    <li>Climb Bronze → Silver → Gold → Legend</li>
                  </ul>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="relative group">
                <div className="p-6 md:p-8 bg-white rounded-2xl shadow-lg border hover:shadow-2xl transition transform group-hover:-translate-y-2">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-purple-100 text-purple-600 text-3xl">
                    🏆
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-blue-700 text-center">
                    Phase 2: Rewards
                  </h3>
                  <p className="mt-2 text-slate-600 text-center">
                    Consistency pays off! Unlock your first big rewards after
                    300 successful referrals.
                  </p>
                  <p className="mt-3 text-sm text-purple-700 font-semibold text-center">
                    (Unlock at 300 referrals)
                  </p>
                  <ul className="mt-4 space-y-2 text-left text-slate-600  list-disc px-2">
                    <li>Official Campus Ambassador Certificate</li>
                    <li>Letter of Recommendation (LoR)</li>
                    <li>Featured Profile on YesCity Website</li>
                    <li>Exclusive YesCity Coupons</li>
                  </ul>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="relative group">
                <div className="p-6 md:p-8 bg-white rounded-2xl shadow-lg border hover:shadow-2xl transition transform group-hover:-translate-y-2">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-teal-100 text-teal-600 text-3xl">
                    🎓
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-blue-700 text-center">
                    Phase 3: Industry Experience
                  </h3>
                  <p className="mt-2 text-slate-600 text-center">
                    Go beyond referrals. Unlock premium access and industry
                    training after hitting 600 referrals.
                  </p>
                  <p className="mt-3 text-sm text-teal-700 font-semibold text-center">
                    (Unlock at 600 referrals)
                  </p>
                  <ul className="mt-4 space-y-2 text-left text-slate-600 list-disc px-2">
                    <li>Industry-relevant training</li>
                    <li>Free YesCity workshops & webinars</li>
                    <li>Learning modules crafted by experts</li>
                    <li>Early access to YesCity features</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It’s Lucrative */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Why It Works
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {[
            {
              icon: "🎮",
              title: "Gamification",
              desc: "Badges & leaderboards for fun competition.",
            },
            {
              icon: "🏆",
              title: "Recognition",
              desc: "Certificates, LoRs & public shoutouts.",
            },
            {
              icon: "🤝",
              title: "Community",
              desc: "Exclusive YesCity Ambassador group.",
            },
            {
              icon: "⏳",
              title: "3-Month Rewards",
              desc: "Keeps ambassadors engaged long-term.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-blue-100 bg-white shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="text-3xl">{item.icon}</div>
              <h3 className="mt-3 font-bold text-xl text-blue-700">
                {item.title}
              </h3>
              <p className="mt-2 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Become a Campus Legend
        </h2>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl">
          Promote YesCity, build your influence, and graduate as more than just
          a student. Start your journey and unlock rewards at{" "}
          <span className="font-bold">300+ referrals</span>.
        </p>
        <div className="mt-8">
          <button className="px-10 py-4 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:bg-slate-100 transition">
            Apply Now
          </button>
        </div>
      </section>
    </div>
  );
}
