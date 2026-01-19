import RegisterForm from '@/components/auth/register-form';

export default function RegisterPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background">
            <div className="w-full max-w-md space-y-8 animate-fade-in">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-secondary">Join BMI Pro</h1>
                    <p className="text-lg text-muted-foreground">Start your journey to a healthier you</p>
                </div>
                <RegisterForm />
            </div>
        </main>
    );
}
