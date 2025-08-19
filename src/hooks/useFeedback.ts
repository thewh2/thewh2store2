import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Feedback {
  id: string;
  customer_name: string;
  description: string;
  rating: number;
  created_at: string;
  order_id?: string;
}

export const useFeedback = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedback = async (limit?: number) => {
    try {
      setLoading(true);
      let query = supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (limit) {
        query = query.limit(limit);
      }
      
      const { data, error } = await query;
      
      if (error) {
        setError('Failed to fetch feedback');
        console.error('Error fetching feedback:', error);
        return;
      }
      
      if (data) {
        setFeedback(data);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error fetching feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return {
    feedback,
    loading,
    error,
    fetchFeedback,
    refetch: () => fetchFeedback()
  };
};