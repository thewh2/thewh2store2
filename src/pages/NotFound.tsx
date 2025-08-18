
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ShoppingCart, Search } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <div className="bg-gradient-to-r from-brand-600 to-accent1-500 bg-clip-text text-transparent text-2xl md:text-3xl font-bold mb-6">
          Page Not Found
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
          The page you are looking for doesn't exist or has been moved to another location.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/">
            <Button className="bg-brand-600 hover:bg-brand-700 w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" /> Go to Homepage
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="outline" className="w-full sm:w-auto">
              <ShoppingCart className="mr-2 h-4 w-4" /> Browse Products
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="ghost" className="w-full sm:w-auto">
              <Search className="mr-2 h-4 w-4" /> Help & Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
