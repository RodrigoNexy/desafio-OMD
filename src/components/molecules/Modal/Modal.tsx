import { memo, ReactNode, useEffect, useCallback } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const Modal = memo<ModalProps>(({ isOpen, onClose, title, children, footer }) => {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[1000] transition-opacity duration-200"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-surface rounded-xl p-8 max-w-[500px] w-[90%] max-h-[90vh] overflow-y-auto border border-border shadow-dark-xl transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
          <h2 className="m-0 text-2xl font-bold text-text-primary">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="bg-transparent border-none text-2xl cursor-pointer text-text-secondary p-0 w-8 h-8 flex items-center justify-center rounded transition-colors hover:bg-surface-hover hover:text-text-primary"
          >
            ×
          </button>
        </div>
        <div className="mb-6">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 pt-4 border-t border-border">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
});

Modal.displayName = "Modal";
