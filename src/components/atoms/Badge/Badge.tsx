import { memo } from "react";

interface BadgeProps {
  variant: "success" | "warning" | "info" | "danger" | "secondary";
  children: React.ReactNode;
  className?: string;
}

const variantClasses = {
  success: "bg-accent text-background",
  warning: "bg-warning text-background",
  info: "bg-info text-white",
  danger: "bg-danger text-white",
  secondary: "bg-surface text-text-secondary border border-border",
};

export const Badge = memo<BadgeProps>(({ variant, children, className = "" }) => {
  const baseClasses = "inline-block px-3 py-1 text-sm font-semibold rounded-full";
  const variantClass = variantClasses[variant];

  return (
    <span className={`${baseClasses} ${variantClass} ${className}`}>
      {children}
    </span>
  );
});

Badge.displayName = "Badge";
