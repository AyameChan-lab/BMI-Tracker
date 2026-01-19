import React from "react";

export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={`rounded-2xl border border-border/50 bg-card/50 glass shadow-xl backdrop-blur-xl ${className}`}>
            {children}
        </div>
    );
}

export function CardHeader({ className = "", children }: { className?: string; children: React.ReactNode }) {
    return <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
}

export function CardTitle({ className = "", children }: { className?: string; children: React.ReactNode }) {
    return <h3 className={`font-semibold leading-none tracking-tight text-2xl ${className}`}>{children}</h3>;
}

export function CardContent({ className = "", children }: { className?: string; children: React.ReactNode }) {
    return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}

export function CardFooter({ className = "", children }: { className?: string; children: React.ReactNode }) {
    return <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>;
}
