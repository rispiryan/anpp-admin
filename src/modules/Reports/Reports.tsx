import { useEffect } from "react";

import { reportsLoadingSelector, reportsListSelector } from "@modules/Reports/store/selectors";
import { getReportsListAction, deleteReportsAction } from "@modules/Reports/store/actions";
import { type IDeleteReports } from "@modules/Reports/store/types";
import Loader from "@modules/common/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { type GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import Table from "../../components/shared/Table";
import { APP_PATHS } from "../../constants";
import { formatDate } from "../../utils";

import styles from "./Reports.module.scss";

const Reports = () => {
  const loading = useSelector(reportsLoadingSelector);
  const navigate = useNavigate();
  const reportsList = useSelector(reportsListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReportsListAction());
  }, [dispatch]);

  const handleDelete = (params: IDeleteReports) => {
    dispatch(deleteReportsAction(params));
  };

  const columns: GridColDef<(typeof reportsList)[number]>[] = [
    {
      renderCell: ({ row }) => <div className={styles.callDada}>{row.fileName}</div>,
      headerName: "File Name",
      field: "fileName",
      flex: 1,
    },
    {
      renderCell: ({ row }) => (
        <div className={styles.callDada}>{Math.floor(Number(row.file.split("@")[1]) / 1024) + "-KB"}</div>
      ),
      headerName: "Size",
      field: "file",
      flex: 1,
    },
    {
      renderCell: ({ row }) => <div className={styles.callDada}>{formatDate(row.createdAt)}</div>,
      headerName: "Created At",
      field: "createdAt",
      flex: 1,
    },
    {
      renderCell: ({ row }) => (
        <div className={styles.buttons}>
          <Button
            onClick={() => navigate(`${APP_PATHS.createReports}${row.id}`)}
            variant="contained"
            color="secondary"
            size="small"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete({ file: row.file, id: row.id })}
            className={styles.delete}
            variant="contained"
            color="error"
            size="small"
          >
            Delete
          </Button>
        </div>
      ),
      disableColumnMenu: false,
      headerName: "Actions",
      field: "actions",
      sortable: false,
      width: 170,
    },
  ];

  return (
    <div className={styles.reports}>
      <Loader isLoading={loading} />
      <h1>Reports</h1>
      <Button
        onClick={() => navigate(APP_PATHS.createReports)}
        className={styles.create}
        variant="contained"
        color="primary"
        size="large"
      >
        Create
      </Button>
      <Table rows={reportsList} columns={columns} />
    </div>
  );
};

export default Reports;
