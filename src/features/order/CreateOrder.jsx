import { useEffect, useState } from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";

const isValidPhone = (str) =>
  /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,3}?\)?[-.\s]?){0,4}\d{4,9}$/.test(str);

const notifySuccess = () => {
  toast.success("Order placed successfully!");
};

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const storeUser = useSelector(selectUser);
  const navigate = useNavigate();
  const [user, setUser] = useState({ userName: "", phone: "", address: "" });
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();

  useEffect(() => {
    if (!storeUser.userName || !storeUser.phone || !storeUser.address) {
      toast.error("Please enter your information before placing an order!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#dc2626",
          color: "#fff",
        },
      });
      navigate("/create-account", { replace: true });
    }
  }, [storeUser, navigate]);

  useEffect(() => {
    setUser({
      userName: storeUser.userName || "",
      phone: storeUser.phone || "",
      address: storeUser.address || "",
    });
  }, [storeUser.userName, storeUser.phone, storeUser.address]);

  // Get location data from Redux store for order submission
  const userLocation = {
    latitude: storeUser.latitude,
    longitude: storeUser.longitude,
  };

  function handleUserChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  const cartFromStore = useSelector((state) => state.cart.cart);
  const cart = cartFromStore || [];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-100 via-orange-400 to-yellow-100 p-8">
      <div className="bg-amber-100 border-4 border-black rounded-3xl shadow-[8px_8px_0px_#000] p-8 w-full max-w-md">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-red-700 mb-6 text-center drop-shadow-md">
          🍕 Ready to order? Let’s go!
        </h2>

        <Form method="POST" className="space-y-5">
          <div className="text-left">
            <label className="block text-lg font-semibold text-black mb-2">
              First Name
            </label>
            <input
              type="text"
              name="userName"
              value={user.userName}
              required
              className="w-full bg-amber-50 border-2 border-black rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-red-400 shadow-[4px_4px_0px_#000]"
              placeholder="Your name here 🍴"
              onChange={handleUserChange}
            />
            <input type="hidden" name="customer" value={user.userName} />
          </div>

          <div className="text-left">
            <label className="block text-lg font-semibold text-black mb-2">
              Phone number
            </label>
            <input
              type="tel"
              value={user.phone}
              name="phone"
              required
              className="w-full bg-amber-50 border-2 border-black rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-red-400 shadow-[4px_4px_0px_#000]"
              placeholder="+20 123 456 789"
              onChange={handleUserChange}
            />
            {formErrors?.phone && (
              <p className="font-bold text-red-600 mt-1">{formErrors.phone}</p>
            )}
          </div>

          <div className="text-left">
            <label className="block text-lg font-semibold text-black mb-2">
              Address
            </label>
            <input
              type="text"
              value={user.address}
              name="address"
              required
              className="w-full border-2 bg-amber-50 border-black rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-red-400 shadow-[4px_4px_0px_#000]"
              placeholder="Your pizza’s destination 🏠"
              onChange={handleUserChange}
            />
          </div>

          <div className="flex items-center gap-3 text-left bg-yellow-200 border-2 border-black rounded-xl p-3 shadow-[3px_3px_0px_#000]">
            <input
              type="checkbox"
              name="priority"
              id="priority"
              checked={withPriority}
              onChange={(e) => setWithPriority(e.target.checked)}
              className="h-5 w-5 accent-red-600 border-2 border-black cursor-pointer"
            />
            <label
              htmlFor="priority"
              className="font-semibold text-black text-base cursor-pointer"
            >
              Give my pizza 🛵 a turbo boost! (Priority order)
            </label>
          </div>

          <Link
            to="/create-account"
            className="w-full inline-block text-center bg-red-600 text-white text-xl font-bold py-3 rounded-xl border-4 border-black shadow-[5px_5px_0px_#000]"
          >
            Back to Menu
          </Link>

          <button
            type="submit"
            className="w-full bg-red-600 text-white text-xl font-bold py-3 rounded-xl border-4 border-black shadow-[5px_5px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing order..." : "Order Now 🚀"}
          </button>

          <input type="hidden" name="cart" value={JSON.stringify(cart)} />

          {/* Include location data if available */}
          {userLocation.latitude && userLocation.longitude && (
            <>
              <input
                type="hidden"
                name="latitude"
                value={userLocation.latitude}
              />
              <input
                type="hidden"
                name="longitude"
                value={userLocation.longitude}
              />
            </>
          )}
        </Form>

        <p className="text-center text-gray-800 text-sm italic mt-6">
          Warning: extreme cheesiness ahead! 🧀
        </p>
      </div>
    </section>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  const customer = (data.customer || "").toString().trim();
  const phone = (data.phone || "").toString().trim();
  const address = (data.address || "").toString().trim();

  // Extract location data if available
  const latitude = data.latitude ? Number(data.latitude) : null;
  const longitude = data.longitude ? Number(data.longitude) : null;

  let parsedCart = [];
  try {
    parsedCart = JSON.parse(data.cart || "[]");
  } catch {
    parsedCart = [];
  }

  let mappedCart = Array.isArray(parsedCart)
    ? parsedCart.map((i) => {
        const pizzaId = Number(i.pizzaId ?? i.id);
        const name = (i.name ?? "").toString();
        const quantity = Number(i.quantity ?? 1);
        const unitPrice = Number(i.unitPrice ?? 0);
        const computedTotal = Number.isFinite(Number(i.totalPrice))
          ? Number(i.totalPrice)
          : quantity * unitPrice;
        const totalPrice = Number(computedTotal);
        return { pizzaId, name, quantity, unitPrice, totalPrice };
      })
    : [];

  mappedCart = mappedCart.filter(
    (i) =>
      Number.isFinite(i.pizzaId) &&
      i.pizzaId > 0 &&
      Number.isFinite(i.quantity) &&
      i.quantity > 0 &&
      Number.isFinite(i.unitPrice) &&
      i.unitPrice >= 0 &&
      Number.isFinite(i.totalPrice) &&
      i.totalPrice >= 0
  );

  const errors = {};

  if (!customer) errors.customer = "Please enter your name.";
  if (!address) errors.address = "Please enter a delivery address.";
  if (!isValidPhone(phone))
    errors.phone =
      "Please enter a valid phone number, We need it to contact you about your order!";
  if (mappedCart.length === 0) errors.cart = "Your cart is empty.";

  const orderPrice = mappedCart.reduce(
    (sum, it) => sum + Number(it.totalPrice || 0),
    0
  );
  if (!Number.isFinite(orderPrice) || orderPrice < 0)
    errors.orderPrice = "Invalid order price computed.";

  // Build order object with location data if available
  // API expects latitude and longitude as separate top-level fields
  const order = {
    customer,
    phone,
    address,
    cart: mappedCart,
    priority: data.priority === "on",
    orderPrice,
    ...(latitude &&
      longitude && {
        latitude,
        longitude,
      }),
  };

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  notifySuccess();
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
