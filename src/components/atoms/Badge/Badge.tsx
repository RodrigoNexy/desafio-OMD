import { memo } from "react";
import { StyledBadge } from "./Badge.styled";

interface BadgeProps {
  variant: "success" | "warning" | "info" | "danger" | "secondary";
  children: React.ReactNode;
  className?: string;
}

export const Badge = memo<BadgeProps>(({ variant, children, className = "" }) => {
  return (
    <StyledBadge $variant={variant} className={className}>
      {children}
    </StyledBadge>
  );
});

Badge.displayName = "Badge";
