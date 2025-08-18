
import React from "react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";
import { Trash, Plus, Minus, Heart } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ 
  id, 
  name, 
  price, 
  image, 
  quantity
}) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleSaveForLater = () => {
    // In a real implementation, this would save to a wishlist
    toast.success(`${name} saved to wishlist`);
  };

  return (
    <motion.div 
      className="py-4 flex flex-col sm:flex-row animate-fade-in"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      layout
      transition={{ duration: 0.3 }}
    >
      <div className="sm:w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 sm:ml-4 mt-4 sm:mt-0">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900 dark:text-white">
              <a href={`/product/${id}`} className="hover:text-brand-600 dark:hover:text-brand-400">
                {name}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {formatPrice(price)}
            </p>
            <p className="mt-1 text-xs text-green-600 dark:text-green-400">
              Estimated delivery: 24-48 hours
            </p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => updateQuantity(id, quantity - 1)}
              className="p-1 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-3 py-1 text-gray-800 dark:text-gray-200">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(id, quantity + 1)}
              className="p-1 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Total: {formatPrice(price * quantity)}
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleSaveForLater}
              className="text-brand-500 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 flex items-center"
              aria-label="Save for later"
            >
              <Heart className="h-4 w-4 mr-1" />
              <span className="text-xs hidden sm:inline">Save</span>
            </button>
            <button
              onClick={() => removeFromCart(id)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Remove item"
            >
              <Trash className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
