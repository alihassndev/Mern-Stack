import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "../store/slices/orderSlice";

export default function OrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentOrder, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  if (loading || !currentOrder) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="bg-white rounded shadow p-4">
        <p>
          <strong>Order ID:</strong> {currentOrder._id}
        </p>
        <p>
          <strong>Status:</strong> {currentOrder.status}
        </p>
        <p>
          <strong>Total:</strong> ${currentOrder.totalAmount}
        </p>
        <p>
          <strong>Address:</strong> {currentOrder.address}
        </p>
        <h2 className="font-bold mt-4 mb-2">Items</h2>
        <ul>
          {currentOrder.items.map((item) => (
            <li key={item.product._id}>
              {item.product.name} x {item.quantity} (${item.product.price})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
