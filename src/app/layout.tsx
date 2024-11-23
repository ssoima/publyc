import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { MobileSidebar } from "@/components/mobile-sidebar";

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
        <div className="h-full relative">
          <div className="hidden lg:flex h-full w-64 flex-col fixed inset-y-0 z-50">
            <Sidebar />
          </div>
          <div className="lg:pl-64 h-full">
            <div className="h-[60px] fixed inset-y-0 w-full z-50 px-4 border-b bg-background flex items-center lg:hidden">
              <MobileSidebar />
            </div>
            <main className="pt-[60px] lg:pt-0 h-full">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
