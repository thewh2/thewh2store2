
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Types for payment processing
export interface PaymentDetails {
  customerName: string;
  phone: string;
  address: string;
  amount: number;
  orderId: string;
  products: any[];
  paymentMethod: "esewa" | "cod";
  couponCode?: string;
  discountAmount?: number;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  orderId?: string;
  orderNumber?: string;
}

// Manual payment processing functions

/**
 * Process manual eSewa payment (customer pays manually)
 */
export const processEsewaPayment = async (details: PaymentDetails): Promise<PaymentResponse> => {
  try {
    console.log("Processing manual eSewa payment:", details);
    
    const orderNumber = await generateOrderNumber();
    const orderId = await saveOrderToDatabase(orderNumber, details);
    
    return {
      success: true,
      message: "Order created successfully. Please proceed with manual eSewa payment.",
      orderId,
      orderNumber
    };
  } catch (error) {
    console.error("eSewa payment error:", error);
    return {
      success: false,
      message: "Failed to create order. Please try again."
    };
  }
};


/**
 * Process Cash on Delivery
 */
export const processCOD = async (details: PaymentDetails): Promise<PaymentResponse> => {
  try {
    console.log("Processing COD order:", details);
    
    const orderNumber = await generateOrderNumber();
    const orderId = await saveOrderToDatabase(orderNumber, details);
    
    return {
      success: true,
      message: "Cash on Delivery order placed successfully.",
      orderId,
      orderNumber
    };
  } catch (error) {
    console.error("COD payment error:", error);
    return {
      success: false,
      message: "Failed to create COD order. Please try again."
    };
  }
};


/**
 * Main payment processing function that routes to the appropriate payment method
 */
export const processPayment = async (details: PaymentDetails): Promise<PaymentResponse> => {
  try {
    toast.info(`Processing ${details.paymentMethod === 'esewa' ? 'eSewa' : 'Cash on Delivery'} order...`);
    
    switch (details.paymentMethod) {
      case "esewa":
        return await processEsewaPayment(details);
      case "cod":
        return await processCOD(details);
      default:
        throw new Error("Invalid payment method");
    }
  } catch (error) {
    console.error("Payment processing error:", error);
    toast.error("Payment processing failed. Please try again.");
    return {
      success: false,
      message: "Payment processing failed. Please try again."
    };
  }
};

/**
 * Generate a unique order number using Supabase function
 */
export const generateOrderNumber = async (): Promise<string> => {
  try {
    const { data, error } = await supabase.rpc('generate_order_number');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error generating order number:", error);
    // Fallback to local generation
    const timestamp = new Date().getTime().toString().slice(-8);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `WH2-${timestamp}-${random}`;
  }
};

/**
 * Save order to Supabase database
 */
export const saveOrderToDatabase = async (orderNumber: string, details: PaymentDetails): Promise<string> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        order_number: orderNumber,
        customer_name: details.customerName,
        customer_phone: details.phone,
        customer_address: details.address,
        payment_method: details.paymentMethod,
        total_amount: details.amount,
        coupon_code: details.couponCode,
        discount_amount: details.discountAmount || 0,
        products: details.products,
        status: 'pending'
      }])
      .select('id')
      .single();

    if (error) throw error;
    
    console.log("Order saved to database:", data);
    return data.id;
  } catch (error) {
    console.error("Error saving order to database:", error);
    throw error;
  }
};

/**
 * Send payment notification with screenshot
 */
export const sendPaymentNotification = async (orderId: string, customerName: string, message?: string, screenshotUrl?: string): Promise<boolean> => {
  try {
    const { error } = await supabase.functions.invoke('send-payment-notification', {
      body: {
        orderId,
        customerName,
        message,
        screenshotUrl
      }
    });

    if (error) throw error;
    
    toast.success("Payment notification sent successfully!");
    return true;
  } catch (error) {
    console.error("Error sending payment notification:", error);
    toast.error("Failed to send payment notification");
    return false;
  }
};

/**
 * Validate coupon code
 */
export const validateCouponCode = (code: string): { valid: boolean; discount: number; description: string } => {
  const coupons = {
    'THEWH2': { discount: 15, description: '15% OFF' },
    'TEJ10': { discount: 10, description: '10% OFF' },
    'BHOGI10': { discount: 10, description: '10% OFF' },
    'OFFER25': { discount: 25, description: '25% OFF' }
  };

  const coupon = coupons[code.toUpperCase() as keyof typeof coupons];
  
  if (coupon) {
    return {
      valid: true,
      discount: coupon.discount,
      description: coupon.description
    };
  }

  return { valid: false, discount: 0, description: '' };
};
