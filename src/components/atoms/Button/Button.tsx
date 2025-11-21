import { memo } from "react";
import { StyledButton } from "./Button.styled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = memo<ButtonProps>(({ variant = "primary", fullWidth = false, children, className = "", disabled, ...props }) => {
  return (
    <StyledButton
      $variant={variant}
      $fullWidth={fullWidth}
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </StyledButton>
  );
});

Button.displayName = "Button";
