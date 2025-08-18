
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Settings, LogIn, User } from "lucide-react";

const Account: React.FC = () => {
  // For now, let's assume user is not logged in
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-brand-600 dark:text-brand-400" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Sign In to Your Account
              </h1>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <Button
                  type="button"
                  className="w-full bg-brand-600 hover:bg-brand-700 py-6"
                >
                  <LogIn className="h-4 w-4 mr-2" /> Sign In
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="h-4 w-4 mr-2" />
                  Continue with Google
                </Button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <a href="#" className="font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400">
                    Sign up now
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-brand-600 dark:text-brand-400">JS</span>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900 dark:text-white">John Smith</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">john@example.com</p>
                  </div>
                </div>
                <nav className="space-y-1">
                  <a
                    href="#orders"
                    className="flex items-center px-4 py-3 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-md"
                  >
                    <ShoppingBag className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span>Orders</span>
                  </a>
                  <a
                    href="#wishlist"
                    className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    <Heart className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span>Wishlist</span>
                  </a>
                  <a
                    href="#settings"
                    className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    <Settings className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span>Settings</span>
                  </a>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Order History</h2>
                
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No orders yet</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Once you make a purchase, your orders will appear here.
                  </p>
                  <Link to="/shop">
                    <Button className="bg-brand-600 hover:bg-brand-700">
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
