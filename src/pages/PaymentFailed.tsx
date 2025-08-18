import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XCircle, ArrowLeft, RefreshCw, HelpCircle } from "lucide-react";

const PaymentFailed: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // You can extract failure reason from URL params if needed
    console.log("Payment failed, current location:", location);
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-6"
          >
            <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            We couldn't process your payment. Please try again or use a different payment method.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">What happened?</h2>
              
              <div className="space-y-3 mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Your payment could not be processed due to one of the following reasons:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 ml-4">
                  <li>Payment was cancelled by user</li>
                  <li>Insufficient funds in your account</li>
                  <li>Network connectivity issues</li>
                  <li>Payment gateway timeout</li>
                  <li>Invalid payment credentials</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => navigate("/checkout")} 
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/cart")}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <HelpCircle className="w-5 h-5 mr-2" />
                Need Help?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <h4 className="font-semibold mb-2">Contact Support</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Get help from our customer service team
                  </p>
                  <Button variant="outline" size="sm" onClick={() => navigate("/contact")}>
                    Contact Us
                  </Button>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <h4 className="font-semibold mb-2">Alternative Payment</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Try using Cash on Delivery instead
                  </p>
                  <Button variant="outline" size="sm" onClick={() => navigate("/checkout")}>
                    Use COD
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentFailed;