import React from "react";

function AboutUs() {
  return (
    <section className="min-h-screen bg-[#fff8f0] px-4 sm:px-6 lg:px-12 py-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#e63946] tracking-wide text-center">
          Our Story
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-800 leading-relaxed text-lg">
              Fast React Pizza began with a simple idea: hot, honest pizza
              delivered at the speed of modern life. We blend artisanal recipes
              with a tech-first approach to make every order fast, friendly, and
              delicious.
            </p>
            <p className="mt-4 text-gray-800 leading-relaxed text-lg">
              From day one, we focused on freshness, consistency, and joy.
              Today, our ovens bake hundreds of pizzas daily — each crafted with
              care and delivered with a smile.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border-4 border-black shadow-[4px_4px_0_#000]">
            <img
              src="/images/pizzaTime.webp"
              alt="Our pizza"
              className="w-full h-64 object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-16">
        <h3 className="text-3xl font-extrabold text-[#e63946]">
          Mission & Values
        </h3>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border-4 border-black shadow-[4px_4px_0_#000] p-6">
            <h4 className="text-xl font-extrabold text-gray-900">Freshness</h4>
            <p className="mt-2 text-gray-700">
              Daily-made dough, premium ingredients, baked-to-order pies.
            </p>
          </div>
          <div className="bg-white rounded-xl border-4 border-black shadow-[4px_4px_0_#000] p-6">
            <h4 className="text-xl font-extrabold text-gray-900">Speed</h4>
            <p className="mt-2 text-gray-700">
              Smart workflows keep your pizza moving — hot and on time.
            </p>
          </div>
          <div className="bg-white rounded-xl border-4 border-black shadow-[4px_4px_0_#000] p-6">
            <h4 className="text-xl font-extrabold text-gray-900">Joy</h4>
            <p className="mt-2 text-gray-700">
              Warm service and playful moments in every bite and click.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-16">
        <h3 className="text-3xl font-extrabold text-[#e63946]">
          Team & Founders
        </h3>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              name: "Alex Marin",
              role: "Co-founder & CEO",
              img: "/images/bw1.webp",
            },
            {
              name: "Jamie Park",
              role: "Co-founder & CTO",
              img: "/images/bw2.webp",
            },
            {
              name: "Riya Sen",
              role: "Head of Operations",
              img: "/images/bw3.webp",
            },
          ].map((m) => (
            <div
              key={m.name}
              className="bg-white rounded-xl border-4 border-black shadow-[4px_4px_0_#000] p-6 text-center"
            >
              <img
                src={m.img}
                alt={m.name}
                className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-black"
                loading="lazy"
              />
              <h4 className="mt-4 text-xl font-extrabold text-gray-900">
                {m.name}
              </h4>
              <p className="text-gray-700">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
