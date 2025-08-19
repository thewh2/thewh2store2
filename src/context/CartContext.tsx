
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { CartContextType, CartItem } from "../types/cart";
import { Product } from "../data/products";
import { toast } from "sonner";

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

// Simple coupon structure
interface Coupon {
  code: string;
  discount: number; // percentage off
}

// Available coupons
const availableCoupons: Coupon[] = [
  { code: "THEWH2", discount: 15 },
  { code: "BHOGI10", discount: 10 },
  { code: "TEJ10", discount: 10 },
];

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedItems = localStorage.getItem("cart");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  
  const [activeCoupon, setActiveCoupon] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);


  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        toast.success("Cart updated successfully");
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success("Product added to cart");
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter(
        (item) => item.product.id !== productId
      );
      toast.info("Product removed from cart");
      return newItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
    toast.success("Quantity updated");
  };

  const clearCart = () => {
    setItems([]);
    setActiveCoupon(null);
    toast.info("Cart cleared");
  };

  const applyCoupon = (code: string | null) => {
    if (code === null) {
      setActiveCoupon(null);
      return true;
    }
    
    const coupon = availableCoupons.find(
      (c) => c.code.toLowerCase() === code.toLowerCase()
    );
    if (coupon) {
      setActiveCoupon(coupon.code);
      toast.success(`Coupon ${coupon.code} applied: ${coupon.discount}% off`);
      return true;
    } else {
      toast.error("Invalid coupon code");
      return false;
    }
  };

  const couponDiscount = activeCoupon
    ? availableCoupons.find((c) => c.code === activeCoupon)?.discount
    : 0;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  const discount = couponDiscount ? (subtotal * couponDiscount) / 100 : 0;
  const totalPrice = subtotal - discount;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        applyCoupon,
        couponDiscount,
        activeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
