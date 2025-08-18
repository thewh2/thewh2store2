import { ref, push, serverTimestamp } from 'firebase/database';
import { database } from '../config/firebase';

export interface PaymentMessage {
  customerName: string;
  orderId: string;
  message?: string;
  screenshotUrl?: string;
  timestamp: any;
}

export const savePaymentMessageToFirebase = async (data: Omit<PaymentMessage, 'timestamp'>) => {
  try {
    const messagesRef = ref(database, 'paymentMessages');
    await push(messagesRef, {
      ...data,
      timestamp: serverTimestamp()
    });
    console.log('Payment message saved to Firebase');
    return true;
  } catch (error) {
    console.error('Error saving payment message to Firebase:', error);
    return false;
  }
};

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: any;
}

export const saveContactMessageToFirebase = async (data: Omit<ContactMessage, 'timestamp'>) => {
  try {
    const messagesRef = ref(database, 'contactMessages');
    await push(messagesRef, {
      ...data,
      timestamp: serverTimestamp()
    });
    console.log('Contact message saved to Firebase');
    return true;
  } catch (error) {
    console.error('Error saving contact message to Firebase:', error);
    return false;
  }
};