import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      navigate("/menu");
    }, 400);
  }

  return (
    <section className="min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-60px)] flex items-center justify-center bg-gradient-to-b from-yellow-100 via-orange-200 to-red-200 px-4 py-10">
      <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-2xl shadow-[6px_6px_0_#000] border-4 border-black p-6 sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-red-600 tracking-wide">
            Fast React Pizza
          </h1>
          <p className="mt-2 text-gray-700">
            Welcome back! Sign in to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border-2 border-gray-300 focus:border-red-500 focus:outline-none px-3 py-2 transition"
              aria-label="Email address"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-lg border-2 border-gray-300 focus:border-red-500 focus:outline-none px-3 py-2 transition"
              aria-label="Password"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-red-600" />
              <span className="text-gray-700">Remember me</span>
            </label>
            <button type="button" className="text-red-600 hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-extrabold rounded-full py-3 border-2 border-black shadow-[3px_3px_0_#000] transition-transform duration-150 hover:scale-[1.03] focus:scale-[1.02]"
            aria-label="Sign in"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 flex items-center gap-2 text-sm text-gray-700">
          <span className="h-px flex-1 bg-gray-300" />
          or
          <span className="h-px flex-1 bg-gray-300" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            className="border-2 border-black rounded-lg py-2 bg-white hover:bg-gray-50 shadow-[2px_2px_0_#000] transition"
            aria-label="Sign in with Google"
          >
            Google
          </button>
          <button
            className="border-2 border-black rounded-lg py-2 bg-white hover:bg-gray-50 shadow-[2px_2px_0_#000] transition"
            aria-label="Sign in with Github"
          >
            GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-700">
          New here?{" "}
          <Link
            to="/create-account"
            className="font-semibold text-red-600 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
