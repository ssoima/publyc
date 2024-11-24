'use client';

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationItems } from "./navigation-items";
import { UserProfile } from "./user-profile";
import { useState } from "react";
import Link from 'next/link';
export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-full">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
          <Link href="/home" className="block" onClick={() => setIsOpen(false)}>
              <h2 className="text-2xl font-bold">publyc</h2>
            </Link>
          </div>
          <div className="flex-1">
            <NavigationItems onItemClick={() => setIsOpen(false)} />
          </div>
          <UserProfile />
        </div>
      </SheetContent>
    </Sheet>
  );
} 