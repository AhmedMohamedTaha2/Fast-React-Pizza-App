import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./ui/Home";
import Login from "./ui/Login";
import CreateAccount from "./ui/CreateAccount";
import Menu, { Loader as menuLoader } from "./features/menu/Menu";
import NotFound from "./ui/Error";
import Offers from "./ui/Offers";
import Locations from "./ui/Locations";
import AboutUs from "./ui/AboutUs";
import Order, { Loader as OrderLoader } from "./features/order/Order";
import CreateOrder, {
  action as CreateOrderAction,
} from "./features/order/CreateOrder";
import OrderItem from "./features/order/OrderItem";
import AppLayout from "./ui/AppLayout";
import LoadingSpinner from "./ui/LoadingSpinner";
import Cart from "./features/cart/Cart";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/menu", element: <Menu />, loader: menuLoader },
        { path: "/login", element: <CreateAccount /> },
        { path: "/create-account", element: <CreateAccount /> },
        { path: "/offers", element: <Offers /> },
        { path: "/locations", element: <Locations /> },
        { path: "/about", element: <AboutUs /> },
        { path: "/order", element: <Order /> },
        { path: "/cart", element: <Cart /> },
        {
          path: "/order/new",
          element: <CreateOrder />,
          action: CreateOrderAction,
        },
        { path: "/order/:id", element: <Order />, loader: OrderLoader },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  { future: { v7_startTransition: true } }
);

function App() {
  return (
    <div className="container-fluid">
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
