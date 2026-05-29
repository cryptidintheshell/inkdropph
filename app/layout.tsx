import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InkDropPH | Premium Custom Printing Services",
  description: "Fictional premier printing and personalized merchandise service provider based in the Philippines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-full flex-col font-sans bg-brand-blue-light text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50`}>
        <header className="sticky top-0 z-50 w-full border-b border-brand-blue/20 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-xl font-bold tracking-tight">
              InkDrop<span className="text-brand-orange">PH</span>
            </Link>
            <nav className="hidden md:flex md:gap-x-8">
              <Link href="/services" className="text-sm font-medium hover:text-brand-orange transition-colors">Services</Link>
              <Link href="/about" className="text-sm font-medium hover:text-brand-orange transition-colors">About</Link>
              <Link href="/order" className="text-sm font-medium hover:text-brand-orange transition-colors">Start Order</Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link 
                href="/order" 
                className="rounded-full bg-brand-orange px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-orange/90 transition-all active:scale-95"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t border-brand-blue/20 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <span className="text-lg font-bold text-brand-blue">InkDropPH</span>
                <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
                  Premium custom printing and personalized merchandise. From paper to apparel, we bring your ideas to life.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-orange">Services</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link href="/services/paper-printing" className="text-sm text-zinc-600 hover:text-brand-blue dark:text-zinc-400 dark:hover:text-zinc-50">Paper Printing</Link></li>
                  <li><Link href="/services/apparel" className="text-sm text-zinc-600 hover:text-brand-blue dark:text-zinc-400 dark:hover:text-zinc-50">Apparel</Link></li>
                  <li><Link href="/services/promotional-items" className="text-sm text-zinc-600 hover:text-brand-blue dark:text-zinc-400 dark:hover:text-zinc-50">Promotional</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-orange">Company</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link href="/about" className="text-sm text-zinc-600 hover:text-brand-blue dark:text-zinc-400 dark:hover:text-zinc-50">About Us</Link></li>
                  <li><Link href="/order" className="text-sm text-zinc-600 hover:text-brand-blue dark:text-zinc-400 dark:hover:text-zinc-50">Contact</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-brand-orange/10 pt-8 dark:border-zinc-900">
              <p className="text-xs text-zinc-400">
                &copy; {new Date().getFullYear()} InkDropPH. All rights reserved. Fictional project.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
