import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const items = Array.from({ length: 10 }).map((_, i) => `Item ${i + 1}`);

  return (
    <div className="min-h-screen relative">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800" />

      {/* Content */}
      <div className="relative h-screen flex flex-col items-center justify-between p-8 pb-20">
        {/* Top section with image placeholder */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="relative w-64 h-64 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center overflow-hidden border-4 border-white dark:border-gray-700">
            <Image
              src="/publyc.webp"
              alt="Publyc Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Bottom section with scroll area and buttons */}
        <div className="w-full space-y-6">
          <ScrollArea className="w-full whitespace-nowrap rounded-lg border bg-white dark:bg-gray-800 p-4">
            <div className="flex gap-4 pb-4">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="w-40 h-40 flex-none rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center"
                >
                  {item}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex gap-4 items-center justify-center">
            <Button
              asChild
              className="w-[140px] h-12 rounded-full bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              <a href="/create">Create Post</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-[140px] h-12 rounded-full border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
            >
              <a href="/examples">View Examples</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
