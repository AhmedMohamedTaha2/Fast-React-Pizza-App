import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { clearCart } from "./cartSlice";

function selectCart(state) {
  return state.cart?.cart || [];
}

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const userName = useSelector((state) => state.user.userName) || "Pizza Lover";
  const totalPrice = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#ffe8c2] to-[#fffaf0] px-6 sm:px-10 py-10 flex flex-col items-center"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Link
        to="/menu"
        className="self-start mb-6 text-base sm:text-lg font-extrabold text-[#e63946] hover:text-[#c12f3b] transition-all duration-300 flex items-center gap-2"
      >
        ⬅️ <span className="underline underline-offset-2">Back to menu</span>
      </Link>

      <div className="bg-white border-[6px] border-black rounded-[2rem] shadow-[12px_12px_0_#000] p-8 sm:p-12 w-full max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 drop-shadow-[2px_3px_0_#000] text-center">
          Your Cart, <span className="text-[#e63946]">{userName} 🍕</span>
        </h2>

        {cart.length > 0 ? (
          <>
            <ul className="mt-4">
              {cart.map((item) => (
                <CartItem item={item} key={item.pizzaId} />
              ))}
            </ul>

            <div className="mt-10 bg-[#f4a261] border-[4px] border-black rounded-2xl shadow-[5px_5px_0_#000] px-6 py-4 text-center transform hover:scale-[1.02] transition-all duration-200 max-w-md mx-auto">
              <p className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-[3px_3px_0_#000] ">
                💰 Total:{" "}
                <span className="text-[#ffe478]">${totalPrice.toFixed(2)}</span>
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                to="/order/new"
                className="w-full sm:w-1/2 flex-1 text-center bg-[#e63946] text-white border-[4px] border-black font-extrabold py-3 px-4 shadow-[6px_6px_0_#000] hover:translate-y-[-3px] hover:translate-x-[3px] transition-transform text-lg rounded-2xl"
              >
                🚀 ORDER NOW
              </Link>

              <button
                onClick={() => dispatch(clearCart())}
                className="w-full sm:w-1/2 flex-1 bg-[#ffcc29] hover:bg-[#ffe478] text-black border-[4px] border-black font-extrabold py-3 px-4 rounded-2xl shadow-[6px_6px_0_#000] hover:translate-y-[-3px] hover:translate-x-[3px] transition-transform text-lg"
              >
                🧹 CLEAR CART
              </button>
            </div>
          </>
        ) : (
          <div className="mt-10 text-center">
            <p className="text-gray-800 font-bold text-xl sm:text-2xl mb-6">
              😢 Your cart is still empty!
            </p>
            <Link
              to="/menu"
              className="inline-block bg-[#f4a261] hover:bg-[#e76f51] text-white border-[4px] border-black font-black py-3 px-8 rounded-2xl shadow-[6px_6px_0_#000] transition-transform hover:-translate-y-1 hover:translate-x-1 active:scale-95"
            >
              🍕 Go grab some pizzas!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
