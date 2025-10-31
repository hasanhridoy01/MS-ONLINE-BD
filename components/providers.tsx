// components/providers.tsx
"use client";

import { AppProvider } from "@/context/AppContext";
import AuthContextProvider from "@/context/AuthContext";
import { ThemeProvider } from "@/lib/theme-provider";
import { SnackbarProvider } from 'notistack';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AuthContextProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SnackbarProvider 
            maxSnack={3}
            autoHideDuration={3000}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </AuthContextProvider>
    </AppProvider>
  );
}