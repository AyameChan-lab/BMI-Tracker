import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background relative overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="z-10 space-y-6 max-w-2xl animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary drop-shadow-sm">
          Master Your Health
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
          Track your BMI, visualize your progress, and stay on top of your fitness journey with our professional tools.
        </p>
        <div className="flex gap-4 justify-center pt-8">
          <Link href="/register">
            <Button size="lg" className="rounded-full px-10 text-lg shadow-2xl hover:scale-105 transition-transform">Get Started</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="rounded-full px-10 text-lg hover:scale-105 transition-transform bg-background/50 backdrop-blur-sm">Log In</Button>
          </Link>
        </div>
      </div>

      <footer className="absolute bottom-6 text-sm text-muted-foreground/50">
        © {new Date().getFullYear()} BMI Pro. All rights reserved.
      </footer>
    </main>
  );
}
