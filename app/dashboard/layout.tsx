import Link from "next/link";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/dashboard" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        BMI Pro
                    </Link>
                    <nav className="flex items-center gap-4">
                        {/* Add more nav items if needed */}
                        <form
                            action={async () => {
                                "use server";
                                await signOut();
                            }}
                        >
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-danger">
                                Sign Out
                            </Button>
                        </form>
                    </nav>
                </div>
            </header>
            <main className="flex-1 container mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
