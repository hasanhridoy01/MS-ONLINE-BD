"use client";

import AuthContextProvider from "@/context/AuthContext";
import { ThemeProvider } from "@/lib/theme-provider";
import { SnackbarProvider } from 'notistack';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <SnackbarProvider 
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}