import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-yellow-200 via-orange-400 to-yellow-100 px-6 py-12 font-comic"
      style={{ fontFamily: `"Comic Neue", "Comic Sans MS", cursive` }}
    >
      <h1 className="text-5xl sm:text-7xl font-extrabold text-red-700 leading-tight tracking-wider">
        The Best Pizza <br />
        <span className="text-black">Straight from the Oven</span>
        <br />
        <span className="text-green-700">Straight to You!</span>
      </h1>

      <p className="mt-6 text-lg sm:text-2xl text-gray-900 font-semibold italic bg-yellow-300 border-4 border-black rounded-2xl px-8 py-3">
        "Hot, cheesy & made with love — every single slice! ❤️"
      </p>

      <Link
        to="/menu"
        className="mt-10 bg-red-600 hover:bg-red-700 text-yellow-100 font-extrabold border-4 border-black rounded-full px-10 py-4 text-xl transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        Explore the Menu 🍕
      </Link>
    </section>
  );
}

export default Home;
