import { memo, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../atoms";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = memo<LayoutProps>(({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-surface border-b border-border py-6 px-8 shadow-dark">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="no-underline">
            <img
              src="/logo-300x160.webp"
              alt="OMD SOLUÇÕES"
              className="h-12 w-auto"
            />
          </Link>
          {!isHome && (
            <Link to="/">
              <Button variant="secondary" className="!bg-surface !text-text-primary !border-border hover:!bg-surface-hover">
                ← Voltar
              </Button>
            </Link>
          )}
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto p-8">
        {children}
      </main>
      <footer className="bg-surface-muted border-t border-border text-text-secondary py-4 px-8 text-center text-sm">
        <p className="m-0">© 2025 Sistema de Plano de Ação - OMD Soluções</p>
      </footer>
    </div>
  );
});

Layout.displayName = "Layout";
