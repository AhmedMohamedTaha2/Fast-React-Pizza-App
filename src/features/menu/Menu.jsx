import React from "react";
import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import FoodCard from "./FoodCard";

function Menu() {
  const menu = useLoaderData();

  return (
    <section className="min-h-screen bg-amber-100/55 py-8 px-4 sm:px-8 text-center mx-0">
      <div className="mb-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-red-700 mb-2 tracking-wide mx-0">
          Our Delicious Menu
        </h2>
        <p className="text-gray-800 text-lg sm:text-xl italic font-medium">
          “Fresh, cheesy & made with love — straight from the oven! ❤️”
        </p>
      </div>

      <div
        className="
          flex flex-wrap justify-around sm:gap-1
          bg-amber-200/55
           border-4 border-black rounded-xl shadow-2xl
          p-6 sm:p-6 overflow-y-auto max-h-[75vh]
          scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-emerald-950
          custom-scrollbar
        "
      >
        {menu.map((pizza) => (
          <FoodCard key={pizza.id} pizza={pizza} />
        ))}
      </div>

      <p className="mt-10 text-gray-700 italic text-sm">
        Can’t decide? Order one of each! 😋
      </p>
    </section>
  );
}

export async function Loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
