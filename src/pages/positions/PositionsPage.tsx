import { useState } from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";
import DatasetSelect from "./DatasetSelect";
import UploadDialog from "./UploadDialog";
import PositionsTable from "./PositionsTable";

export default function PositionsPage() {
  const [datasetId, setDatasetId] = useState<number>(0);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" gap={2} alignItems="center">
          <Typography variant="h5" sx={{ flex: 1 }}>Positions</Typography>
          <DatasetSelect value={datasetId} onChange={setDatasetId} />
          <Button onClick={() => setOpen(true)}>Upload</Button>
        </Stack>
      </Paper>

      {datasetId ? (
        <PositionsTable datasetId={datasetId} />
      ) : (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          Select a dataset to view positions OR upload a new one
        </Paper>
      )}

      <UploadDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
