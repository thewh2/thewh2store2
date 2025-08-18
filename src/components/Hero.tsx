
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-brand-50 to-accent1-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 max-w-lg animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Welcome to The WH2 Store 
              <span className="bg-gradient-to-r from-brand-600 to-accent1-500 bg-clip-text text-transparent"> – Your Digital Marketplace</span>
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Discover premium digital products from Nepali creators. Software, e-books, courses, templates, music, and videos - all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-brand-600 hover:bg-brand-700 text-white rounded-lg px-6 py-3 text-base">
                <Link to="/shop" className="flex items-center gap-2">
                  Explore Products <ArrowRight size={16} />
                </Link>
              </Button>
              <Button variant="outline" className="border-brand-600 text-brand-600 hover:bg-brand-50 dark:border-brand-400 dark:text-brand-400 dark:hover:bg-gray-800 rounded-lg px-6 py-3 text-base">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 animate-slide-in">
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 transform rotate-3">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                  alt="Digital Products Showcase"
                  className="rounded-lg w-full h-64 object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 transform -rotate-6">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                  alt="Software Development"
                  className="rounded-lg w-32 h-32 object-cover"
                />
              </div>
              <div className="absolute -top-8 -right-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 transform rotate-6">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                  alt="Digital Learning"
                  className="rounded-lg w-40 h-28 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
