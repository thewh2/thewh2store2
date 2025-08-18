
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { categories, products, Product } from "../data/products";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Filter } from "lucide-react";
import EnhancedSearch from "../components/EnhancedSearch";

const Shop: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  const searchParam = queryParams.get("search");
  
  const [searchQuery, setSearchQuery] = useState(searchParam || "");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [selectedSort, setSelectedSort] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
    
    // Update URL with search query
    const params = new URLSearchParams(location.search);
    if (searchQuery.trim()) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    
    navigate({
      pathname: location.pathname,
      search: params.toString()
    });
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    
    const params = new URLSearchParams(location.search);
    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }
    
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    
    navigate({
      pathname: location.pathname,
      search: params.toString()
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);
    const newPriceRange = [...priceRange] as [number, number];
    newPriceRange[index] = newValue;
    setPriceRange(newPriceRange);
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply price filter
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (selectedSort) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
        break;
    }

    setFilteredProducts(filtered);
  };

  // Initialize with search param from URL
  useEffect(() => {
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParam]);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedSort, priceRange, searchQuery]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Digital Services
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Boost your online presence with our range of premium digital services
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <form onSubmit={handleSearch} className="relative mr-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search services"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500 w-full md:w-auto"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
              <Button type="submit" className="hidden">Search</Button>
            </form>
            <Button
              variant="outline"
              onClick={toggleFilters}
              className="md:hidden flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className={`md:w-1/4 lg:w-1/5 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="glass rounded-lg shadow-sm sticky top-24 p-6">
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
                <div className="space-y-2">
                  <div
                    className={`cursor-pointer px-3 py-2 rounded-md ${
                      selectedCategory === null
                        ? "bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => handleCategoryChange(null)}
                  >
                    All Services
                  </div>
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={`cursor-pointer px-3 py-2 rounded-md ${
                        selectedCategory === category.id
                          ? "bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Rs. {priceRange[0]}</span>
                    <span>Rs. {priceRange[1]}</span>
                  </div>
                  <div className="flex space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                      className="w-full accent-brand-600"
                    />
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="w-full accent-brand-600"
                    />
                  </div>
                </div>
              </div>

              {/* Sort Filter */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sort By</h3>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:w-3/4 lg:w-4/5">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="glass rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No services found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <Button onClick={() => {
                  setSearchQuery("");
                  handleCategoryChange(null);
                  setSelectedSort("featured");
                  setPriceRange([0, 5000]);
                }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
