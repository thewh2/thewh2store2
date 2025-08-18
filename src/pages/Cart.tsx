
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";
import { Button } from "@/components/ui/button";
import { Trash, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import CartItem from "../components/CartItem";

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, applyCoupon, couponDiscount, activeCoupon } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleApplyCoupon = () => {
    if (couponCode.trim() === "") {
      toast.error("Please enter a coupon code");
      return;
    }
    
    setIsApplyingCoupon(true);
    
    // Simulate API call delay
    setTimeout(() => {
      applyCoupon?.(couponCode);
      setIsApplyingCoupon(false);
    }, 800);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  const discount = couponDiscount ? (subtotal * (couponDiscount || 0)) / 100 : 0;

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <div className="glass rounded-xl shadow-md p-8 max-w-md mx-auto">
          <motion.div 
            className="flex flex-col items-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="h-10 w-10 text-gray-500 dark:text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/shop">
              <Button className="bg-brand-600 hover:bg-brand-700 animate-pulse">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-50 dark:bg-gray-900 py-8"
    >
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Your Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div 
              className="glass rounded-xl shadow-md overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Cart Items ({totalItems})
                </h2>
                <AnimatePresence>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {items.map((item) => (
                      <CartItem 
                        key={item.product.id} 
                        id={item.product.id}
                        name={item.product.name}
                        price={item.product.price}
                        image={item.product.image}
                        quantity={item.quantity}
                      />
                    ))}
                  </div>
                </AnimatePresence>
              </div>
            </motion.div>
            
            {/* Delivery Options */}
            <motion.div 
              className="glass rounded-xl shadow-md overflow-hidden mt-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Delivery Options
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50">
                    <input 
                      type="radio" 
                      id="delivery-standard" 
                      name="delivery" 
                      className="h-4 w-4 text-brand-600"
                      defaultChecked
                    />
                    <label htmlFor="delivery-standard" className="ml-3 flex justify-between items-center w-full">
                      <span>Standard Delivery (24-48 hours)</span>
                      <span className="font-medium">Free</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50">
                    <input 
                      type="radio" 
                      id="delivery-express" 
                      name="delivery" 
                      className="h-4 w-4 text-brand-600" 
                    />
                    <label htmlFor="delivery-express" className="ml-3 flex justify-between items-center w-full">
                      <span>Express Delivery (12 hours)</span>
                      <span className="font-medium">+$5.00</span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div 
              className="glass rounded-xl shadow-md overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Discount ({couponDiscount}%)</span>
                      <span>- {formatPrice(discount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax</span>
                    <span>{formatPrice(0)}</span>
                  </div>
                  <div className="h-px bg-gray-200 dark:bg-gray-700 my-3"></div>
                  <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={!!activeCoupon || isApplyingCoupon}
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                    <Button 
                      variant="outline" 
                      onClick={handleApplyCoupon}
                      disabled={!!activeCoupon || isApplyingCoupon}
                    >
                      {isApplyingCoupon ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Applying
                        </span>
                      ) : "Apply"}
                    </Button>
                  </div>
                  {activeCoupon && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 text-xs text-green-600 dark:text-green-400 flex justify-between"
                    >
                      <span>Coupon {activeCoupon} applied</span>
                      <button
                        onClick={() => {
                          applyCoupon?.(null);
                          setCouponCode("");
                          toast.info("Coupon removed");
                        }}
                        className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        Remove
                      </button>
                    </motion.div>
                  )}
                </div>

                <Link to="/checkout">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white py-6">
                      Checkout <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>

                <div className="mt-4 text-center">
                  <Link
                    to="/shop"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    Continue Shopping
                  </Link>
                </div>
                
                {/* Payment Security Information */}
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Secure Checkout</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    We protect your payment information using encryption to provide bank-level security.
                  </p>
                  <div className="flex justify-between">
                    <img src="https://cdn.esewa.com.np/ui/images/esewa_logo.png" alt="eSewa" className="h-5" />
                    <img src="https://khalti.com/static/official-logo-color.0f24ec7079e4.svg" alt="Khalti" className="h-5" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe" className="h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
