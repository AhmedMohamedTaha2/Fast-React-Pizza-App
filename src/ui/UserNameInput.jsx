import React from "react";

function UserNameInput({ value, onChange }) {
  return (
    <div className="mt-8 w-full max-w-md">
      <label htmlFor="username" className="sr-only">
        Your name
      </label>
      <input
        id="username"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your name..."
        aria-label="Enter your name"
        className="w-full rounded-xl border-2 border-gray-300 bg-white/90 px-4 py-3 text-gray-900 placeholder-gray-500 shadow focus:border-red-500 focus:outline-none focus:ring-0"
      />
    </div>
  );
}

export default UserNameInput;
