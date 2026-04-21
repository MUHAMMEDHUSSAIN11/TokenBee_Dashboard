import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import SessionTimeout from "@/components/auth/SessionTimeout";

export const metadata: Metadata = {
  title: 'TokenBee — Intelligent LLM Gateway & Semantic Compression',
  description: 'Secure LLM observability, prompt compression, and frame-by-frame agent replays. Stateless BYOK architecture for production AI applications.',
  keywords: [
    'LLM gateway',
    'BYOK architecture',
    'prompt compression',
    'semantic token reduction',
    'agent replay',
    'LLM observability'
  ],
  openGraph: {
    title: 'TokenBee — Observe, Replay and Compress LLM traffic.',
    description: 'Stateless BYOK gateway for high-fidelity LLM observability and semantic compression.',
    type: 'website',
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <QueryProvider>
            <TooltipProvider delay={200}>
              <SessionTimeout />
              {children}
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
