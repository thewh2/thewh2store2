
import React, { useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface Review {
  id: string;
  user: string;
  initials: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductDetailTabsProps {
  description: string;
  fullDescription: string;
  category: string;
  rating: number;
  reviews: number;
}

const ProductDetailTabs: React.FC<ProductDetailTabsProps> = ({
  description,
  fullDescription,
  category,
  rating,
  reviews,
}) => {
  const [activeTab, setActiveTab] = useState("description");
  
  const mockReviews: Review[] = [
    {
      id: "1",
      user: "Ram Kumar",
      initials: "RK",
      rating: 5,
      comment: "Excellent service! The delivery was even faster than promised. I got real engagement and my account grew significantly.",
      date: "3 days ago"
    },
    {
      id: "2",
      user: "Sita Poudel",
      initials: "SP",
      rating: 4,
      comment: "Very happy with my purchase. The engagement looks very natural and I've already seen an increase in organic reach.",
      date: "1 week ago"
    },
    {
      id: "3",
      user: "Anish Sharma",
      initials: "AS",
      rating: 5,
      comment: "Great service and amazing customer support. I'll definitely purchase again!",
      date: "2 weeks ago"
    }
  ];

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700">
      <div className="flex overflow-x-auto">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-6 py-4 text-sm font-medium ${
            activeTab === "description"
              ? "border-b-2 border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("details")}
          className={`px-6 py-4 text-sm font-medium ${
            activeTab === "details"
              ? "border-b-2 border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Details
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-6 py-4 text-sm font-medium ${
            activeTab === "reviews"
              ? "border-b-2 border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Reviews ({reviews})
        </button>
        <button
          onClick={() => setActiveTab("faq")}
          className={`px-6 py-4 text-sm font-medium ${
            activeTab === "faq"
              ? "border-b-2 border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          FAQ
        </button>
      </div>

      <div className="p-6">
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          variants={tabVariants}
        >
          {activeTab === "description" && (
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              <p>{fullDescription}</p>
              <p className="mt-4">Our service guarantees authentic engagement that helps grow your online presence organically. We use proven methods that don't violate platform terms of service.</p>
            </div>
          )}

          {activeTab === "details" && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Service Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass p-4 rounded-lg transition-all hover:shadow-md">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Service Type</p>
                  <p className="text-gray-800 dark:text-gray-200 capitalize">
                    {category}
                  </p>
                </div>
                <div className="glass p-4 rounded-lg transition-all hover:shadow-md">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Delivery Time</p>
                  <p className="text-gray-800 dark:text-gray-200">24-48 Hours</p>
                </div>
                <div className="glass p-4 rounded-lg transition-all hover:shadow-md">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Support Included</p>
                  <p className="text-gray-800 dark:text-gray-200">30 Days</p>
                </div>
                <div className="glass p-4 rounded-lg transition-all hover:shadow-md">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Quality</p>
                  <p className="text-gray-800 dark:text-gray-200">Premium</p>
                </div>
                <div className="glass p-4 rounded-lg transition-all hover:shadow-md">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Retention Rate</p>
                  <p className="text-gray-800 dark:text-gray-200">98%</p>
                </div>
                <div className="glass p-4 rounded-lg transition-all hover:shadow-md">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Cancel Anytime</p>
                  <p className="text-gray-800 dark:text-gray-200">Yes</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Customer Reviews
              </h3>
              <div className="space-y-6">
                {mockReviews.map((review) => (
                  <motion.div 
                    key={review.id} 
                    className="flex items-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 h-10 w-10 rounded-full flex items-center justify-center font-semibold mr-4">
                      {review.initials}
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-white mr-2">
                          {review.user}
                        </h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                        {review.comment}
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-xs">
                        Posted {review.date}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-4">
                  <button className="btn-primary w-full sm:w-auto">
                    Read All Reviews
                  </button>
                  <button className="btn-secondary w-full sm:w-auto">
                    Write a Review
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "faq" && (
            <div className="space-y-4">
              <div className="glass rounded-lg p-4 hover:shadow-md transition-all">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">How soon will I see results?</h4>
                <p className="text-gray-600 dark:text-gray-400">Our services typically begin delivering within 24-48 hours after your purchase is confirmed. You'll see gradual growth to ensure it looks natural.</p>
              </div>
              <div className="glass rounded-lg p-4 hover:shadow-md transition-all">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Is this service compliant with platform rules?</h4>
                <p className="text-gray-600 dark:text-gray-400">Yes, our services use ethical practices that comply with platform guidelines. We never ask for your password or use bots.</p>
              </div>
              <div className="glass rounded-lg p-4 hover:shadow-md transition-all">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Do you offer refunds?</h4>
                <p className="text-gray-600 dark:text-gray-400">If our service doesn't deliver as promised, we offer a 100% money-back guarantee. Simply contact our support team within 7 days of purchase.</p>
              </div>
              <div className="glass rounded-lg p-4 hover:shadow-md transition-all">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Do you need my account password?</h4>
                <p className="text-gray-600 dark:text-gray-400">No, we never require your password. We only need your public profile URL to deliver our services.</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailTabs;
