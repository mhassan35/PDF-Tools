import type { Metadata } from "next";
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { inter, lora, roboto, playfairDisplay } from "@/lib/fonts";
import { NotificationAlert } from "@/components/ui/NotificationAlert";

export const metadata: Metadata = {
  title: "All PDF Tools",
  description: "Free tools to merge, split, compress, and convert PDFs online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} ${roboto.variable} ${playfairDisplay.variable}`}
    >
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <NavigationBar />
        <main className="flex-grow">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
            {children}
          </div>
          <NotificationAlert />
        </main>
        <Footer />
      </body>
    </html>
  );
}
