import type { Metadata } from "next";
import {  Roboto} from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ReduxProvider from "@/store/provider/ReduxProvider";

const font = Roboto({ subsets: ["latin"],weight:['100','300'] });

export const metadata: Metadata = {
  title: "WebCastle",
  description: "Task by webcastle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ReduxProvider>
        <html lang="en" suppressHydrationWarning>
          <body className="bg-gray-100">
            {children}
          </body>
        </html>
      </ReduxProvider>
    </ClerkProvider>
  );
}
