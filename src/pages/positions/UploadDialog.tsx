import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Alert, Stack } from "@mui/material";
import Papa from "papaparse";
import { api } from "../../api/axios";
import { useUploadDataset } from "../../api/datasets";

export default function UploadDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<any[]>([]);
  const { mutateAsync, isPending } = useUploadDataset();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0] ?? null;
    setFile(newFile);
    setError(null);
    setPreview([]);
    if (!newFile) return;
    Papa.parse(newFile, {
      header: true,
      skipEmptyLines: true,
      complete: (res: any) => setPreview((res.data as any[]).slice(0, 10)),
      error: (err: any) => setError(err.message),
    });
  };

  const onUpload = async () => {
    if (!file) return;
    try {
      const res = await api.post("/datasets");
      if (res.data?.id) {
        await mutateAsync({ file: file, dataset_id: res.data.id });
        onClose();
      } else {
        setError("Dataset creation failed");
      }
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Upload failed");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Upload Dataset (CSV)</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <input type="file" accept=".csv" onChange={onFileChange} />
          {error && <Alert severity="error">{error}</Alert>}
          {preview.length > 0 && (
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr>{Object.keys(preview[0]).map((h) => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>{preview.map((r, i) => <tr key={i}>{Object.values(r).map((v, j) => <td key={j}>{String(v)}</td>)}</tr>)}</tbody>
              </table>
            </div>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text">Cancel</Button>
        <Button onClick={onUpload} disabled={!file || isPending}>{isPending ? "Uploading…" : "Upload"}</Button>
      </DialogActions>
    </Dialog>
  );
}
