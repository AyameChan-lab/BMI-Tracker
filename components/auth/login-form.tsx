'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';

function LoginButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all shadow-lg shadow-primary/25" disabled={pending} isLoading={pending}>
            Log in
        </Button>
    );
}

export default function LoginForm() {
    const [errorMessage, dispatch] = useActionState(authenticate, undefined);

    return (
        <Card className="w-full max-w-md mx-auto border-none shadow-2xl bg-white/5 backdrop-blur-xl">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Welcome Back
                </CardTitle>
                <p className="text-muted-foreground/60 text-sm">Enter your credentials to access your account</p>
            </CardHeader>
            <CardContent>
                <form action={dispatch} className="space-y-4">
                    <Input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        className="bg-white/5 border-white/10 focus:border-primary/50 text-lg"
                    />
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        minLength={6}
                        className="bg-white/5 border-white/10 focus:border-primary/50 text-lg"
                    />
                    <div className="flex justify-end">
                        <Link href="#" className="text-xs text-primary hover:text-primary/80 transition-colors">Forgot password?</Link>
                    </div>
                    {errorMessage && (
                        <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm text-center font-medium animate-fade-in">
                            {errorMessage}
                        </div>
                    )}
                    <LoginButton />
                </form>
            </CardContent>
            <CardFooter className="justify-center">
                <p className="text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-semibold text-primary hover:text-secondary transition-colors">
                        Sign up
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
