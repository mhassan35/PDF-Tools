import { Inter, Lora, Roboto, Playfair_Display, Montserrat } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
export const roboto = Roboto({ weight: "400", subsets: ["latin"], variable: "--font-roboto" });
export const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

