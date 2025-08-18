
import React from "react";
import { Link } from "react-router-dom";
import { Category } from "../data/products";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/shop?category=${category.id}`} className="block">
      <div className="category-card flex flex-col items-center justify-center text-center backdrop-blur-md bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
        <span className="text-4xl mb-4">{category.icon}</span>
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
          {category.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {category.description}
        </p>
        <span className="text-xs bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 px-2 py-1 rounded-full">
          {category.count} services
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
