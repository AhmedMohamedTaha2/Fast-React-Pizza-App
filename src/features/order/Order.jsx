import React from "react";
import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant.js";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utilites/helpers.js";

function Order() {
  const { order } = useLoaderData();
  const {
    id,
    status = "Preparing",
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <section
      className="min-h-screen bg-gradient-to-b from-yellow-100 via-orange-400 to-yellow-100 py-10 px-6 sm:px-10 flex flex-col items-center font-comic"
      style={{ fontFamily: `"Comic Neue", "Comic Sans MS", cursive` }}
    >
      <h1 className="text-4xl sm:text-5xl font-extrabold text-red-700 drop-shadow-[3px_3px_0_#000] mb-10">
        🍕 Order Summary
      </h1>

      <div className="bg-yellow-50 border-4 border-black rounded-3xl shadow-[6px_6px_0_#000] p-6 sm:p-10 w-full max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 drop-shadow-[1px_1px_0_#000]">
            Order #{id}
          </h2>

          <div className="flex justify-center items-center gap-4 flex-wrap">
            {priority && (
              <span className="bg-red-600 text-yellow-100 border-2 border-black px-4 py-1 rounded-full font-black shadow-[2px_2px_0_#000] text-sm sm:text-base">
                🔥 Priority Order
              </span>
            )}
            <span className="bg-green-300 border-2 border-black px-4 py-1 rounded-full font-black text-sm sm:text-base shadow-[2px_2px_0_#000]">
              {status}
            </span>
          </div>
        </div>

        <div className="bg-white border-2 border-black rounded-2xl p-4 mb-6 shadow-[2px_2px_0_#000] text-gray-800">
          <p className="text-lg sm:text-xl font-bold mb-1">
            {deliveryIn >= 0
              ? `🚴‍♂️ Only ${deliveryIn} minutes left!`
              : "✅ Order should have arrived!"}
          </p>
          <p className="text-sm sm:text-base italic">
            (Estimated delivery: {formatDate(estimatedDelivery)})
          </p>
        </div>

        <div className="bg-yellow-100 border-2 border-black rounded-2xl p-4 mb-6 shadow-[2px_2px_0_#000]">
          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3 drop-shadow-[1px_1px_0_#000]">
            🍽️ Your Pizzas
          </h3>
          <ul className="divide-y-[3px] divide-black">
            {cart.map((item) => (
              <li
                key={item.pizzaId}
                className="py-3 flex justify-between items-center text-lg sm:text-xl font-semibold"
              >
                <span className="text-gray-900">
                  {item.quantity}× {item.name}
                </span>
                <span className="text-red-700 drop-shadow-[1px_1px_0_#000]">
                  {formatCurrency(item.totalPrice)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-4 border-black rounded-2xl p-6 shadow-[3px_3px_0_#000]">
          <p className="font-bold text-lg sm:text-xl mb-1 text-gray-800">
            🍕 Pizza Total:{" "}
            <span className="text-red-700">{formatCurrency(orderPrice)}</span>
          </p>
          {priority && (
            <p className="font-bold text-lg sm:text-xl mb-1 text-gray-800">
              ⚡ Priority Fee:{" "}
              <span className="text-red-700">
                {formatCurrency(priorityPrice)}
              </span>
            </p>
          )}
          <p className="font-black text-2xl sm:text-3xl text-gray-900 mt-4">
            💰 Total Due:{" "}
            <span className="text-red-700 drop-shadow-[2px_2px_0_#000]">
              {formatCurrency(orderPrice + (priority ? priorityPrice : 0))}
            </span>
          </p>
        </div>
      </div>

      <p className="mt-10 italic text-gray-700 text-sm sm:text-base">
        “Your pizza is on its way — stay cheesy! 🧀”
      </p>
    </section>
  );
}

export async function Loader({ params }) {
  const { id: orderId } = params;
  try {
    const order = await getOrder(orderId);
    return { order };
  } catch (error) {
    throw error;
  }
}

export default Order;
