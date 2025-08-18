import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';

const NewCheckout: React.FC = () => {
  const navigate = useNavigate();
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-4">Add some items to your cart before checkout.</p>
          <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  // Redirect to new simplified checkout
  React.useEffect(() => {
    navigate('/simple-checkout');
  }, [navigate]);

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <Card>
          <CardHeader>
            <CardTitle>Redirecting to checkout...</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please wait while we redirect you to our new checkout experience.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewCheckout;