
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getRelatedProducts, formatPrice } from "../data/products";
import ProductCard from "../components/ProductCard";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, Shield, Clock, Award } from "lucide-react";
import { toast } from "sonner";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
        <p className="mb-8">The service you are looking for doesn't exist.</p>
        <Link to="/shop">
          <Button>Return to Shop</Button>
        </Link>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.category, product.id);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} × ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    // Navigate to checkout
    window.location.href = "/cart";
  };

  const handleAddToWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const packageOptions = [
    { name: "Basic", quantity: 1, price: product.price },
    { name: "Standard", quantity: 3, price: Math.round(product.price * 2.5) },
    { name: "Premium", quantity: 5, price: Math.round(product.price * 4) }
  ];

  const [selectedPackage, setSelectedPackage] = useState(0);

  const selectPackage = (index: number) => {
    setSelectedPackage(index);
    setQuantity(packageOptions[index].quantity);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="text-sm mb-6 text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400">Home</Link> {" / "}
          <Link to="/shop" className="hover:text-brand-600 dark:hover:text-brand-400">Shop</Link> {" / "}
          <span className="text-gray-700 dark:text-gray-300">{product.name}</span>
        </div>

        {/* Product Information */}
        <div className="glass rounded-xl shadow-md overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="p-6">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6 flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : i < product.rating
                          ? "text-yellow-400 fill-yellow-400 opacity-50"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {formatPrice(packageOptions[selectedPackage].price)}
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {product.description}
              </p>

              {/* Package Options */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Choose a Package:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {packageOptions.map((pkg, index) => (
                    <div
                      key={pkg.name}
                      className={`border ${
                        selectedPackage === index
                          ? "border-brand-600 bg-brand-50 dark:bg-brand-900/20" 
                          : "border-gray-200 dark:border-gray-700"
                      } rounded-lg p-4 cursor-pointer transition-colors`}
                      onClick={() => selectPackage(index)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{pkg.name}</h4>
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                          {index === 0 ? "👋 Basic" : index === 1 ? "🔥 Popular" : "⭐ Best Value"}
                        </span>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                        {index === 0 
                          ? `${pkg.quantity}× quantity` 
                          : index === 1 
                            ? `${pkg.quantity}× quantity (16% off)` 
                            : `${pkg.quantity}× quantity (20% off)`}
                      </p>
                      <p className="font-bold">{formatPrice(pkg.price)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-gray-700 dark:text-gray-300">Quantity:</span>
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md">
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-1 text-gray-800 dark:text-gray-200 border-x border-gray-300 dark:border-gray-700">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Secure Payment</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Fast Delivery</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-amber-600 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Quality Guaranteed</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
                <Button
                  onClick={handleAddToCart}
                  className="bg-brand-600 hover:bg-brand-700 text-white flex-1 py-6"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="bg-accent hover:bg-accent/90 text-white flex-1 py-6"
                >
                  Buy Now
                </Button>
              </div>

              {/* Wishlist and Share */}
              <div className="flex space-x-4">
                 <Button
                   variant="outline"
                   onClick={handleAddToWishlist}
                   className={`flex items-center border-gray-300 dark:border-gray-700 ${
                     isInWishlist(product.id)
                       ? "text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                       : "text-gray-700 dark:text-gray-300"
                   }`}
                 >
                   <Heart className={`mr-2 h-4 w-4 ${
                     isInWishlist(product.id) ? "fill-red-600" : ""
                   }`} /> 
                   {isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                 </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="flex items-center text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700"
                >
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "description"
                    ? "border-b-2 border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("details")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "details"
                    ? "border-b-2 border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "reviews"
                    ? "border-b-2 border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                Reviews ({product.reviews})
              </button>
            </div>

            <div className="p-6">
              {activeTab === "description" && (
                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                  <p>{product.fullDescription}</p>
                </div>
              )}

              {activeTab === "details" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Service Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glass p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Service Type</p>
                      <p className="text-gray-800 dark:text-gray-200 capitalize">
                        {product.category}
                      </p>
                    </div>
                    <div className="glass p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Delivery Time</p>
                      <p className="text-gray-800 dark:text-gray-200">24-48 Hours</p>
                    </div>
                    <div className="glass p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Support Included</p>
                      <p className="text-gray-800 dark:text-gray-200">30 Days</p>
                    </div>
                    <div className="glass p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Quality</p>
                      <p className="text-gray-800 dark:text-gray-200">Premium</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Customer Reviews
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 h-10 w-10 rounded-full flex items-center justify-center font-semibold mr-4">
                        RK
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-white mr-2">
                            Ram Kumar
                          </h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < 5
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                          Excellent service! The delivery was even faster than promised. I got real engagement and my account grew significantly.
                        </p>
                        <p className="text-gray-500 dark:text-gray-500 text-xs">
                          Posted 3 days ago
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 h-10 w-10 rounded-full flex items-center justify-center font-semibold mr-4">
                        SP
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-white mr-2">
                            Sita Poudel
                          </h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < 4
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                          Very happy with my purchase. The engagement looks very natural and I've already seen an increase in organic reach.
                        </p>
                        <p className="text-gray-500 dark:text-gray-500 text-xs">
                          Posted 1 week ago
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button variant="outline">
                        Read All Reviews
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Related Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
