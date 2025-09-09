import { type PropsWithChildren, useEffect } from "react";
import { initAuth } from "../../store/auth";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../../styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const qc = new QueryClient();

export function AppProviders({ children }: PropsWithChildren) {
  useEffect(() => {
    initAuth();
  }, []);

  return (
    <QueryClientProvider client={qc}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
