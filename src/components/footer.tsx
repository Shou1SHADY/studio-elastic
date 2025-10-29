
import type { Dictionary } from '@/lib/dictionaries';
import Link from 'next/link';

type FooterProps = {
  dictionary: Dictionary;
  lang: 'en' | 'ar';
};

export function Footer({ dictionary, lang }: FooterProps) {
  return (
    <footer className="py-12 mt-32 md:mt-48 bg-background/50 border-t border-border/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-headline font-bold mb-4">Elastic Canvas</h3>
            <p className="text-muted-foreground text-sm">
              Premium customized rubber keychains and patches for your unique style.
            </p>
          </div>
          
          <div>
            <h3 className="font-headline font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href={`/${lang}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{dictionary.header.home}</Link></li>
              <li><Link href={`/${lang}/about`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{dictionary.header.about}</Link></li>
              <li><Link href={`/${lang}/craft`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{dictionary.header.craft}</Link></li>
              <li><Link href={`/${lang}/gallery`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{dictionary.header.gallery}</Link></li>
              <li><Link href={`/${lang}/contact`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{dictionary.header.contact}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-headline font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@elasticcanvas.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Design Street, Creative District</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-headline font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/10 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} {dictionary.footer.copy}</p>
        </div>
      </div>
    </footer>
  );
}
