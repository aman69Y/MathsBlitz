
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-monkeyDark text-monkeyYellow flex flex-col">
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="py-4 text-center text-xs text-monkeyLight">
        <p className="opacity-50">© {new Date().getFullYear()} MathBlitz Game • Test your math skills against the clock</p>
        <p className="mt-1">Made with love by Aman</p>
      </footer>
    </div>
  );
};

export default Layout;
