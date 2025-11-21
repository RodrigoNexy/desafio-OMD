import { memo } from "react";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = memo<ErrorMessageProps>(({ message }) => {
  return <p className="text-danger text-sm mt-1 mb-0">{message}</p>;
});

ErrorMessage.displayName = "ErrorMessage";
