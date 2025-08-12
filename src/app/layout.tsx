
import "./globals.css";
import { CartProvider } from "../context/cartcontext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

// import { dark } from '@clerk/themes'

export const metadata = {
  title: 'Tech Shop',
  description: 'Your smart gadget hub',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <ClerkProvider
      // appearance={{ baseTheme: dark }}
    >
    <html lang="en">
      <body
      >
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
        
      </body>
    </html>
    </ClerkProvider>
  );
}
