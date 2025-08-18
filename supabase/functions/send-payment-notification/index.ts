import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentNotificationRequest {
  orderId: string;
  customerName: string;
  message?: string;
  screenshotUrl?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const { orderId, customerName, message, screenshotUrl }: PaymentNotificationRequest = await req.json();

    console.log("Processing payment notification:", { orderId, customerName });

    // Save payment message to database
    const { error: dbError } = await supabase
      .from('payment_messages')
      .insert([{ 
        order_id: orderId, 
        customer_name: customerName, 
        message: message || '',
        screenshot_url: screenshotUrl 
      }]);

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save payment message");
    }

    // Get order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError) {
      console.error("Order fetch error:", orderError);
      throw new Error("Failed to fetch order details");
    }

    // Send email notification to admin
    const emailResponse = await resend.emails.send({
      from: "WH2 Store <onboarding@resend.dev>",
      to: ["thewh2.official@gmail.com"],
      subject: `Payment Screenshot Received - Order ${order.order_number}`,
      html: `
        <h2>Payment Screenshot Received</h2>
        <div style="margin: 20px 0; padding: 20px; background: #f5f5f5; border-radius: 5px;">
          <p><strong>Order Number:</strong> ${order.order_number}</p>
          <p><strong>Customer Name:</strong> ${customerName}</p>
          <p><strong>Customer Phone:</strong> ${order.customer_phone}</p>
          <p><strong>Total Amount:</strong> Rs. ${order.total_amount}</p>
          <p><strong>Payment Method:</strong> ${order.payment_method.toUpperCase()}</p>
          ${message ? `<p><strong>Customer Message:</strong></p><p style="background: white; padding: 15px; border-radius: 3px;">${message}</p>` : ''}
          ${screenshotUrl ? `<p><strong>Payment Screenshot:</strong> <a href="${screenshotUrl}" target="_blank">View Screenshot</a></p>` : ''}
        </div>
        <div style="margin: 20px 0; padding: 15px; background: #e8f4f8; border-radius: 5px;">
          <h3>Order Details:</h3>
          <pre style="white-space: pre-wrap;">${JSON.stringify(order.products, null, 2)}</pre>
        </div>
        <p style="color: #666; font-size: 12px;">
          Payment notification received at ${new Date().toLocaleString()}
        </p>
      `,
    });

    console.log("Payment notification email sent:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Payment notification sent successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in send-payment-notification function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to process payment notification" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);