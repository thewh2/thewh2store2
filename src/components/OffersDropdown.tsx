import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Percent, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const OffersDropdown: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Gift className="w-4 h-4" />
          Offers
          <Badge variant="secondary" className="bg-red-500 text-white text-xs">
            HOT
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0" align="end">
        <div className="p-4 space-y-4">
          <div className="text-center">
            <h3 className="font-bold text-lg mb-2">🎉 Special Offers</h3>
          </div>
          
          <motion.div 
            className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Percent className="w-5 h-5 text-red-600" />
              <h4 className="font-semibold text-red-600">LAUNCH25</h4>
            </div>
            <p className="text-sm mb-2">Get 25% OFF on all products!</p>
            <Badge variant="outline" className="text-xs">Launch Special</Badge>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-blue-600">Buy 3 Get Bonus</h4>
            </div>
            <p className="text-sm mb-2">Buy any 3 products and get 10K free TikTok views!</p>
            <Badge variant="outline" className="text-xs">Limited Time</Badge>
          </motion.div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Want Your Own Coupon?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Contact WH2 Store to get your personalized coupon code!
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-600" />
                <span>9825728982</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>thewh2.official@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OffersDropdown;