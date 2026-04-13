import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: 'TokenBee — LLM Observability & Compression',
  description: 'Complete observability, automatic prompt compression, and agent replay for LLM applications. One URL change. No SDK required. Free for 1,000 requests.',
  keywords: [
    'LLM observability',
    'prompt compression',
    'AI monitoring',
    'agent replay',
    'LLM cost tracking',
    'OpenAI monitoring',
    'Anthropic monitoring'
  ],
  openGraph: {
    title: 'TokenBee — LLM Observability & Compression',
    description: 'See everything. Cut costs. Debug agents.',
    type: 'website',
  }
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
            <TooltipProvider delay={200}>{children}</TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
