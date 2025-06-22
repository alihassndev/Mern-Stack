import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import Breadcrumb from "../components/Breadcrumb";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    if (selectedProduct.stock === 0) {
      toast.error("Product is out of stock");
      return;
    }

    dispatch(addToCart({ ...selectedProduct, quantity }));
    toast.success("Added to cart successfully!");
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${
            i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Product Not Found
            </h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <button onClick={() => navigate("/")} className="btn-primary">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedProduct) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb />

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={selectedProduct.images?.[selectedImage]?.url}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Images */}
              {selectedProduct.images && selectedProduct.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {selectedProduct.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-blue-500"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`${selectedProduct.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="badge badge-primary">
                  {selectedProduct.category}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {renderStars(selectedProduct.ratings || 0)}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({selectedProduct.numOfReviews || 0} reviews)
                  </span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="text-3xl font-bold text-gray-900">
                {selectedProduct.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-900">
                  ${selectedProduct.price}
                </span>
                {selectedProduct.originalPrice &&
                  selectedProduct.originalPrice > selectedProduct.price && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ${selectedProduct.originalPrice}
                      </span>
                      <span className="badge badge-success">
                        {Math.round(
                          ((selectedProduct.originalPrice -
                            selectedProduct.price) /
                            selectedProduct.originalPrice) *
                            100
                        )}
                        % OFF
                      </span>
                    </>
                  )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                {selectedProduct.stock > 0 ? (
                  <span className="text-green-600 font-medium">
                    In Stock ({selectedProduct.stock} available)
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-100 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <span className="text-xl">−</span>
                    </button>
                    <span className="px-6 py-3 text-lg font-medium text-gray-900 min-w-[4rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(
                          Math.min(selectedProduct.stock, quantity + 1)
                        )
                      }
                      className="p-3 hover:bg-gray-100 transition-colors"
                      disabled={quantity >= selectedProduct.stock}
                    >
                      <span className="text-xl">+</span>
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {selectedProduct.stock} available
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={selectedProduct.stock === 0}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>
                    {selectedProduct.stock === 0
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </span>
                </button>
                <button className="btn-outline flex items-center justify-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>Quick View</span>
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Specifications */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Specifications
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Category</span>
                <span className="font-medium">{selectedProduct.category}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Stock</span>
                <span className="font-medium">
                  {selectedProduct.stock} units
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Rating</span>
                <span className="font-medium">
                  {selectedProduct.ratings || 0}/5
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Reviews</span>
                <span className="font-medium">
                  {selectedProduct.numOfReviews || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Shipping Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">
                  Free shipping on orders over $50
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">
                  Secure payment processing
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-gray-600">
                  30-day money back guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
