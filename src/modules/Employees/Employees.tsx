import { useEffect } from "react";

import { employeesLoadingSelector, employeesListSelector } from "@modules/Employees/store/selectors";
import { getEmployeesListAction, deleteEmployeesAction } from "@modules/Employees/store/actions";
import { type IDeleteCooperation } from "@modules/Cooperation/store/types";
import Loader from "@modules/common/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { type GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import Table from "../../components/shared/Table";
import { APP_PATHS } from "../../constants";
import { formatDate } from "../../utils";

import styles from "./Employees.module.scss";

const Employees = () => {
  const dispatch = useDispatch();
  const loading = useSelector(employeesLoadingSelector);
  const employeesList = useSelector(employeesListSelector);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEmployeesListAction());
  }, [dispatch]);

  const handleDelete = (params: IDeleteCooperation) => {
    dispatch(deleteEmployeesAction(params));
  };

  const columns: GridColDef<(typeof employeesList)[number]>[] = [
    {
      renderCell: ({ row }) => (
        <div className={styles.titleBox}>
          <div className={styles.title}>
            <b className={styles.country}>Ar:</b> <span>{row.ar_fullName}</span>
          </div>
          <div className={styles.title}>
            <b className={styles.country}>En:</b> <span>{row.en_fullName || "-"}</span>
          </div>
          <div className={styles.title}>
            <b className={styles.country}>Ru:</b> <span>{row.ru_fullName || "-"}</span>
          </div>
        </div>
      ),
      headerName: "Full Name",
      field: "ar_FullName",
      flex: 1,
    },
    {
      renderCell: ({ row }) => (
        <div className={styles.titleBox}>
          <div className={styles.title}>
            <b className={styles.country}>Ar:</b> <span>{row.ar_rank}</span>
          </div>
          <div className={styles.title}>
            <b className={styles.country}>En:</b> <span>{row.en_rank || "-"}</span>
          </div>
          <div className={styles.title}>
            <b className={styles.country}>Ru:</b> <span>{row.ru_rank || "-"}</span>
          </div>
        </div>
      ),
      headerName: "Rank",
      field: "ar_rank",
      flex: 1,
    },
    {
      renderCell: ({ row }) => (
        <div className={styles.imageWrap}>
          <img src={`${process.env.REACT_APP_API_URL}/${row.image}`} alt={row.image} />
        </div>
      ),
      headerName: "Image",
      field: "image",
      width: 120,
    },
    {
      renderCell: ({ row }) => <>{formatDate(row.createdAt)}</>,
      headerName: "Created At",
      field: "createdAt",
      width: 180,
    },
    {
      renderCell: ({ row }) => (
        <div className={styles.buttons}>
          <Button
            onClick={() => navigate(`${APP_PATHS.createEmployees}${row.id}`)}
            variant="contained"
            color="secondary"
            size="small"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete({ image: row.image, id: row.id })}
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
    <div className={styles.employees}>
      <Loader isLoading={loading} />
      <h1>Employees</h1>
      <Button
        onClick={() => navigate(APP_PATHS.createEmployees)}
        className={styles.create}
        variant="contained"
        color="primary"
        size="large"
      >
        Create
      </Button>
      <Table rows={employeesList} columns={columns} />
    </div>
  );
};

export default Employees;
