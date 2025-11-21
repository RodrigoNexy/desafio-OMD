import { memo } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantClasses = {
  primary: "bg-accent text-background font-semibold shadow-accent-medium hover:bg-accent-soft hover:shadow-accent-strong",
  secondary: "bg-surface text-text-primary border border-border hover:bg-surface-hover",
  danger: "bg-danger text-white hover:bg-red-600",
};

export const Button = memo<ButtonProps>(({ variant = "primary", fullWidth = false, children, className = "", disabled, ...props }) => {
  const baseClasses = "px-5 py-2.5 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:transform-none";
  const variantClass = variantClasses[variant];
  const widthClass = fullWidth ? "w-full" : "";
  const hoverClass = !disabled ? "hover:-translate-y-0.5 active:translate-y-0" : "";

  return (
    <button
      className={`${baseClasses} ${variantClass} ${widthClass} ${hoverClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
