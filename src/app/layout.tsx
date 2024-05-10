import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ 
  weight: ["300", "400", "500", "700"],
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
      <body className={roboto.className}>
        <main className="flex justify-center items-center min-h-screen bg-zinc-950 text-zinc-200">
          {children}
        </main>
      </body>
    </html>
  );
}
