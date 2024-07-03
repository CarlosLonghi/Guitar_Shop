import type { Metadata } from "next";
import { Dancing_Script } from "next/font/google";
import "./globals.css";
import Image from "next/image";

import logoImage from "@/assets/logo.png"
import Link from "next/link";

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ["400", "500", "600"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Guitar Shop",
  description: "Best Guitar's for sale!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dancingScript.className} min-h-screen flex flex-col gap-8 pl-6 pr-4 pb-8 items-center dark antialiased`}>
        <header className="max-w-screen-lg w-full py-4 flex">
          <div className="flex flex-col items-center gap-2">
            <Link href={'/'} className="p-3 bg-primary-foreground rounded-full ring-secondary ring-4">
              <Image width={56} className="-ml-1" src={logoImage} alt="Logo" />
            </Link>
            <span className="text-lg font-semibold">Guitar Shop</span>
          </div>
        </header>
        
        {children}
      </body>
    </html>
  );
}
