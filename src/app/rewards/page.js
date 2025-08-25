export default function RewardsLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-16 px-6 max-w-4xl mx-auto">
        <img className="h-25 m-auto w-fit mb-3" src="./YCNewLogo.png"/>
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
        Rewards Program
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Turn your contributions into recognition, influence, and exclusive perks. 
          Be more than a user — become a City Explorer, Builder, Influencer, and Legend.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-12 px-6 bg-white shadow-md rounded-2xl max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-blue-50 rounded-2xl shadow-sm">
            <img src="https://img.icons8.com/?size=100&id=dJmZPAqp4mxA&format=png&color=000000" alt="earn" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Earn Points</h3>
            <p className="text-gray-600">Get points for reviews, referrals, updates, and more.</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-2xl shadow-sm">
            <img src="https://img.icons8.com/color/96/goal.png" alt="levels" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Reach Levels</h3>
            <p className="text-gray-600">Progress through Explorer, Builder, Influencer, and Legend tiers.</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-2xl shadow-sm">
            <img src="https://img.icons8.com/fluency/96/prize.png" alt="rewards" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Unlock Rewards</h3>
            <p className="text-gray-600">Enjoy early access, recognition, discounts, and exclusive perks.</p>
          </div>
        </div>
      </section>

      {/* Point System Table */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Earn Points for Every Contribution
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Action</th>
                <th className="py-3 px-4 text-left">Points</th>
                <th className="py-3 px-4 text-left">Limit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="py-3 px-4">Sign-up</td><td className="py-3 px-4">+2</td><td className="py-3 px-4">One-time</td></tr>
              <tr><td className="py-3 px-4">Profile Completion</td><td className="py-3 px-4">+3</td><td className="py-3 px-4">One-time</td></tr>
              <tr><td className="py-3 px-4">Daily Check-in</td><td className="py-3 px-4">+1</td><td className="py-3 px-4">Max 20/month</td></tr>
              <tr><td className="py-3 px-4">Write a Review</td><td className="py-3 px-4">+2</td><td className="py-3 px-4">Max 2/week</td></tr>
              <tr><td className="py-3 px-4">Add/Update Data</td><td className="py-3 px-4">+3-5</td><td className="py-3 px-4">Max 3/week</td></tr>
              <tr><td className="py-3 px-4">Referral (verified)</td><td className="py-3 px-4">+5</td><td className="py-3 px-4">Max 2/month</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Reward Levels */}
      <section className="py-12 px-6 bg-gradient-to-r from-blue-50 to-blue-100 max-w-6xl mx-auto rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Reward Levels
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow-lg text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Explorer</h3>
            <p className="font-bold mb-2">200 pts</p>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>✔ Early Access to Beta Features</li>
              <li>✔ Featured on Travel Buddy</li>
              <li>✔ Explorer Badge</li>
            </ul>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Builder</h3>
            <p className="font-bold mb-2">500 pts</p>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>✔ Discounts on YesCity Offers</li>
              <li>✔ Exclusive Insider Group</li>
              <li>✔ Builder Badge</li>
            </ul>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Influencer</h3>
            <p className="font-bold mb-2">1000 pts</p>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>✔ Priority Travel Buddy Ranking</li>
              <li>✔ YesCity Special Discounts</li>
              <li>✔ Influencer Badge</li>
            </ul>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Legend</h3>
            <p className="font-bold mb-2">2000 pts</p>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>✔ Big Partner Coupon Bundle</li>
              <li>✔ Official Ambassador Title</li>
              <li>✔ Legend Badge</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          Ready to Rise Through the Ranks?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Every contribution counts. Start small, stay consistent, and unlock rewards that put you at the heart of YesCity.
        </p>
        <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition">
          Start Earning Points
        </button>
      </section>
    </div>
  );
}
