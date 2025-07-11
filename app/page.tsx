import { Button } from "@/components/ui/button";
import { roboto } from "@/lib/fonts";

export default function Home() {
  return (
    <section className="items-center justify-center text-center" >
      <h1 className="text-3xl font-bold mb-4">Welcome to the Homepage</h1>    
      <p className={`${roboto.className}`}>This content is centered on large screens and full-width on small devices.</p>
      <Button variant="primary" >PDF Tools</Button>
    </section>
  );
}
