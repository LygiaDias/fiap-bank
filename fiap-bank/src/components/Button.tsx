import React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

export default function Button({ variant = "primary", size = "md", className = "", children, ...rest }: Props) {
  const base = "rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizes = { sm: "px-3 py-1 text-sm", md: "px-4 py-2 text-base", lg: "px-6 py-3 text-lg" };
  const variants: any = {
    primary: "bg-fiapPink text-white hover:brightness-95",
    ghost: "bg-transparent border border-gray-300 text-black hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:brightness-95"
  };

  return (
    <button className={clsx(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
