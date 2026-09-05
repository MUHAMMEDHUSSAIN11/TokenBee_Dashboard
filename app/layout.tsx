import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Script from "next/script";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import SessionTimeout from "@/components/auth/SessionTimeout";

export const metadata: Metadata = {
  title: 'TokenBee — Your AI said it. TokenBee remembers it.',
  description: 'Capture, inspect, and optimize AI interactions for teams shipping LLM features to production. Searchable interaction history, session timelines, and cost visibility — priced by captured interactions.',
  keywords: [
    'AI interaction logging',
    'AI audit trail',
    'AI observability',
    'AI conversation logging',
    'LLM audit logs',
    'AI governance',
    'AI request replay',
    'LLM cost monitoring',
  ],
  openGraph: {
    title: 'Your AI said it. TokenBee remembers it.',
    description: 'Capture, inspect session timelines, and track cost and compression from your own AI traffic. Priced by captured interactions.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
    other: [
      { rel: "mask-icon", url: "/favicon.svg", color: "#7c3aed" },
    ],
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
      <head>
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wcof13xsvh");
          `}
        </Script>
      </head>
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
