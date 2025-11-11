import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/order/${query.trim()}`);
    setQuery("");
  }

  return (
    <div className="relative w-full">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
          />
        </svg>
      </span>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          placeholder="Search for your order..."
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:border-yellow-500 focus:bg-white placeholder:text-gray-400 transition-all duration-200"
        />
      </form>

      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 transition"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
