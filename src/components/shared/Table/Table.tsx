import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import styles from "./Table.module.scss";

type ITable = {
  columns: any[];
  rows: any[];
};

export default function Table({ columns, rows }: ITable) {
  return (
    <Box className={styles.table}>
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        columns={columns}
        rows={rows}
        disableRowSelectionOnClick
      />
    </Box>
  );
}