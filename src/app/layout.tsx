import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Users Dashboard",
  description: "Дашборд пользователей на базе dummyjson.com — тестовое задание",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru' className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className='flex min-h-full flex-col bg-background text-foreground'>
        <Providers>
          <SiteHeader />
          <main className='container mx-auto flex-1 px-4 py-4'>{children}</main>
          <footer className='border-t py-4 text-center text-xs text-muted-foreground'>
            Данные: dummyjson.com/users · Users Dashboard
          </footer>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
