import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  updateAddress,
  updateName,
  updatePhone,
  updatePosition,
  updateGeocodedAddress,
} from "../features/user/userSlice";
import { getPosition } from "../utilites/helpers";
import { getAddress } from "../services/apiGeocoding";

function CreateAccount() {
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
  });
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData({
      name: user.userName || "",
      phone: user.phone || "",
      location: user.address || user.geocodedAddress || "",
    });
  }, [user.userName, user.phone, user.address, user.geocodedAddress]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  /**
   * Handle geolocation request and reverse geocoding
   * Gets user's current position, stores it in Redux, and prefills address
   */
  async function handleUseCurrentLocation() {
    setIsGettingLocation(true);

    try {
      // Show loading toast
      const loadingToast = toast.loading("Getting your location...", {
        position: "top-center",
      });

      // Get user's current position
      const position = await getPosition();

      // Store position in Redux
      dispatch(updatePosition(position));

      // Reverse geocode to get address
      const address = await getAddress(position);

      // Update Redux with geocoded address
      dispatch(updateGeocodedAddress(address));

      // Prefill the location input
      setFormData((prev) => ({
        ...prev,
        location: address,
      }));

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success("Location detected! Address prefilled.", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#10b981",
          color: "#fff",
        },
      });
    } catch (error) {
      // Handle different error cases
      let errorMessage = error.message || "Failed to get location";

      toast.error(errorMessage, {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#dc2626",
          color: "#fff",
        },
      });

      // If permission denied, provide helpful message
      if (errorMessage.includes("denied")) {
        console.log("User denied location access. Manual entry required.");
      }
    } finally {
      setIsGettingLocation(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name) return;

    // Update Redux store with form data
    dispatch(updateName(formData.name));
    dispatch(updateAddress(formData.location));
    dispatch(updatePhone(formData.phone));

    // Prepare user data for localStorage (include location if available)
    const userData = {
      userName: formData.name,
      phone: formData.phone,
      address: formData.location,
      latitude: user.latitude,
      longitude: user.longitude,
      geocodedAddress: user.geocodedAddress,
    };

    console.log("Saving user data:", userData);
    try {
      localStorage.setItem("user", JSON.stringify(userData));
    } catch {
      // ignore storage errors
    }

    setTimeout(() => {
      navigate("/menu", { replace: true });
    }, 400);
  }

  return (
    <section className="min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-60px)] flex items-center justify-center bg-gradient-to-b from-yellow-100 via-orange-200 to-red-200 px-4 py-10">
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur rounded-2xl shadow-[6px_6px_0_#000] border-4 border-black p-6 sm:p-10">
        <div className="mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-red-600 tracking-wide">
            Your Details
          </h1>
          <p className="mt-2 text-gray-700">
            We’ll deliver faster with accurate info.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Jane Pizza Lover"
                className="w-full rounded-xl border-2 border-gray-300 focus:border-red-500 focus:outline-none px-3 py-2 transition"
                aria-label="Full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-800 mb-1"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                required
                placeholder="(555) 123-4567"
                className="w-full rounded-xl border-2 border-gray-300 focus:border-red-500 focus:outline-none px-3 py-2 transition"
                aria-label="Phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="location"
                className="text-sm font-semibold text-gray-800"
              >
                Location
              </label>
            </div>
            <textarea
              id="location"
              name="location"
              required
              rows={4}
              placeholder="123 Pizza Street, Slice City, 12345"
              className="w-full rounded-xl border-2 border-gray-300 focus:border-red-500 focus:outline-none px-3 py-2 transition resize-y"
              aria-label="Location"
              value={formData.location}
              onChange={handleChange}
            />
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="mt-1 text-sm text-gray-600">
                Include apartment, floor, or nearby landmarks for faster
                delivery.
              </p>
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={isGettingLocation}
                className="inline-flex items-center my-2 sm:my-0 gap-2 rounded-full border border-red-600 text-red-600 bg-white hover:bg-red-50 px-3 text-xs font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Use current location"
              >
                {isGettingLocation ? (
                  <>
                    <span className="animate-spin">⏳</span> Getting location...
                  </>
                ) : (
                  <>📍 Use Current Location</>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-extrabold rounded-full py-3 border-2 border-black shadow-[3px_3px_0_#000] transition-transform duration-150 hover:scale-[1.03] focus:scale-[1.02]"
            aria-label="Save details"
          >
            Save Details
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreateAccount;
