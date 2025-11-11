import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchOrder from "../features/order/SearchOrder";

export default function Header() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const cartQuntity = useSelector((state) => state.cart.cart.length);
  const userName = useSelector((state) => state.user.userName);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = () => {
      if (mq.matches) setShowMenu(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <header className="bg-white border-b-4 border-black shadow-[3px_3px_0_#000] sticky top-0 z-50">
      <div className="mx-auto flex justify-between items-center px-6 py-4 lg:px-12 lg:py-5">
        <Link
          to="/"
          className="text-2xl lg:text-3xl font-extrabold text-red-700 hover:text-red-800 transition"
          style={{ fontFamily: `"Comic Neue", "Comic Sans MS", cursive` }}
        >
          Fast React Pizza
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-lg font-bold text-gray-800">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 underline underline-offset-4"
                : "hover:text-red-600 transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/menu"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 underline underline-offset-4"
                : "hover:text-red-600 transition"
            }
          >
            Menu
          </NavLink>

          <NavLink
            to="/offers"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 underline underline-offset-4"
                : "hover:text-red-600 transition"
            }
          >
            Offers
          </NavLink>

          <NavLink
            to="/locations"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 underline underline-offset-4"
                : "hover:text-red-600 transition"
            }
          >
            Locations
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 underline underline-offset-4"
                : "hover:text-red-600 transition"
            }
          >
            About Us
          </NavLink>
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden md:block w-64">
            <SearchOrder />
          </div>

          <Link
            to="/cart"
            className="relative border-2 border-black p-2 rounded-full bg-yellow-300 hover:bg-yellow-400 transition shadow-[2px_2px_0_#000]"
          >
            🛒
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
              {cartQuntity}
            </span>
          </Link>

          {user ? (
            <p className="font-bold text-gray-800 hidden sm:block">
              👋 {user.name}
            </p>
          ) : (
            <button
              className="bg-black text-yellow-200 border-2 border-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-200 hover:text-black transition shadow-[2px_2px_0_#000] hidden sm:block"
              onClick={() => navigate("/create-account")}
            >
              {userName || " Enter Your Info."}
            </button>
          )}

          <button
            className="md:hidden border-2 border-black p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setShowMenu((prev) => !prev)}
            aria-label="Toggle menu"
          >
            🍔
          </button>
        </div>
      </div>

      {showMenu && (
        <div className="fixed inset-0 bg-yellow-100 border-t-4 border-black p-6 flex flex-col items-center justify-start z-40 animate-fadeIn">
          <button
            className="self-end border-2 border-black rounded-full px-3 py-1 mb-6 text-lg font-bold bg-red-600 text-white hover:bg-red-700 shadow-[2px_2px_0_#000]"
            onClick={() => setShowMenu(false)}
          >
            ✕
          </button>

          <nav className="flex flex-col items-center gap-6 text-2xl font-bold text-gray-800">
            <NavLink to="/" onClick={() => setShowMenu(false)}>
              Home
            </NavLink>
            <NavLink to="/menu" onClick={() => setShowMenu(false)}>
              Menu
            </NavLink>
            <NavLink to="/offers" onClick={() => setShowMenu(false)}>
              Offers
            </NavLink>
            <NavLink to="/locations" onClick={() => setShowMenu(false)}>
              Locations
            </NavLink>
            <NavLink to="/about" onClick={() => setShowMenu(false)}>
              About Us
            </NavLink>

            <div className="mt-8 w-full max-w-sm">
              <SearchOrder />
            </div>

            {user ? (
              <p className="mt-4 text-lg font-bold text-gray-700">
                👋 {user.name}
              </p>
            ) : (
              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate("/create-account");
                }}
                className="mt-6 bg-black text-yellow-200 border-2 border-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-200 hover:text-black transition shadow-[3px_3px_0_#000]"
              >
                {userName || " Enter Your Info."}
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
