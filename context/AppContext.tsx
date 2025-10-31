// contexts/AppContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface Option {
  key: string;
  value: string | null;
}

interface AppContextType {
  options: Option[];
  loading: boolean;
  refreshOptions: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  const getOptions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/init`
      );
      setOptions(res.data.data.options);
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshOptions = () => {
    getOptions();
  };

  useEffect(() => {
    getOptions();
  }, []);

  return (
    <AppContext.Provider value={{ options, loading, refreshOptions }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};