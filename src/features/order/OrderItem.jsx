import React from "react";
import { formatCurrency } from "../../utilites/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li
      className="flex justify-between items-center bg-yellow-100 border-[3px] border-black rounded-2xl shadow-[4px_4px_0_#000] p-4 mb-4 hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_#000] transition-all duration-200 font-comic"
      style={{
        fontFamily: `"Comic Neue", "Comic Sans MS", cursive`,
      }}
    >
      <div className="flex flex-col text-left">
        <p className="text-lg sm:text-xl font-extrabold text-gray-900 leading-tight">
          <span className="text-red-700 drop-shadow-[1px_1px_0_#000]">
            {quantity}×
          </span>{" "}
          {name}
        </p>

        {!isLoadingIngredients && ingredients && (
          <p className="text-sm text-gray-700 italic mt-1">
            {ingredients.join(", ")}
          </p>
        )}

        {isLoadingIngredients && (
          <p className="text-sm text-gray-500 italic mt-1 animate-pulse">
            Loading ingredients...
          </p>
        )}
      </div>

      <div>
        <p className="font-black text-2xl sm:text-3xl text-red-700 drop-shadow-[2px_2px_0_#000]">
          {formatCurrency(totalPrice)}
        </p>
      </div>
    </li>
  );
}

export default OrderItem;
