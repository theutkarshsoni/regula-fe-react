import { api } from "./axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dataset, Position } from "../types/domain";

export function useDatasets() {
  return useQuery({
    queryKey: ["datasets"],
    queryFn: async (): Promise<Dataset[]> => (await api.get("/datasets")).data ?? [],
    staleTime: 30_000,
  });
}

export function useUploadDataset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ file, dataset_id }: { file: File; dataset_id: number }) => {
      const fd = new FormData();
      fd.append("file", file);
      return (await api.post(`/positions/upload?datasetId=${dataset_id}`, fd, { headers: { "Content-Type": "multipart/form-data" } })).data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["datasets"] }),
  });
}

export function usePositions(datasetId: number, page: number, pageSize: number) {
  return useQuery({
    queryKey: ["positions", { datasetId, page, pageSize }],
    queryFn: async (): Promise<{ items: Position[]; total: number }> => {
      const params: any = { datasetId, page, pageSize };
      const r = await api.get("/positions", { params });
      return { items: r.data.items ?? [], total: r.data.total ?? 0 };
    },
    enabled: !!datasetId,
  });
}
