import { Paper, Typography } from "@mui/material";
export default function RulesPage() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5">Rules</Typography>
      <Typography color="text.secondary">Manage your rules here.</Typography>
    </Paper>
  );
}
