import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity: initialQty, totalPrice } = item;
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(initialQty);
  const dispatch = useDispatch();

  const handleIncrease = () => {
    setQuantity((q) => q + 1);
    dispatch(increaseItemQuantity(pizzaId));
  };
  const handleDecrease = () => {
    setQuantity((q) => q - 1);
    dispatch(decreaseItemQuantity(pizzaId));
  };
  const handleDone = () => setIsEditing(false);

  return (
    <li
      className="flex flex-col justify-between gap-4 bg-[#fff6d9] border-[3px] border-black rounded-2xl px-6 py-4 my-3 shadow-[6px_6px_0_#000] hover:-translate-y-1 hover:translate-x-1 transition-transform duration-200 max-w-4xl mx-auto"
      style={{ fontFamily: '"Comic Neue", "Comic Sans MS", cursive' }}
    >
      <div className="flex flex-row justify-between items-center gap-2 sm:gap-4">
        <p className="text-gray-900 font-extrabold text-base sm:text-lg flex items-center gap-2">
          <span className="text-2xl">🍕</span> {quantity}× {name}
        </p>
        <p className="font-black text-[#e63946] text-lg sm:text-xl drop-shadow-[2px_2px_0_#000]">
          ${totalPrice.toFixed(2)}
        </p>
      </div>

      {!isEditing ? (
        <div className="mt-3 sm:mt-0 flex items-center gap-3 justify-center sm:justify-end">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-[#ffcc29] hover:bg-[#ffe478] text-black border-[3px] border-black font-extrabold py-2 px-4 rounded-2xl shadow-[3px_3px_0_#000] transition-transform hover:-translate-y-[2px] hover:translate-x-[2px]"
          >
            ✏️ Edit
          </button>

          <button
            onClick={() => dispatch(deleteItem(pizzaId))}
            className="bg-[#e63946] hover:bg-[#c12f3b] text-yellow-100 border-[3px] border-black font-extrabold py-2 px-4 rounded-2xl shadow-[3px_3px_0_#000] transition-transform hover:-translate-y-[2px] hover:translate-x-[2px]"
          >
            🗑️ Delete
          </button>
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-center gap-4 flex-wrap sm:flex-nowrap">
          <div className="w-full sm:w-auto flex items-center justify-center gap-6 bg-yellow-200 border-4 border-black rounded-full py-1 px-6 shadow-[3px_3px_0_#000]">
            <button
              onClick={handleDecrease}
              className="text-red-700 text-3xl font-extrabold hover:scale-125 transition-transform"
            >
              −
            </button>
            <span className="font-black text-2xl text-gray-900 min-w-[35px] text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="text-green-700 text-3xl font-extrabold hover:scale-125 transition-transform"
            >
              +
            </button>
          </div>

          <button
            onClick={handleDone}
            className="bg-emerald-600 text-white border-[3px] border-black font-extrabold py-2 px-5 rounded-2xl shadow-[3px_3px_0_#000] hover:bg-emerald-700 active:scale-95 transition-transform"
          >
            ✅ Done
          </button>
        </div>
      )}
    </li>
  );
}

export default CartItem;
