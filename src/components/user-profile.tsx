import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {createClient} from "@/utils/supabase/client";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {LogOut} from "lucide-react";

export function UserProfile() {
  const router = useRouter();

  const handleSignOut = async () => {
    console.log("signing out")
    const supabase = createClient()
    console.log(await supabase.auth.getUser())
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error);
    } else {
      router.push('/'); // Redirect to the home page after signing out
    }
  };

  return (
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-wrap items-center justify-between gap-y-2">
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

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will need to sign in again to access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSignOut}>Sign out</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
  );
}