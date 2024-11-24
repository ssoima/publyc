import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AgentProvider } from '@/contexts/AgentContext'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Content Assistant",
  description: "Your personal AI-powered content creation assistant. Create engaging content in seconds with personalized style and tone.",
  keywords: ["AI", "content creation", "writing assistant", "AI writer", "content generator"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "AI Content Assistant",
    description: "Create engaging content in seconds with AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AgentProvider>
          {children}
        </AgentProvider>
      </body>
    </html>
  );
}
