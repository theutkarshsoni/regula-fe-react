import { useMemo, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@mui/material";
import { usePositions } from "../../api/datasets";

export default function PositionsTable({ datasetId }: { datasetId: number }) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const { data, isLoading } = usePositions(datasetId, page, pageSize);

  const cols = useMemo(() => [
    "trade_date","portfolio","isin","issuer","asset_class","qty","price","notional","currency"
  ], []);

  return (
    <Paper sx={{ p: 2 }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>{cols.map(c => <TableCell key={c} sx={{ textTransform:"capitalize" }}>{c.replace("_"," ")}</TableCell>)}</TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={cols.length}>Loading…</TableCell></TableRow>
            ) : (data?.items ?? []).length === 0 ? (
              <TableRow><TableCell colSpan={cols.length}>No positions for this dataset.</TableCell></TableRow>
            ) : (
              data!.items.map((p, i) => (
                <TableRow key={i}>
                  <TableCell>{new Date(p.trade_date).toLocaleString('en-US')}</TableCell>
                  <TableCell>{p.portfolio}</TableCell>
                  <TableCell>{p.isin}</TableCell>
                  <TableCell>{p.issuer}</TableCell>
                  <TableCell>{p.asset_class}</TableCell>
                  <TableCell>{p.qty}</TableCell>
                  <TableCell>{p.price}</TableCell>
                  <TableCell>{p.notional}</TableCell>
                  <TableCell>{p.currency}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e) => { setPageSize(parseInt(e.target.value, 10)); setPage(0); }}
        rowsPerPageOptions={[10, 20, 50, 100]}
        count={data?.total ?? 0}
      />
    </Paper>
  );
}
