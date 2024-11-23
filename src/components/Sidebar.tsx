'use client';

import { NavigationItems } from "./navigation-items";
import { UserProfile } from "./user-profile";

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold">Publyc</h2>
        </div>
        <div className="flex-1">
          <NavigationItems />
        </div>
        <UserProfile />
      </div>
    </aside>
  );
} 