import { Paper, Typography } from "@mui/material";
export default function DashboardPage() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5">Dashboard</Typography>
      <Typography color="text.secondary">KPIs and charts will appear here.</Typography>
    </Paper>
  );
}
