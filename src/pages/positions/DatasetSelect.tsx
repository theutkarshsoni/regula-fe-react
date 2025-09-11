import { FormControl, InputLabel, Select, MenuItem, Skeleton } from "@mui/material";
import { useDatasets } from "../../api/datasets";

export default function DatasetSelect({ value, onChange }: { value?: number; onChange: (id: number) => void }) {
  const { data, isLoading } = useDatasets();

  if (isLoading) return <Skeleton width={240} height={40} />;

  console.log("Datasets:", data);

  return (
    <FormControl size="small" sx={{ minWidth: 240 }}>
      <InputLabel id="ds-label">Dataset</InputLabel>
      <Select labelId="ds-label" label="Dataset" value={value ?? ""} onChange={(e) => onChange(Number(e.target.value))}>
        {data?.map(d => (
          <MenuItem key={d.id} value={d.id}>
            {d.name ?? `Dataset #${d.id}`} • {new Date(d.created_at).toLocaleDateString()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
