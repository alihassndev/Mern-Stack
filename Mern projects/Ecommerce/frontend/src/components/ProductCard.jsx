import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, Eye, TrendingUp } from "lucide-react";

export default function ProductCard({ product }) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  const isNew =
    new Date(product.createdAt) >
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="product-card group">
      {/* Image Container */}
      <div className="product-card-image relative">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="product-card-overlay"></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && <span className="badge badge-primary">New</span>}
          {hasDiscount && (
            <span className="badge badge-danger">-{discountPercentage}%</span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="badge badge-warning">Low Stock</span>
          )}
          {product.stock === 0 && (
            <span className="badge badge-secondary">Out of Stock</span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
          <Link
            to={`/product/${product._id}`}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </Link>
        </div>

        {/* Add to Cart Button */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button className="w-full bg-white text-gray-900 py-2 px-4 rounded-xl font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {product.category}
          </span>
          {product.stock > 0 && (
            <span className="text-xs text-gray-400">
              {product.stock} in stock
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">{renderStars(product.ratings || 0)}</div>
          <span className="text-xs text-gray-500">
            ({product.numOfReviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-gray-900">
            ${product.price}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        {/* Action Button */}
        <Link
          to={`/product/${product._id}`}
          className="w-full btn btn-primary flex items-center justify-center gap-2 group-hover:shadow-lg transition-all duration-300"
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </Link>
      </div>
    </div>
  );
}
