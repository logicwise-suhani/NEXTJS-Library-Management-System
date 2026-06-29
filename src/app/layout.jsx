import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Home from "./page";
import { Icons, ToastContainer } from "react-toastify";
import { createMetadata } from "@/utils/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: {
//     default: "BookWorm",
//     template: "%s | BookWorm"
//   },
//   icons: {
//     icon: "/LandingImage.webp"
//   },
//   description: "Digital library management platform",
//   authors: [{ name: "Monster" }, { name: "Whale" }],
// };

export const metadata = createMetadata("BookWorm", "Digital library management platform");

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}