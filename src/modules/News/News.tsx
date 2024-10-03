import { useEffect } from "react";

import { newsLoadingSelector, newsListSelector } from "@modules/News/store/selectors";
import { getNewsListAction, deleteNewsAction } from "@modules/News/store/actions";
import { type IDeleteNews } from "@modules/News/store/types";
import Loader from "@modules/common/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { type GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import Table from "../../components/shared/Table";
import { APP_PATHS } from "../../constants";
import { formatDate } from "../../utils";

import styles from "./News.module.scss";

const News = () => {
  const loading = useSelector(newsLoadingSelector);
  const navigate = useNavigate();
  const users = useSelector(newsListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewsListAction());
  }, [dispatch]);

  const handleDelete = (params: IDeleteNews) => {
    dispatch(deleteNewsAction(params));
  };

  const columns: GridColDef<(typeof users)[number]>[] = [
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
      headerName: "Description",
      field: "ar_description",
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
            onClick={() => navigate(`${APP_PATHS.createNews}${row.id}`)}
            variant="contained"
            color="secondary"
            size="small"
          >
            Edit
          </Button>
          <Button
            onClick={() =>
              handleDelete({
                deletedImages: `${row?.image}${row.contentImages1 ? "," + row.contentImages1 : ""}${row.contentImages2 ? "," + row.contentImages2 : ""}`,
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
    <div className={styles.news}>
      <Loader isLoading={loading} />
      <h1>News</h1>
      <Button
        onClick={() => navigate(APP_PATHS.createNews)}
        className={styles.create}
        variant="contained"
        color="primary"
        size="large"
      >
        Create
      </Button>
      <Table columns={columns} rows={users} />
    </div>
  );
};

export default News;
