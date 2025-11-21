import { memo } from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const Label = memo<LabelProps>(({ children, className = "", ...props }) => {
  return (
    <label className={`block font-semibold mb-2 text-text-primary text-sm ${className}`} {...props}>
      {children}
    </label>
  );
});

Label.displayName = "Label";
