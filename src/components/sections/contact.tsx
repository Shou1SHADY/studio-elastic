'use client';
import type { Dictionary } from '@/lib/dictionaries';
import { useFormStatus } from 'react-dom';
import { useActionState, useEffect, useRef } from 'react';
import { submitContactForm, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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

export function Contact({ dictionary, lang, showMap = false }: { dictionary: Dictionary, lang: 'en' | 'ar', showMap?: boolean }) {
  const [state, formAction] = useActionState(submitContactForm.bind(null, lang), initialState);
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
    <section id="contact" className="container mx-auto px-4 pt-28 md:pt-36 pb-16">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">{dictionary.contact.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{dictionary.contact.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Card className="bg-background/60 border-border/10">
            <CardHeader>
              <CardTitle className="font-headline">{dictionary.contact.title}</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          <Card className="bg-background/60 border-border/10">
            <CardHeader>
              <CardTitle className="font-headline">{dictionary.header.contact}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg border border-border/10">
                  <p className="font-medium text-foreground">info@elasticcanvas.com</p>
                  <p>Email</p>
                </div>
                <div className="p-4 rounded-lg border border-border/10">
                  <p className="font-medium text-foreground">+1 (555) 123-4567</p>
                  <p>Phone</p>
                </div>
                <div className="p-4 rounded-lg border border-border/10">
                  <p className="font-medium text-foreground">123 Design Street, Creative District</p>
                  <p>Address</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {showMap && (
            <Card className="bg-background/60 border-border/10 md:col-span-2">
              <CardHeader>
                <CardTitle className="font-headline">Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full overflow-hidden rounded-lg border border-border/10" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    title="Location Map"
                    src="https://www.google.com/maps?q=123%20Design%20Street%20Creative%20District&output=embed"
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
