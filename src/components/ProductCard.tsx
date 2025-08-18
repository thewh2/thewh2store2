
import React from "react";
import { Link } from "react-router-dom";
import { Product, formatPrice } from "../data/products";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="product-card group backdrop-blur-md bg-white/70 dark:bg-gray-800/70 border border-white/20 dark:border-gray-700/20 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <button 
            onClick={handleWishlistClick}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            <Heart className={`h-4 w-4 transition-colors ${
              isInWishlist(product.id) 
                ? "text-red-500 fill-red-500" 
                : "text-gray-600 dark:text-gray-400 hover:text-red-500"
            }`} />
          </button>
        </div>
        {product.trending && (
          <span className="absolute top-2 left-2 bg-accent/80 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full">
            Trending
          </span>
        )}
      </div>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg mb-1 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : i < product.rating
                    ? "text-yellow-400 fill-yellow-400 opacity-50"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
            ({product.reviews})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-900 dark:text-gray-100">
            {formatPrice(product.price)}
          </span>
          <Link
            to={`/product/${product.id}`}
            className="bg-brand-600/90 backdrop-blur-md hover:bg-brand-700 text-white p-2 rounded-full transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
