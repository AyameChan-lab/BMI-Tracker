'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/lib/definitions';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type FormData = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(RegisterSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setServerError(null);

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                    displayName: data.displayName,
                    confirmPassword: data.confirmPassword
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            router.push('/login?registered=true');
        } catch (error) {
            if (error instanceof Error) {
                setServerError(error.message);
            } else {
                setServerError('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto border-none shadow-2xl bg-white/5 backdrop-blur-xl">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                    Create Account
                </CardTitle>
                <p className="text-muted-foreground/60 text-sm">Join us to start tracking your health</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label="Username"
                        placeholder="Choose a username"
                        {...register('username')}
                        error={errors.username?.message}
                        className="bg-white/5 border-white/10 focus:border-secondary/50"
                    />
                    <Input
                        label="Display Name (Optional)"
                        placeholder="Your Name"
                        {...register('displayName')}
                        error={errors.displayName?.message}
                        className="bg-white/5 border-white/10 focus:border-secondary/50"
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="At least 6 characters"
                        {...register('password')}
                        error={errors.password?.message}
                        className="bg-white/5 border-white/10 focus:border-secondary/50"
                    />
                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="Repeat password"
                        {...register('confirmPassword')}
                        error={errors.confirmPassword?.message}
                        className="bg-white/5 border-white/10 focus:border-secondary/50"
                    />

                    {serverError && (
                        <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm text-center font-medium animate-fade-in">
                            {serverError}
                        </div>
                    )}

                    <Button type="submit" className="w-full bg-gradient-to-r from-secondary to-primary hover:opacity-90 transition-all shadow-lg shadow-secondary/25" isLoading={isLoading}>
                        Sign Up
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="justify-center">
                <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-secondary hover:text-primary transition-colors">
                        Log in
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
