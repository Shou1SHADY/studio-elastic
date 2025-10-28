
'use server';

import { z } from 'zod';
import { getDictionary } from '@/lib/dictionaries';

export type FormState = {
  message: string;
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  } | null;
};

export async function submitContactForm(lang: 'en' | 'ar', prevState: FormState, formData: FormData): Promise<FormState> {
  const dictionary = await getDictionary(lang);
  
  const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    email: z.string().email('Invalid email address.'),
    message: z.string().min(10, 'Message must be at least 10 characters.'),
  });

  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: dictionary.contact.error_message,
      success: false,
    };
  }

  // Here you would typically save to a database like Firebase Firestore.
  // For this example, we'll just log the data and simulate a delay.
  console.log('New Inquiry:', validatedFields.data);
  
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would handle potential errors from the database write.
    // e.g. if (error) throw new Error("Failed to save to DB");

    return { message: dictionary.contact.success_message, success: true, errors: null };
  } catch (error) {
    console.error('Form submission error:', error);
    return { message: dictionary.contact.error_message, success: false, errors: null };
  }
}
