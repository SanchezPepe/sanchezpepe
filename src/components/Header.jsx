import React from 'react';
import DarkModeToggle from './DarkModeToggle';

const Header = ({ isDark, toggleDarkMode, data }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 no-print">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <span className="text-lg">👨🏻‍💻</span>
          </div>
          <span className="font-bold text-lg tracking-tight">{data.personal.name}</span>
        </div>
        <DarkModeToggle isDark={isDark} onToggle={toggleDarkMode} />
      </div>
    </nav>
  );
};

export default Header;