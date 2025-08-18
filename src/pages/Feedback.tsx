import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface FeedbackState {
  customerName: string;
  orderId: string;
  orderNumber: string;
}

const Feedback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState<FeedbackState | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (location.state) {
      setFeedbackData(location.state as FeedbackState);
    } else {
      // Redirect to home if no feedback data
      navigate('/');
    }
  }, [location.state, navigate]);

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleSubmitFeedback = async () => {
    if (!feedbackData) return;
    
    if (!description.trim()) {
      toast.error("Please enter your feedback description");
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from('feedback').insert({
        customer_name: feedbackData.customerName,
        order_id: feedbackData.orderId,
        rating: rating || null,
        description: description.trim()
      });

      if (error) {
        console.error('Error saving feedback:', error);
        toast.error("Failed to save feedback. Please try again.");
      } else {
        toast.success("Thank you for your feedback!");
        navigate('/');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!feedbackData) {
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
          className="space-y-6"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Share Your Experience</h1>
            <p className="text-muted-foreground">Your feedback helps us improve our services</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Feedback for Order #{feedbackData.orderNumber}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="customerName">Customer Name</Label>
                <input
                  id="customerName"
                  value={feedbackData.customerName}
                  disabled
                  className="w-full p-3 border border-border rounded-md bg-muted text-muted-foreground"
                />
              </div>

              <div>
                <Label>Rate Your Experience (Optional)</Label>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleStarClick(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        } hover:text-yellow-400 transition-colors`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    You rated: {rating} star{rating > 1 ? 's' : ''}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Describe Your Experience *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us about your experience with our products and service..."
                  className="min-h-[120px] mt-2"
                  required
                />
              </div>

              <Button 
                onClick={handleSubmitFeedback}
                disabled={submitting}
                className="w-full"
              >
                {submitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Feedback;