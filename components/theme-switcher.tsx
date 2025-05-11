'use client';

import { useTheme } from '@/lib/theme-provider';
import { Sun, Moon, Palette } from 'lucide-react';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2 p-2 rounded-lg">
      <button
        onClick={() => setTheme('orange')}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
          theme === 'orange' ? 'scale-110 ring-2 ring-primary' : 'opacity-70'
        }`}
        style={{ backgroundColor: '#f97316' }}
        aria-label="Switch to orange theme"
      >
        <Sun className="h-4 w-4 text-white" />
      </button>
      <button
        onClick={() => setTheme('blue')}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
          theme === 'blue' ? 'scale-110 ring-2 ring-primary' : 'opacity-70'
        }`}
        style={{ backgroundColor: '#3b82f6' }}
        aria-label="Switch to blue theme"
      >
        <Palette className="h-4 w-4 text-white" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
          theme === 'dark' ? 'scale-110 ring-2 ring-primary' : 'opacity-70'
        }`}
        style={{ backgroundColor: '#1e3a8a' }}
        aria-label="Switch to dark theme"
      >
        <Moon className="h-4 w-4 text-white" />
      </button>
    </div>
  );
}