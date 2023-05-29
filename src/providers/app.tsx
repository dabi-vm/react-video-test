import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <Router>{children}</Router>
    </React.Suspense>
  );
};
