import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // optional, choose weights you need
});

const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';

const imageUrl = `${baseUrl}/images/deep.png`;

export const metadata = {
  title: "YesCity Rewards",
  description: "This page is describes the rewards and campus ambassador program at YesCity",
  keywords: 'Information, City, Travel, YesCity, yescity',
  author: 'Aaditya Pandey',
  openGraph: {
    title: 'YesCity',
    description:
      'YesCity helps travellers find right places in each city, exploring their hidden gems and authentic taste.',
    url: 'https://yescity.in',
    siteName: 'YesCity',
    images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'YesCity - Discover Amazing Places in India',
        },
      ],
  },
  };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${poppins.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
