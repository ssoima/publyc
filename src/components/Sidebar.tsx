'use client';

import { NavigationItems } from "./navigation-items";
import { UserProfile } from "./user-profile";
import Link from 'next/link';

export function Sidebar() {
  return (
      <aside
          className="fixed inset-y-0 left-0 w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <Link href="/home" className="block">
              <h2 className="text-2xl font-bold">publyc</h2>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <NavigationItems/>
          </div>
          <div className="">
            <UserProfile/>
          </div>
        </div>
      </aside>
  );
} 