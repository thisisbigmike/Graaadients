import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
          {
            "bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20": variant === "default",
            "bg-rose-600 text-white hover:bg-rose-500": variant === "destructive",
            "border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white backdrop-blur-sm": variant === "outline",
            "bg-white/10 hover:bg-white/15 text-white": variant === "secondary",
            "hover:bg-white/5 text-slate-300 hover:text-white": variant === "ghost",
            "text-indigo-400 underline-offset-4 hover:underline": variant === "link",
          },
          {
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-lg px-3": size === "sm",
            "h-11 rounded-xl px-8": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
