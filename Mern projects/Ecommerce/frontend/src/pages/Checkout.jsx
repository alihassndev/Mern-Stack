import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createOrder } from "../store/slices/orderSlice";
import { clearCart } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Checkout() {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrder = async () => {
    try {
      await dispatch(createOrder({ address })).unwrap();
      dispatch(clearCart());
      toast.success("Order placed!");
      navigate("/orders");
    } catch {
      toast.error("Order failed");
    }
  };

  if (!items.length) return <div className="py-8">Your cart is empty.</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Shipping Address</label>
        <input
          type="text"
          className="input-field"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
        />
      </div>
      <div className="mb-4">
        <span className="font-bold">Total: ${totalAmount}</span>
      </div>
      <button className="btn-primary" onClick={handleOrder}>
        Place Order
      </button>
    </div>
  );
}
