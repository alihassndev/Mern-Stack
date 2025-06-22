import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Breadcrumb from "../components/Breadcrumb";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  TrendingUp,
  Award,
  Truck,
  Shield,
  Sparkles,
  Zap,
  Clock,
  Package,
} from "lucide-react";

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = [...new Set(products.map((product) => product.category))];

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === "" || product.category === categoryFilter)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.ratings || 0) - (a.ratings || 0);
        case "newest":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Shipping",
      description: "Free shipping on orders over $50",
      color: "text-blue-600",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Payment",
      description: "100% secure payment processing",
      color: "text-green-600",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Quality Guarantee",
      description: "30-day money back guarantee",
      color: "text-purple-600",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "Same day shipping available",
      color: "text-orange-600",
    },
  ];

  const stats = [
    {
      label: "Products",
      value: products.length,
      icon: <Package className="w-5 h-5" />,
    },
    {
      label: "Categories",
      value: categories.length,
      icon: <Grid className="w-5 h-5" />,
    },
    {
      label: "Happy Customers",
      value: "10K+",
      icon: <Star className="w-5 h-5" />,
    },
    {
      label: "Fast Delivery",
      value: "24h",
      icon: <Clock className="w-5 h-5" />,
    },
  ];

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[length:60px_60px]"></div>

        <div className="container mx-auto relative z-10 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              <span className="text-yellow-300 font-semibold">
                Premium Shopping Experience
              </span>
            </div>

            <h1 className="text-display-1 mb-6 text-white">
              Discover Amazing
              <span className="block text-yellow-300">Products</span>
            </h1>

            <p className="text-body-large mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Shop the latest trends with confidence. We offer premium quality
              products with exceptional customer service and fast delivery.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-lg bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <TrendingUp className="w-5 h-5" />
                Shop Now
              </button>
              <button className="btn btn-lg btn-ghost border-2 border-white text-white hover:bg-white hover:text-blue-600 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-blue-600">{stat.icon}</div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-body text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience with
              premium products and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card card-elevated text-center group">
                <div className="p-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className={feature.color}>{feature.icon}</div>
                  </div>
                  <h3 className="text-heading-3 text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-body-small text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto">
          <Breadcrumb />

          {/* Filters and Search */}
          <div className="card card-elevated mb-8">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 input focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="input min-w-[200px]"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">
                    Sort:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input min-w-[180px]"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {/* View Mode */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-white shadow-md"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-white shadow-md"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <p className="text-body text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredProducts.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900">
                  {products.length}
                </span>{" "}
                products
              </p>
              {searchTerm && (
                <span className="badge badge-primary">
                  Search: "{searchTerm}"
                </span>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {error ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-red-600 text-2xl">⚠️</span>
              </div>
              <h3 className="text-heading-3 text-gray-900 mb-4">
                Error Loading Products
              </h3>
              <p className="text-body text-gray-600 mb-8">{error}</p>
              <button
                onClick={() => dispatch(fetchProducts())}
                className="btn btn-primary"
              >
                Try Again
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-heading-3 text-gray-900 mb-4">
                No products found
              </h3>
              <p className="text-body text-gray-600 mb-8 max-w-md mx-auto">
                {searchTerm || categoryFilter
                  ? "Try adjusting your search or filter criteria to find what you're looking for."
                  : "No products available at the moment. Please check back later."}
              </p>
              {(searchTerm || categoryFilter) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("");
                  }}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
