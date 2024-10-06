import { useEffect } from "react";

import { departmentLoadingSelector, departmentListSelector } from "@modules/Department/store/selectors";
import { getDepartmentListAction, deleteDepartmentAction } from "@modules/Department/store/actions";
import { type IDeleteDepartment } from "@modules/Department/store/types";
import Loader from "@modules/common/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { type GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import Table from "../../components/shared/Table";
import { APP_PATHS } from "../../constants";
import { formatDate } from "../../utils";

import styles from "./Department.module.scss";

const Department = () => {
  const navigate = useNavigate();
  const loading = useSelector(departmentLoadingSelector);
  const departmentList = useSelector(departmentListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartmentListAction());
  }, [dispatch]);

  const handleDelete = (params: IDeleteDepartment) => {
    dispatch(deleteDepartmentAction(params));
  };

  const columns: GridColDef<(typeof departmentList)[number]>[] = [
    {
      renderCell: ({ row }) => (
        <div className={styles.titleBox}>
          <div className={styles.title}>
            <b className={styles.country}>Ar:</b> <span>{row.ar_title}</span>
          </div>
          <div className={styles.title}>
            <b className={styles.country}>En:</b> <span>{row.en_title || "-"}</span>
          </div>
          <div className={styles.title}>
            <b className={styles.country}>Ru:</b> <span>{row.ru_title || "-"}</span>
          </div>
        </div>
      ),
      headerName: "Titles",
      field: "ar_title",
      flex: 1,
    },
    {
      renderCell: ({ row }) => <>{row.slug}</>,
      headerName: "Slug",
      field: "slug",
      width: 180,
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
            onClick={() => navigate(`${APP_PATHS.createDepartment}${row.id}`)}
            variant="contained"
            color="secondary"
            size="small"
          >
            Edit
          </Button>
          <Button
            onClick={() =>
              handleDelete({
                deletedImages: `${row?.attachedFiles ? row.attachedFiles : ""}${row.contentImages1 ? "," + row.contentImages1 : ""}${row.contentImages2 ? "," + row.contentImages2 : ""}`,
                id: row.id,
              })
            }
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
    <div className={styles.department}>
      <Loader isLoading={loading} />
      <h1>Department</h1>
      <Button
        onClick={() => navigate(APP_PATHS.createDepartment)}
        className={styles.create}
        variant="contained"
        color="primary"
        size="large"
      >
        Create
      </Button>
      <Table rows={departmentList} columns={columns} />
    </div>
  );
};

export default Department;
