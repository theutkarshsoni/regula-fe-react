import { Paper, Typography } from "@mui/material";
export default function LoginPage() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5">Login</Typography>
      <Typography color="text.secondary">Please enter your credentials.</Typography>
    </Paper>
  );
}
