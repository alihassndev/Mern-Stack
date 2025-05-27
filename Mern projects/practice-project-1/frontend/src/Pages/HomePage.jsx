import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/product";
import EditProductModal from "../components/EditProductModal";

const HomePage = () => {
  // 1️⃣  Zustand store
  const { fetchProducts, products, updateProduct } = useProductStore();

  // 2️⃣  Local UI state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [editProduct, setEditProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  /* ─────────────────────────────────────────────────────────────── */
  /*  Fetch products once on mount                                  */
  /* ─────────────────────────────────────────────────────────────── */
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /* ─────────────────────────────────────────────────────────────── */
  /*  Handlers                                                      */
  /* ─────────────────────────────────────────────────────────────── */
  const handleEditClick = (product) => {
    setEditProductId(product._id);
    setEditProduct({
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    if (!editProductId) return;

    const res = await updateProduct(editProductId, editProduct);

    if (res.success) {
      alert("✅ Product updated!");
      setIsModalOpen(false);
    } else {
      alert("❌ " + res.message);
    }
  };

  /* ─────────────────────────────────────────────────────────────── */
  /*  Render                                                        */
  /* ─────────────────────────────────────────────────────────────── */
  return (
    <div className="pt-16 min-h-screen flex flex-col items-center bg-gray-50 px-4">
      <h1 className="font-bold text-3xl text-blue-700 mb-6">
        Current Products
      </h1>

      {products && products.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-xl shadow-md w-80"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <div className="mt-4">
                <p className="text-xl font-semibold text-gray-800">
                  {product.name}
                </p>
                <p className="text-gray-600">PKR&nbsp;{product.price}</p>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => handleEditClick(product)}
                  className="px-4 py-2 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                >
                  Edit
                </button>
                <button className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="my-5 text-lg">
          No products found.&nbsp;
          <a
            className="text-blue-600 hover:text-blue-400 underline"
            href="/create"
          >
            Create Product
          </a>
        </p>
      )}

      {/* ───────────────── Modal ───────────────── */}
      <EditProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editProduct}
        onChange={handleInputChange}
        onSave={handleSaveChanges}
      />
    </div>
  );
};

export default HomePage;
