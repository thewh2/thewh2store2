
import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import { categories, getFeaturedProducts, getTrendingProducts } from "../data/products";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Award, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Feedback {
  id: string;
  customer_name: string;
  description: string;
  rating: number;
  created_at: string;
}

const Home: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const trendingProducts = getTrendingProducts();
  const [customerFeedback, setCustomerFeedback] = useState<Feedback[]>([]);

  useEffect(() => {
    fetchLatestFeedback();
  }, []);

  const fetchLatestFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) {
        console.error('Error fetching feedback:', error);
        return;
      }
      
      if (data) {
        setCustomerFeedback(data);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Trust Badges */}
      <section className="py-8 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center p-4">
              <div className="bg-brand-50 dark:bg-brand-900/30 p-3 rounded-full mb-3">
                <Shield className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="font-semibold mb-1">Safe & Secure</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Guaranteed service delivery or money back</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-brand-50 dark:bg-brand-900/30 p-3 rounded-full mb-3">
                <Clock className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="font-semibold mb-1">Fast Delivery</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Services delivered within 24-48 hours</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-brand-50 dark:bg-brand-900/30 p-3 rounded-full mb-3">
                <Award className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="font-semibold mb-1">Premium Quality</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">High-quality services from trusted providers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Our Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Boost your digital presence with our comprehensive range of social media and marketing services
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Featured Services
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Our most popular digital services for your online growth
              </p>
            </div>
            <Link to="/shop">
              <Button variant="ghost" className="mt-4 sm:mt-0">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Getting your social media growth is simple with us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 relative">
              <div className="bg-brand-100 dark:bg-brand-900/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-600 dark:text-brand-400 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose a Service</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse our selection of digital services and select what you need
              </p>
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ArrowRight className="h-8 w-8 text-gray-300 dark:text-gray-700" />
              </div>
            </div>
            <div className="text-center p-6 relative">
              <div className="bg-brand-100 dark:bg-brand-900/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-600 dark:text-brand-400 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Payment</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Pay securely using our trusted payment methods
              </p>
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ArrowRight className="h-8 w-8 text-gray-300 dark:text-gray-700" />
              </div>
            </div>
            <div className="text-center p-6">
              <div className="bg-brand-100 dark:bg-brand-900/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-600 dark:text-brand-400 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">See Results</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Watch your social media metrics grow as we deliver the service
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Trending Services
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Most popular services among our customers
              </p>
            </div>
            <Link to="/shop">
              <Button variant="ghost" className="mt-4 sm:mt-0">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Don't just take our word for it - see what our customers have achieved
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerFeedback.length > 0 ? (
              customerFeedback.map((feedback) => (
                <div key={feedback.id} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="bg-brand-100 dark:bg-brand-900/50 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <span className="font-bold text-brand-600 dark:text-brand-400">
                        {feedback.customer_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{feedback.customer_name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Verified Customer</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                    "{feedback.description}"
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < (feedback.rating || 0)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No customer reviews yet. Be the first to leave feedback!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Banner for Offers */}
      <section className="py-12 bg-gradient-to-r from-brand-600 to-accent1-500 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">
                Special Launch Offer!
              </h2>
              <p className="text-lg mb-6 text-white/90">
                Get 25% off on all services for a limited time. Use code{" "}
                <span className="font-bold">LAUNCH25</span> at checkout.
              </p>
              <Link to="/shop">
                <Button variant="secondary" size="lg" className="bg-white text-brand-600 hover:bg-gray-100">
                  Explore Services
                </Button>
              </Link>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl transform rotate-3">
                <p className="text-5xl font-bold">25% OFF</p>
                <p className="text-xl">Limited Time Offer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
