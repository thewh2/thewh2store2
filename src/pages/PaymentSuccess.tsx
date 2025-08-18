
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag, ArrowRight, Download } from "lucide-react";
import { formatPrice } from "../data/products";
import { motion } from "framer-motion";

interface LocationState {
  orderId: string;
  amount: number;
  paymentMethod: string;
}

interface EsewaResponse {
  transaction_code: string;
  status: string;
  total_amount: number;
  transaction_uuid: string;
  product_code: string;
  signed_field_names: string;
  signature: string;
}

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState<LocationState | null>(null);

  useEffect(() => {
    // Check if data comes from eSewa redirect
    const esewaData = searchParams.get('data');
    if (esewaData) {
      try {
        // Decode base64 response from eSewa
        const decodedData: EsewaResponse = JSON.parse(atob(esewaData));
        console.log("eSewa Response:", decodedData);
        
        // Verify signature here if needed
        if (decodedData.status === 'COMPLETE') {
          setPaymentData({
            orderId: decodedData.transaction_uuid || 'Unknown',
            amount: parseFloat(decodedData.total_amount.toString()) / 100 || 0, // Convert from paisa to rupees
            paymentMethod: 'eSewa'
          });
        } else {
          // Payment failed, redirect to failure page
          navigate("/payment-failed");
          return;
        }
      } catch (error) {
        console.error("Error parsing eSewa response:", error);
        navigate("/payment-failed");
        return;
      }
    } else if (location.state) {
      // Use state data for other payment methods
      setPaymentData(location.state as LocationState);
    }

    // Redirect if no payment data
    if (!esewaData && !location.state) {
      navigate("/");
    }
  }, [location.state, searchParams, navigate]);

  if (!paymentData) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
        <p>Processing payment...</p>
      </div>
    </div>;
  }

  // Format payment method for display
  const formatPaymentMethod = (method: string): string => {
    switch (method) {
      case "esewa":
        return "eSewa";
      case "khalti":
        return "Khalti";
      case "bank":
        return "Bank Transfer";
      case "cod":
        return "Cash on Delivery";
      default:
        return method;
    }
  };

  // Get current date/time
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          className="glass rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6 sm:p-10">
            <motion.div 
              className="flex flex-col items-center justify-center text-center mb-8"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                Your order has been placed successfully. You will receive a confirmation email shortly.
              </p>
            </motion.div>

            <motion.div 
              className="mb-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5 text-brand-600" />
                Order Summary
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Order ID:</p>
                  <p className="font-medium text-gray-900 dark:text-white">{paymentData.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date:</p>
                  <p className="font-medium text-gray-900 dark:text-white">{currentDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Payment Method:</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formatPaymentMethod(paymentData.paymentMethod)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount:</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formatPrice(paymentData.amount)}</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div className="mb-4 sm:mb-0">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Delivery:</p>
                    <p className="font-medium text-gray-900 dark:text-white">Within 24-48 hours</p>
                  </div>
                  <Button variant="outline" className="flex items-center">
                    <Download className="mr-2 h-4 w-4" /> Download Receipt
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Link to="/">
                <Button className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 py-6 px-8">
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/account">
                <Button variant="outline" className="w-full sm:w-auto py-6 px-8">
                  View Orders <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            
            {/* Related services banner */}
            <motion.div 
              className="mt-12 p-6 bg-brand-50 dark:bg-brand-900/20 rounded-lg border border-brand-100 dark:border-brand-800"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <h3 className="font-semibold text-brand-900 dark:text-brand-300 mb-2">
                💡 You may also like
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Boost your social media presence even more with these complementary services.
              </p>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                <Link to="/shop?category=instagram" className="whitespace-nowrap px-3 py-1 bg-white dark:bg-gray-800 text-sm rounded-full border border-gray-200 dark:border-gray-700 hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors">
                  Instagram Growth
                </Link>
                <Link to="/shop?category=youtube" className="whitespace-nowrap px-3 py-1 bg-white dark:bg-gray-800 text-sm rounded-full border border-gray-200 dark:border-gray-700 hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors">
                  YouTube Boost
                </Link>
                <Link to="/shop?category=seo" className="whitespace-nowrap px-3 py-1 bg-white dark:bg-gray-800 text-sm rounded-full border border-gray-200 dark:border-gray-700 hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors">
                  SEO Tools
                </Link>
                <Link to="/shop?category=traffic" className="whitespace-nowrap px-3 py-1 bg-white dark:bg-gray-800 text-sm rounded-full border border-gray-200 dark:border-gray-700 hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors">
                  Website Traffic
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
