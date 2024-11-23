import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserProfile() {
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/avatar-placeholder.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-muted-foreground">john@example.com</p>
        </div>
      </div>
    </div>
  );
} 