import { cardsData, whyChooseSectionData } from "@/type/type";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import { inter, lora, roboto } from "@/lib/fonts";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen items-center justify-center">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 rounded-md to-background py-24 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className={`${inter.className} text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight`}>
            All-in-One Free PDF Tools
          </h1>
          <p className={`${roboto.className} text-lg text-muted-foreground mb-8`}>
            Merge, split, and convert PDF files online — no sign-up required.
          </p>
          <Link href='/merge' >
          <Button className={`${lora.className} text-base md:text-lg font-medium`} size="lg">
            Get Started 
          </Button>
          </Link>
        </div>
      </section>
      {/* Tools Section */}
      <section className="py-16 px-4 bg-muted/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cardsData.map(({ icon: Icon, title, description, button, link }) => (
            <Card key={title} className="hover:shadow-xl cursor-pointer transition-shadow border border-border">
              <CardHeader>
                <div className="text-primary text-4xl mb-2">
                  <Icon />
                </div>
                <CardTitle className={`${lora.className} text-xl`}>
                  {title}
                </CardTitle>
                <CardDescription className={`${roboto.className} text-sm text-muted-foreground`}>
                  {description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Link href={link}>
                <Button className={`${lora.className} bg-gray-100`} variant="outline">
                  {button}
                </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className={`${inter.className} text-3xl md:text-4xl font-semibold mb-4`}>
            Why Choose Us?
          </h2>
          <p className={`${roboto.className} text-muted-foreground max-w-2xl mx-auto`}>
            Built with privacy, speed, and simplicity in mind. Your PDFs are
            never stored or shared.
          </p>
          <div className="flex gap-4 items-center justify-center pt-4" >
            <Link href='https://www.postman.com/ahmadfarazjutt3/convertkr/overview'>
              <Button variant='outline' className={`${lora.className} bg-gray-100`}>
                View Documentation
              </Button>
            </Link>
            <Link href='https://convertkr.com/mock-apis'>
            <Button variant='default'>Try Demo</Button>
            </Link>
          </div>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {whyChooseSectionData.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="bg-muted/80 border-0 shadow-sm">
              <CardHeader className="flex flex-col items-center text-center space-y-4">
                <div className="bg-primary/10 rounded-full p-4 text-3xl text-primary">
                  <Icon />
                </div>
                <CardTitle className={`${lora.className}`}>{title}</CardTitle>
                <CardDescription className={`${roboto.className} text-sm text-muted-foreground`}>
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

