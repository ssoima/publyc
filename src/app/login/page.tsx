// In LoginPage.jsx
import { Button } from '@/components/ui/button'
import { Linkedin } from 'lucide-react'
import { signInWithLinkedIn } from './actions'

export default function LoginPage() {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6">
                <h1 className="text-center text-3xl font-bold">Sign in to your account</h1>

                {/* LinkedIn Login Button */}
                <form action={signInWithLinkedIn} method="POST" className="w-full">
                    <Button type="submit" variant="outline" className="w-full flex items-center justify-center">
                        <Linkedin className="mr-2 h-5 w-5" />
                        Continue with LinkedIn
                    </Button>
                </form>
            </div>
        </div>
    )
}