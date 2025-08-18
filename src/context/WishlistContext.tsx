import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Product } from "../data/products";
import { toast } from "sonner";

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [items, setItems] = useState<Product[]>(() => {
    const savedItems = localStorage.getItem("wishlist");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: Product) => {
    setItems((prevItems) => {
      const isAlreadyInWishlist = prevItems.some(item => item.id === product.id);
      
      if (isAlreadyInWishlist) {
        toast.info("Product already in wishlist");
        return prevItems;
      } else {
        toast.success("Added to wishlist");
        return [...prevItems, product];
      }
    });
  };

  const removeFromWishlist = (productId: string) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter(item => item.id !== productId);
      toast.info("Removed from wishlist");
      return newItems;
    });
  };

  const isInWishlist = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
    toast.info("Wishlist cleared");
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};