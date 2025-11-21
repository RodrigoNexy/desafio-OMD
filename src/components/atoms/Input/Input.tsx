import { memo } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Input = memo<InputProps>(({ hasError = false, className = "", ...props }) => {
  const baseClasses = "w-full px-3 py-3 text-base rounded-xl transition-all duration-200 focus:outline-none disabled:bg-surface-muted disabled:cursor-not-allowed";
  const errorClasses = hasError
    ? "border-danger focus:border-danger focus:shadow-[0_0_0_1px_#dc3545,0_18px_48px_rgba(220,53,69,0.12)]"
    : "border-border focus:border-accent focus:shadow-[0_0_0_1px_#00d4ff,0_18px_48px_rgba(0,212,255,0.12)]";

  return (
    <input
      className={`${baseClasses} ${errorClasses} ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";

export const Textarea = memo<TextareaProps>(({ hasError = false, className = "", ...props }) => {
  const baseClasses = "w-full px-3 py-3 text-base rounded-xl transition-all duration-200 focus:outline-none font-inherit resize-y min-h-[100px] disabled:bg-surface-muted disabled:cursor-not-allowed";
  const errorClasses = hasError
    ? "border-danger focus:border-danger focus:shadow-[0_0_0_1px_#dc3545,0_18px_48px_rgba(220,53,69,0.12)]"
    : "border-border focus:border-accent focus:shadow-[0_0_0_1px_#00d4ff,0_18px_48px_rgba(0,212,255,0.12)]";

  return (
    <textarea
      className={`${baseClasses} ${errorClasses} ${className}`}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
