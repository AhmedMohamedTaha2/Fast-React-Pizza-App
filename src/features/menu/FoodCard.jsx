import React, { useState } from "react";
import { addItem } from "../cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../user/userSlice";
import toast from "react-hot-toast";

function FoodCard({ pizza }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { name, unitPrice, imageUrl, ingredients, soldOut } = pizza;

  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    setIsInCart(true);
    // addItem({ ...pizza, quantity });
    console.log("Added to cart:", { ...pizza, quantity });
  };

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const handleAddPizzaToCart = () => {
    // Check if user info exists before adding to cart
    if (!user.userName || !user.phone || !user.address) {
      toast.error("Please enter your information before ordering!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#dc2626",
          color: "#fff",
        },
      });
      navigate("/create-account", { replace: true });
      return;
    }

    const NewPizzaItem = {
      pizzaId: pizza.id,
      name: pizza.name,
      unitPrice: pizza.unitPrice,
      quantity: quantity,
    };
    dispatch(addItem(NewPizzaItem));
    // console.log("Updated cart with:", NewPizzaItem);
    toast.success(`${quantity} x ${name} added to cart! 🍕`, {
      duration: 2000,
      position: "top-center",
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <div
      className={`w-full my-5 sm:max-w-full md:w-4/9 lg:max-w-md  flex flex-col border-[5px] border-black rounded-3xl 
      bg-white shadow-[6px_6px_0_#000] overflow-hidden 
      transform transition-transform duration-300 hover:scale-105 
      hover:shadow-[10px_10px_0_#000] ${soldOut ? "grayscale" : ""} font-comic`}
      style={{
        fontFamily: `"Comic Neue", "Comic Sans MS", cursive`,
      }}
    >
      {/* Image Section */}
      <div className="relative w-full aspect-[4/3] border-b-4 border-black">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-84 object-cover"
          loading="lazy"
        />
        {soldOut && (
          <span className="absolute top-3 right-3 bg-black text-yellow-300 text-sm px-4 py-1 rounded-full font-bold shadow-md border-2 border-yellow-300">
            SOLD OUT 💀
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between flex-grow p-5">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-extrabold text-gray-900 text-xl sm:text-2xl leading-tight">
              {name}
            </h3>
            {!soldOut && (
              <span className="bg-green-300 text-black border-2 border-black rounded-lg text-xs sm:text-sm px-3 py-1 font-bold shadow-[2px_2px_0_#000]">
                Available
              </span>
            )}
          </div>

          <p className="text-sm sm:text-base text-gray-800 mt-2 font-semibold leading-snug">
            {ingredients?.join(", ")}
          </p>
        </div>

        <div className="mt-5 flex flex-col items-center">
          <p className="font-black text-red-700 text-xl sm:text-2 xl mb-4 drop-shadow-[2px_2px_0_#000] tracking-wider">
            <span className="text-black px-1">price per unit</span>${unitPrice}
          </p>

          {/* Add to Cart / Quantity */}
          {!soldOut && !isInCart ? (
            <button
              onClick={handleAddToCart}
              className="bg-red-600 hover:bg-red-700 text-yellow-100 border-4 border-black 
              font-black py-3 px-8 rounded-full shadow-[3px_3px_0_#000] 
              transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              🍕 ADD TO CART
            </button>
          ) : (
            !soldOut && (
              <div className="flex flex-col justify-center items-center gap-2 w-full">
                <div className=" w-2/3 flex items-center justify-center gap-6 bg-yellow-200 border-4 border-black rounded-full py-1 px-6 shadow-[2px_2px_0_#000]">
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
                  className="  bg-green-600 hover:bg-green-700 text-yellow-100 border-4 border-black 
                  font-black py-2 px-6 rounded-full shadow-[3px_3px_0_#000]
                  transition-transform duration-300 hover:scale-105 active:scale-95 w-2/3"
                  onClick={handleAddPizzaToCart}
                >
                  UPDATE CART
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
