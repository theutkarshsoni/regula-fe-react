import { Paper, Typography } from "@mui/material";
export default function AuditPage() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5">Audit</Typography>
      <Typography color="text.secondary">View and manage audit logs here.</Typography>
    </Paper>
  );
}
