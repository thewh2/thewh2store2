
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../data/products";

interface EnhancedSearchProps {
  products: Product[];
  placeholder?: string;
}

const EnhancedSearch: React.FC<EnhancedSearchProps> = ({ 
  products,
  placeholder = "Search for services..."
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  // Search logic - updated to be more responsive
  useEffect(() => {
    if (searchTerm.length < 1) {
      setResults([]);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filteredResults = products.filter(product => 
      product.name.toLowerCase().includes(term) || 
      product.description.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
    
    setResults(filteredResults.slice(0, 5)); // Limit to top 5 results
  }, [searchTerm, products]);
  
  const handleFocus = () => {
    setIsActive(true);
  };
  
  const clearSearch = () => {
    setSearchTerm("");
    setResults([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
      setIsActive(false);
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSubmit}>
        <div className={`
          flex items-center bg-white dark:bg-gray-800 rounded-lg border 
          transition-all duration-300 px-3 py-2
          ${isActive ? 'border-brand-500 shadow-md' : 'border-gray-300 dark:border-gray-600'}
        `}>
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleFocus}
            className="flex-1 ml-2 bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
          />
          {searchTerm && (
            <button 
              type="button"
              onClick={clearSearch}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
      
      <AnimatePresence>
        {isActive && results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="p-1">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={() => setIsActive(false)}
                  className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-10 w-10 object-cover rounded-md"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="p-2 border-t border-gray-200 dark:border-gray-700">
              <Link
                to={`/shop?search=${encodeURIComponent(searchTerm)}`}
                onClick={() => setIsActive(false)}
                className="block text-center text-sm text-brand-600 dark:text-brand-400 hover:underline"
              >
                View all results
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedSearch;
