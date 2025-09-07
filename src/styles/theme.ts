import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    "fontFamily": `"Inter", "Helvetica", "Arial", sans-serif`,
  },
  palette: {
    background: { default: "#f6f7f9", paper: "#ffffff" },
    text: { primary: "#111827", secondary: "#6b7280" },
    primary: { main: "#2563eb" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiPaper: { styleOverrides: { root: { border: "1px solid #e5e7eb" } } },
    MuiButton: { defaultProps: { variant: "contained" } },
  },
});
