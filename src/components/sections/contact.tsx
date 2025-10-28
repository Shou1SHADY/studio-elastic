
'use client';
import type { Dictionary } from '@/lib/dictionaries';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { submitContactForm, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

function SubmitButton({ dictionary }: { dictionary: Dictionary }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
      {pending ? dictionary.contact.submit_button_pending : dictionary.contact.submit_button}
    </Button>
  );
}

const initialState: FormState = {
  message: '',
  success: false,
  errors: null,
};

export function Contact({ dictionary, lang }: { dictionary: Dictionary, lang: 'en' | 'ar' }) {
  const [state, formAction] = useFormState(submitContactForm.bind(null, lang), initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if(state.success) {
        toast({
          title: 'Success!',
          description: state.message,
        });
        formRef.current?.reset();
      } else if (state.errors) {
        // Error message is shown in the form itself
      } else {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast]);
  
  return (
    <section id="contact" className="animated-section container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold">{dictionary.contact.title}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{dictionary.contact.subtitle}</p>
      </div>

      <div className="mx-auto mt-16 max-w-xl">
        <form ref={formRef} action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className='font-headline'>{dictionary.contact.name_label}</Label>
            <Input id="name" name="name" placeholder={dictionary.contact.name_placeholder} required />
            {state.errors?.name && <p className="text-sm text-red-500">{state.errors.name[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className='font-headline'>{dictionary.contact.email_label}</Label>
            <Input id="email" name="email" type="email" placeholder={dictionary.contact.email_placeholder} required />
            {state.errors?.email && <p className="text-sm text-red-500">{state.errors.email[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className='font-headline'>{dictionary.contact.message_label}</Label>
            <Textarea id="message" name="message" placeholder={dictionary.contact.message_placeholder} required rows={5} />
            {state.errors?.message && <p className="text-sm text-red-500">{state.errors.message[0]}</p>}
          </div>
          <SubmitButton dictionary={dictionary} />
          {state.message && !state.success && state.errors && (
             <Alert variant="destructive">
                <AlertTitle>Submission Error</AlertTitle>
                <AlertDescription>Please correct the errors and try again.</AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    </section>
  );
}
