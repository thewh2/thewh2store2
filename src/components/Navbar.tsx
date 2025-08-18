
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  User, 
  Menu, 
  Sun, 
  Moon,
  Heart
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import EnhancedSearch from "./EnhancedSearch";
import { products } from "../data/products";

const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-accent1-500 bg-clip-text text-transparent">
              WH2 Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              Shop
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              Contact
            </Link>
          </div>

          {/* Search, Cart, Account */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="w-64">
              <EnhancedSearch products={products} placeholder="Search products..." />
            </div>

            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="text-gray-700 dark:text-gray-200"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative">
              <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-200">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-200">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent1-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Account */}
            <Link to="/account">
              <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-200">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Search */}
            <div className="w-full max-w-xs mr-2">
              <EnhancedSearch products={products} placeholder="Search..." />
            </div>
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-200">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent1-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 dark:text-gray-200 py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/shop" className="text-gray-700 dark:text-gray-200 py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md" onClick={() => setIsMenuOpen(false)}>
                Shop
              </Link>
              <Link to="/about" className="text-gray-700 dark:text-gray-200 py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="text-gray-700 dark:text-gray-200 py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <Link to="/account" className="text-gray-700 dark:text-gray-200 py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md" onClick={() => setIsMenuOpen(false)}>
                My Account
              </Link>
              <Link to="/wishlist" className="text-gray-700 dark:text-gray-200 py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md" onClick={() => setIsMenuOpen(false)}>
                Wishlist
              </Link>
              <div className="flex items-center justify-between py-2 px-3">
                <span className="text-gray-700 dark:text-gray-200">Theme</span>
                <Button variant="ghost" size="sm" onClick={toggleTheme}>
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
