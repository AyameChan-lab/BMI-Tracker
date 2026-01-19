import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", error, label, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && <label className="text-sm font-medium text-foreground/80">{label}</label>}
                <input
                    ref={ref}
                    className={`flex h-12 w-full rounded-lg border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${error ? "border-danger focus-visible:ring-danger" : ""
                        } ${className}`}
                    {...props}
                />
                {error && <p className="text-xs text-danger animate-fade-in">{error}</p>}
            </div>
        );
    }
);
Input.displayName = "Input";
