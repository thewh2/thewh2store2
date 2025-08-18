import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Save to Firebase
      const { saveContactMessageToFirebase } = await import('@/services/firebaseService');
      await saveContactMessageToFirebase(formData);

      // Send to Supabase edge function for email
      const { supabase } = await import('@/integrations/supabase/client');
      await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      toast.success("Your message has been sent! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-brand-600 dark:text-brand-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Email Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              thewh2.official@gmail.com
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-brand-600 dark:text-brand-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Call Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              +977 9825728982
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-brand-600 dark:text-brand-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Visit Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Kathmandu, Nepal
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject*
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Billing Issue">Billing Issue</option>
                    <option value="Product Question">Product Question</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message*
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  className="bg-brand-600 hover:bg-brand-700 text-white"
                >
                  <Send className="h-4 w-4 mr-2" /> Send Message
                </Button>
              </form>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="h-full">
              <iframe
                title="Map"
                className="w-full h-full min-h-[400px]"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1115633333615!2d85.3071022!3d27.714542799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb77fd4f7%3A0x443815c26d1727e7!2sThamel%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1618642897208!5m2!1sen!2snp"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-6 text-left">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How do I download my purchased products?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                After completing your purchase, you'll receive an email with download instructions. You can also find all your purchases in the "My Account" section under "Order History."
              </p>
            </div>
            <div className="mb-6 text-left">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We accept payments through eSewa, various Nepali online banking options, and international credit cards.
              </p>
            </div>
            <div className="mb-6 text-left">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How do I become a seller on The WH2 Store?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Contact us at thewh2.official@gmail.com with the subject "Seller Application" and we'll guide you through the process.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Due to the nature of digital products, we generally do not offer refunds. However, if you experience technical issues, please contact our support team for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
