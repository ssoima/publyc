// Import necessary modules and components
import { login, signup } from './actions'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Linkedin } from 'lucide-react'
import {createClient} from "@/utils/supabase/server"; // For LinkedIn icon

export default function LoginPage() {
    const signInWithLinkedIn = async () => {
        'use server'

        // 1. Create a Supabase client
        const supabase = await createClient()
        const origin = (await headers()).get('origin')
        console.log(origin)
        // 2. Sign in with LinkedIn
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'linkedin_oidc',
            options: {
                redirectTo: `${origin}/post/1`,//`${origin}/auth/callback`,
            },
        })

        if (error) {
            console.error('Error during LinkedIn login:', error)
        } else {
            // 3. Redirect to the authentication URL
            console.log("this is the data url: ", data.url)
            redirect(data.url)
        }
    }

    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6">
                <h1 className="text-center text-3xl font-bold">Sign in to your account</h1>
                <form className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email address</Label>
                        <Input id="email" name="email" type="email" required />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                    <Button type="submit" formAction={login} className="w-full">
                        Sign In
                    </Button>
                    <Button variant="secondary" formAction={signup} className="w-full">
                        Sign Up
                    </Button>
                </form>

                {/* Custom Separator with Text */}
                <div className="flex items-center my-4">
                    <Separator className="flex-1" />
                    <span className="px-4 text-sm text-muted-foreground">Or continue with</span>
                    <Separator className="flex-1" />
                </div>

                {/* LinkedIn Login Button */}
                <form action={signInWithLinkedIn} method="post" className="w-full">
                    <Button type="submit" variant="outline" className="w-full flex items-center justify-center">
                        <Linkedin className="mr-2 h-5 w-5" />
                        Continue with LinkedIn
                    </Button>
                </form>
            </div>
        </div>
    )
}