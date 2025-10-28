
import type { Dictionary } from '@/lib/dictionaries';

type FooterProps = {
  dictionary: Dictionary;
};

export function Footer({ dictionary }: FooterProps) {
  return (
    <footer className="py-8 mt-32 md:mt-48">
      <div className="container mx-auto text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} {dictionary.footer.copy}</p>
      </div>
    </footer>
  );
}
