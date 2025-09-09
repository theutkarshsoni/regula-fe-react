import { Paper, Typography } from "@mui/material";
export default function NotFoundPage() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5">404 - Not Found</Typography>
      <Typography color="text.secondary">The page you are looking for does not exist.</Typography>
    </Paper>
  );
}
