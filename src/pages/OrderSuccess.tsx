import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Clock, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface OrderSuccessState {
  orderNumber: string;
  paymentMethod: string;
  total: number;
  customerName?: string;
  orderId?: string;
}

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<OrderSuccessState | null>(null);

  useEffect(() => {
    if (location.state) {
      setOrderData(location.state as OrderSuccessState);
    } else {
      // Redirect to home if no order data
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!orderData) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">Order Placed Successfully!</h1>
            <p className="text-lg text-muted-foreground">Thank you for your purchase</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <span className="font-semibold">Order Number:</span>
                  <p className="text-lg">{orderData.orderNumber}</p>
                </div>
                <div>
                  <span className="font-semibold">Total Amount:</span>
                  <p className="text-lg">Rs. {orderData.total}</p>
                </div>
                <div>
                  <span className="font-semibold">Payment Method:</span>
                  <p className="text-lg capitalize">{orderData.paymentMethod === 'esewa' ? 'eSewa' : 'Cash on Delivery'}</p>
                </div>
                <div>
                  <span className="font-semibold">Status:</span>
                  <p className="text-lg text-yellow-600">Processing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">What happens next?</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Payment Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      {orderData.paymentMethod === 'esewa' 
                        ? 'We will verify your eSewa payment within 2-4 hours'
                        : 'Your COD order is confirmed and ready for delivery'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Product Delivery</h4>
                    <p className="text-sm text-muted-foreground">
                      Your order will be delivered within 24 hours after payment verification
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Need Help?</h4>
                    <p className="text-sm text-muted-foreground">
                      Contact us at 9825728982 or thewh2.official@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/feedback', { 
                state: { 
                  customerName: orderData.customerName || 'Customer',
                  orderId: orderData.orderId || '',
                  orderNumber: orderData.orderNumber 
                } 
              })} 
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
            >
              Share Your Feedback
            </Button>
            <Button onClick={() => navigate('/shop')} className="w-full sm:w-auto">
              Continue Shopping
            </Button>
            <Button variant="outline" onClick={() => navigate('/')} className="w-full sm:w-auto">
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;