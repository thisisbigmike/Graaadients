import * as React from "react";
import { cn } from "@/lib/utils";

export function Breadcrumb({ children, className, ...props }: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav aria-label="breadcrumb" className={className} {...props}>
      {children}
    </nav>
  );
}

export function BreadcrumbList({ children, className, ...props }: React.ComponentPropsWithoutRef<"ol">) {
  return (
    <ol className={cn("flex flex-wrap items-center gap-2 break-words text-sm text-slate-400", className)} {...props}>
      {children}
    </ol>
  );
}

export function BreadcrumbItem({ children, className, ...props }: React.ComponentPropsWithoutRef<"li">) {
  return (
    <li className={cn("inline-flex items-center gap-2", className)} {...props}>
      {children}
    </li>
  );
}

export function BreadcrumbLink({ href, children, className, ...props }: React.ComponentPropsWithoutRef<"a"> & { href: string }) {
  return (
    <a href={href} className={cn("transition-colors hover:text-white", className)} {...props}>
      {children}
    </a>
  );
}

export function BreadcrumbPage({ children, className, ...props }: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span role="link" aria-disabled="true" aria-current="page" className={cn("font-normal text-white", className)} {...props}>
      {children}
    </span>
  );
}

export function BreadcrumbSeparator({ children, className, ...props }: React.ComponentPropsWithoutRef<"li">) {
  return (
    <li role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5 text-slate-500", className)} {...props}>
      {children || "/"}
    </li>
  );
}
