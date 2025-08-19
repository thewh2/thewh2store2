
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          About The WH2 Store
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1683721003111-070bcc053d8b" 
                alt="About The WH2 Store" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Your Digital Marketplace in Nepal
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The WH2 Store is a digital marketplace offering social media growth services, SEO solutions, and online marketing tools designed to help creators, businesses, and brands expand their digital presence. We believe in making online growth simple, effective, and accessible to everyone.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Founded by The WH2, our mission is to deliver fast, secure, and reliable digital services with a strong focus on quality and customer satisfaction. Whether it’s boosting followers, increasing engagement, or driving traffic, we provide the tools you need to succeed online.
              </p>
              <div>
                <Link to="/shop">
                  <Button className="bg-brand-600 hover:bg-brand-700">
                    Explore Our Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Diverse Selection
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                From software and e-books to courses, templates, music, and videos - we curate high-quality digital products for our customers.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Secure Transactions
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We partner with trusted payment gateways like eSewa to ensure all transactions are secure and convenient for our Nepali customers.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Instant Delivery
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                After purchase, your digital products are instantly available for download - no waiting, no shipping delays.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d" 
                alt="Team Member" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Chandan Thakur
                </h3>
                <p className="text-sm text-brand-600 dark:text-brand-400 mb-3">Founder & CEO</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Digital entrepreneur with a passion for connecting Nepali creators with global opportunities.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
                alt="Team Member" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Priya Khadka
                </h3>
                <p className="text-sm text-brand-600 dark:text-brand-400 mb-3">Head of Operations</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Expert in digital product management with over 8 years of experience in e-commerce.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" 
                alt="Team Member" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Anish Thapa
                </h3>
                <p className="text-sm text-brand-600 dark:text-brand-400 mb-3">Technical Director</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Full-stack developer specializing in e-commerce platforms and payment integrations.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-brand-600 text-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            Whether you're a creator looking to sell your digital products or a customer seeking quality digital goods, The WH2 Store is the perfect marketplace for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/shop">
              <Button variant="secondary" className="bg-white text-brand-600 hover:bg-gray-100">
                Shop Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="bg-white text-brand-600 hover:bg-purple-500">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
