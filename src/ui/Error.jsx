import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();

  if (error) console.error("Route Error:", error);

  const isRouteError = isRouteErrorResponse(error);

  const title = isRouteError
    ? `${error.status} ${error.statusText || "Error"}`
    : "Oops! We burned the page 😅";

  const description = isRouteError
    ? (error.data && (error.data.message || error.data)) ||
      "Something went wrong."
    : error?.message ||
      "The page you're looking for got lost in the oven... or maybe eaten by someone hungry! 🍽️";

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-yellow-100 via-orange-200 to-red-200 text-center px-4">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-red-700 mb-4">
        {title}
      </h1>

      <p className="text-gray-800 text-lg sm:text-xl mb-8 max-w-md leading-relaxed">
        {description}
      </p>

      <button
        onClick={() => navigate(-1)}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
      >
        ← Go Back Before It Gets Cold!
      </button>

      <p className="mt-6 text-sm text-gray-700 italic">
        (Or head back to the menu for a fresh slice 🍕)
      </p>
    </div>
  );
}

export default NotFound;
