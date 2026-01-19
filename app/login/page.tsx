import LoginForm from '@/components/auth/login-form';

export default function LoginPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background">
            <div className="w-full max-w-md space-y-8 animate-fade-in">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">BMI Pro</h1>
                    <p className="text-lg text-muted-foreground">Your personal health companion</p>
                </div>
                <LoginForm />
            </div>
        </main>
    );
}
