import React, { useEffect } from "react";

function OfferModal({ open, onClose, offer }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !offer) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="offer-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-[61] w-[92vw] max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="relative h-56">
          <img
            src={offer.img}
            alt={offer.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          <h3
            id="offer-title"
            className="absolute left-5 bottom-4 text-white text-2xl font-extrabold drop-shadow"
          >
            {offer.title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-900 border-2 border-black rounded-full w-9 h-9 font-extrabold shadow-[2px_2px_0_#000]"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700 leading-relaxed">{offer.blurb}</p>

          <div
            className={`mt-4 h-1.5 w-20 rounded-full bg-gradient-to-r ${
              offer.accent || "from-red-500 to-orange-500"
            }`}
          />

          <div className="mt-6 flex items-center justify-between">
            <button
              className="bg-[#e63946] hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-full shadow transition-transform hover:scale-105"
              aria-label={`Order ${offer.title}`}
              onClick={onClose}
            >
              Order Now
            </button>
            <button
              className="text-[#e63946] font-semibold hover:underline"
              onClick={onClose}
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferModal;
