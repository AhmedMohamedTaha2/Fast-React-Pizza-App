import React, { useState } from "react";
import OfferModal from "./OfferModal";

function Offers() {
  const [activeOffer, setActiveOffer] = useState(null);

  const offers = [
    {
      id: 1,
      key: "leonardo",
      title: "Leader’s Slice",
      img: "/images/Leonardo offer.png",
      blurb: "Calm, heroic, confident – sunrise on a NY rooftop.",
      accent: "from-blue-500 to-yellow-400",
      cta: "Order Now",
    },
    {
      id: 2,
      key: "michelangelo",
      title: "Party Time Pizza",
      img: "/images/Michelangelo offer.png",
      blurb: "80s arcade energy – neon lights and laughter.",
      accent: "from-orange-500 to-pink-500",
      cta: "Party Combo",
    },
    {
      id: 3,
      key: "donatello",
      title: "Tech Genius Combo",
      img: "/images/Donatello offer.png",
      blurb: "Gadget lab chaos – robot pizza flinging slices.",
      accent: "from-purple-500 to-green-500",
      cta: "Tech Deal",
    },
    {
      id: 4,
      key: "raphael",
      title: "Power Slice",
      img: "/images/Raphael offer.png",
      blurb: "Bold diner mood – extra cheese, extra attitude.",
      accent: "from-red-500 to-amber-500",
      cta: "Power Up",
    },
    {
      id: 5,
      key: "family",
      title: "Family Pizza Night",
      img: "/images/family offer.png",
      blurb: "Warm, joyful chaos – family sharing slices.",
      accent: "from-rose-400 to-emerald-500",
      cta: "Family Offer",
    },
  ];

  return (
    <section className="min-h-screen w-full bg-[#fff8f0] px-4 sm:px-6 lg:px-12 py-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#e63946] tracking-wide">
          Handpicked Offers
        </h2>
        <p className="mt-2 text-gray-700">
          Curated deals that match your vibe.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((o) => (
          <article
            key={o.id}
            className="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 shadow-lg transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="relative h-52">
              <img
                src={o.img}
                alt={o.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              <div className="absolute left-4 bottom-4">
                <h3 className="text-white text-xl font-extrabold drop-shadow">
                  {o.title}
                </h3>
                <p className="text-white/90 text-sm">{o.blurb}</p>
              </div>
            </div>

            <div className="p-5">
              <div
                className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${o.accent}`}
              />
              <div className="mt-4 flex items-center justify-between gap-3">
                <button
                  className="bg-[#e63946] hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full shadow transition-transform hover:scale-105"
                  aria-label={`Order ${o.title}`}
                >
                  {o.cta}
                </button>
                <button
                  className="text-[#e63946] font-semibold hover:underline"
                  onClick={() => setActiveOffer(o)}
                >
                  View details
                </button>
              </div>
            </div>

            <img
              src="/images/63d748802fb109b77c97462a_bgPattern-dot-round.png"
              alt="texture"
              className="pointer-events-none absolute -bottom-6 -right-6 w-28 opacity-20 group-hover:opacity-30 transition-opacity"
              loading="lazy"
            />
          </article>
        ))}
      </div>

      <OfferModal
        open={!!activeOffer}
        onClose={() => setActiveOffer(null)}
        offer={activeOffer}
      />
    </section>
  );
}

export default Offers;
