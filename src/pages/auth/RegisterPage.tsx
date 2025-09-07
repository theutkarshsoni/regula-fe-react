import { Paper, Typography } from "@mui/material";
export default function RegisterPage() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5">Register</Typography>
      <Typography color="text.secondary">Please fill in the details to register.</Typography>
    </Paper>
  );
}
