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

export const metadata = {
  title: "YesCity Rewards",
  description: "This page is describes the rewards and campus ambassador program at YesCity",
  // imageUrl = `${baseUrl}/deep.png`,
  // return {
  //   title,
  //   description,
  //   metadataBase: new URL(baseUrl),
  //   openGraph: {
  //     title,
  //     description,
  //     url: currentUrl,
  //     siteName: 'YesCity',
  //     type: 'website',
  //     images: [
  //       {
  //         url: imageUrl,
  //         width: 1200,
  //         height: 630,
  //         alt: 'YesCity - Discover Amazing Places in India',
  //       },
  //     ],
  //   },
  //   twitter: {
  //     card: 'summary_large_image',
  //     title,
  //     description,
  //     images: [imageUrl],
  //   },
  // }
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
