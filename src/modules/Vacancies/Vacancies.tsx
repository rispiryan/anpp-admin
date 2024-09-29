import { useEffect } from "react";

import { vacanciesLoadingSelector, vacanciesListSelector } from "@modules/Vacancies/store/selectors";
import { getVacanciesListAction, deleteVacanciesAction } from "@modules/Vacancies/store/actions";
import { type IDeleteVacancies } from "@modules/Vacancies/store/types";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@modules/common/components/Loader";
import { type GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import Table from "../../components/shared/Table";
import { APP_PATHS } from "../../constants";
import { formatDate } from "../../utils";

import styles from "./Vacancies.module.scss";

const Vacancies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vacancies = useSelector(vacanciesListSelector);
  const loading = useSelector(vacanciesLoadingSelector);

  const handleDelete = (params: IDeleteVacancies) => {
    dispatch(deleteVacanciesAction(params));
  };

  useEffect(() => {
    dispatch(getVacanciesListAction());
  }, [dispatch]);

  const columns: GridColDef<(typeof vacancies)[number]>[] = [
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
      renderCell: ({ row }) => (
        <div className={styles.titleBox}>
          <div className={styles.title}>
            <b className={styles.country}>Ar:</b> <span>{row.ar_description}</span>
          </div>
          <div className={styles.title}>
            <b className={styles.country}>En:</b> <span>{row.en_description || "-"}</span>
          </div>
          <div className={styles.title}>
            <b className={styles.country}>Ru:</b> <span>{row.ru_description || "-"}</span>
          </div>
        </div>
      ),
      headerName: "Descriptions",
      field: "ar_description",
      flex: 1,
    },
    {
      headerName: "Link",
      field: "link",
      flex: 1,
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
            onClick={() => navigate(`${APP_PATHS.createVacancies}${row.id}`)}
            variant="contained"
            color="secondary"
            size="small"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete({ id: row.id })}
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
    <div className={styles.vacancies}>
      <h1>Vacancies</h1>
      <Loader isLoading={loading} />
      <Button
        onClick={() => navigate(APP_PATHS.createVacancies)}
        className={styles.create}
        variant="contained"
        color="primary"
        size="large"
      >
        Create
      </Button>
      <Table columns={columns} rows={vacancies} />
    </div>
  );
};

export default Vacancies;
