import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import LenisScroll from "@/components/LenisScroll";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "Helix",
  description: "Helix-The DNA of Consumer Technology Product Storytelling",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} `}>
        <LenisScroll />
        {children}
        <Footer />
      </body>
    </html>
  );
}
