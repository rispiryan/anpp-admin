import { useEffect } from "react";

import { cooperationLoadingSelector, cooperationListSelector } from "@modules/Cooperation/store/selectors";
import { deleteCooperationListAction, getCooperationListAction } from "@modules/Cooperation/store/actions";
import { type IDeleteCooperation } from "@modules/Cooperation/store/types";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@modules/common/components/Loader";
import { type GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import Table from "../../components/shared/Table";
import { APP_PATHS } from "../../constants";
import { formatDate } from "../../utils";

import styles from "./Cooperation.module.scss";

const Cooperation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(cooperationLoadingSelector);
  const cooperationList = useSelector(cooperationListSelector);

  useEffect(() => {
    dispatch(getCooperationListAction());
  }, [dispatch]);

  const handleDelete = (params: IDeleteCooperation) => {
    dispatch(deleteCooperationListAction(params));
  };

  const columns: GridColDef<(typeof cooperationList)[number]>[] = [
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
      headerName: "Link",
      field: "link",
      flex: 1,
    },
    {
      renderCell: ({ row }) => (
        <div className={styles.imageWrap}>
          <img src={`${process.env.REACT_APP_API_URL}/${row.image}`} alt={row.image} />
        </div>
      ),
      headerName: "Logo",
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
            onClick={() => navigate(`${APP_PATHS.createCooperation}${row.id}`)}
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
    <div className={styles.coopeeration}>
      <Loader isLoading={loading} />
      <h1>Cooperation</h1>
      <Button
        onClick={() => navigate(APP_PATHS.createCooperation)}
        className={styles.create}
        variant="contained"
        color="primary"
        size="large"
      >
        Create
      </Button>
      <Table rows={cooperationList} columns={columns} />
    </div>
  );
};

export default Cooperation;
