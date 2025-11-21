import { memo, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

interface CardHeaderProps {
  title: string | ReactNode;
  actions?: ReactNode;
}

interface CardFooterProps {
  children: ReactNode;
}

export const Card = memo<CardProps>(({ children, className = "" }) => {
  return (
    <div className={`bg-surface rounded-xl p-6 border border-border shadow-dark transition-all duration-300 hover:border-accent ${className}`}>
      {children}
    </div>
  );
});

Card.displayName = "Card";

export const CardHeaderComponent = memo<CardHeaderProps>(({ title, actions }) => {
  return (
    <div className="flex justify-between items-start mb-5 pb-4 border-b border-border">
      {typeof title === 'string' ? (
        <h3 className="m-0 text-xl font-bold text-text-primary">{title}</h3>
      ) : (
        title
      )}
      {actions && <div className="flex-shrink-0">{actions}</div>}
    </div>
  );
});

CardHeaderComponent.displayName = "CardHeader";

export const CardContentComponent = memo<{ children: ReactNode }>(({ children }) => {
  return <div className="text-text-secondary leading-relaxed">{children}</div>;
});

CardContentComponent.displayName = "CardContent";

export const CardFooterComponent = memo<CardFooterProps>(({ children }) => {
  return (
    <div className="mt-5 pt-4 border-t border-border">
      {children}
    </div>
  );
});

CardFooterComponent.displayName = "CardFooter";
