// import necessary components and functions
import { login, signup } from './actions'
import { signIn } from 'next-auth/react' // For LinkedIn social login
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Divider } from '@/components/ui/divider' // Assuming you have a Divider component
import { LinkedInIcon } from '@/components/icons/linkedin' // Custom LinkedIn icon component

export default function LoginPage() {
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

                <Divider text="Or continue with" />

                <Button
                    variant="outline"
                    className="w-full flex items-center justify-center"
                    onClick={() => signIn('linkedin')}
                >
                    <LinkedInIcon className="mr-2 h-5 w-5" />
                    Continue with LinkedIn
                </Button>
            </div>
        </div>
    )
}