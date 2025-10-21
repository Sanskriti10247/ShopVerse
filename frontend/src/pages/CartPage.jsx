import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, removeFromCart } from "../redux/slices/cartSlice";
import api from "../utils/api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CartPage() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [clientSecret, setClientSecret] = useState(null);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => (document.body.style.overflowX = "auto");
  }, []);

  const handleQtyChange = (item, type) => {
    const currentQty = item.qty || 1;

    if (type === "inc") {
      if (currentQty < item.countInStock) {
        dispatch(addToCart({ ...item, qty: currentQty + 1, product: item.product }));
      } else {
        toast.warn(`⚠️ Only ${item.countInStock} items in stock!`, {
          position: "bottom-right",
          autoClose: 2500,
        });
      }
    } else if (type === "dec" && currentQty > 1) {
      dispatch(addToCart({ ...item, qty: currentQty - 1, product: item.product }));
    } else if (type === "dec" && currentQty === 1) {
      dispatch(removeFromCart(item.product));
    }
  };

  const handleCheckout = async () => {
    try {
      const { data: order } = await api.post("/orders", {
        orderItems: cartItems.map((item) => ({
          ...item,
          qty: item.qty || 1,
          product: item._id,
        })),
        shippingAddress: {
          address: "123 Test Street",
          city: "Delhi",
          postalCode: "110001",
          country: "India",
        },
        paymentMethod: "Stripe",
        itemsPrice: total,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: total,
      });

      const { data } = await api.post(`/orders/${order._id}/pay`);
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Checkout failed");
    }
  };

  if (clientSecret) {
    return (
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
        <div className="max-w-3xl mx-auto p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            Secure Payment
          </h2>
          <EmbeddedCheckout />
        </div>
      </EmbeddedCheckoutProvider>
    );
  }

  if (cartItems.length === 0)
    return (
      <div className="text-center mt-10 px-4">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Your cart is empty 🛒
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Add some items to get started.
        </p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 bg-gray-50 min-h-screen overflow-x-hidden">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center sm:text-left">
        Shopping Cart
      </h2>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.product}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 sm:pb-5 gap-4 sm:gap-6"
          >
            <div className="flex items-start sm:items-center gap-4 w-full">
              <img
                src={
                  item.image ||
                  "https://res.cloudinary.com/dh1llydjj/image/upload/v1728912922/default-placeholder.jpg"
                }
                alt={item.name}
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-md object-cover flex-shrink-0"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-base sm:text-lg text-gray-900 break-words">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-2">
                  ${item.price.toFixed(2)}
                </p>

                <div className="flex items-center mt-1 sm:mt-2 space-x-3">
                  <button
                    onClick={() => handleQtyChange(item, "dec")}
                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-lg"
                  >
                    ➖
                  </button>

                  <span className="text-lg font-medium w-6 text-center">
                    {item.qty || 1}
                  </span>

                  <button
                    onClick={() => handleQtyChange(item, "inc")}
                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-lg"
                  >
                    ➕
                  </button>
                </div>

                {item.qty >= item.countInStock && (
                  <p className="text-sm text-red-500 mt-1">
                    Only {item.countInStock} left in stock!
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between sm:justify-end w-full sm:w-auto">
              <button
                onClick={() => dispatch(removeFromCart(item.product))}
                className="text-red-500 hover:text-red-700 text-sm sm:text-base"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 sm:mt-10 border-t pt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">
          Total: <span className="text-blue-600">${total.toFixed(2)}</span>
        </h3>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={() => dispatch(clearCart())}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm sm:text-base"
          >
            Clear Cart
          </button>
          <button
            onClick={handleCheckout}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm sm:text-base"
          >
            Checkout with Stripe
          </button>
        </div>
      </div>
    </div>
  );
}
