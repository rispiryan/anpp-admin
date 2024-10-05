import { useEffect } from "react";

import { shoppingLoadingSelector, shoppingListSelector } from "@modules/Shopping/store/selectors";
import { getShoppingListAction, deleteShoppingAction } from "@modules/Shopping/store/actions";
import { type IDeleteShopping } from "@modules/Shopping/store/types";
import Loader from "@modules/common/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { type GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import Table from "../../components/shared/Table";
import { APP_PATHS } from "../../constants";
import { formatDate } from "../../utils";

import styles from "./Shopping.module.scss";

const Shopping = () => {
  const navigate = useNavigate();
  const loading = useSelector(shoppingLoadingSelector);
  const shoppingList = useSelector(shoppingListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShoppingListAction());
  }, [dispatch]);

  const handleDelete = (params: IDeleteShopping) => {
    dispatch(deleteShoppingAction(params));
  };

  const columns: GridColDef<(typeof shoppingList)[number]>[] = [
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
            onClick={() => navigate(`${APP_PATHS.createShopping}${row.id}`)}
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
    <div className={styles.shopping}>
      <Loader isLoading={loading} />
      <h1>Shopping</h1>
      <Button
        onClick={() => navigate(APP_PATHS.createShopping)}
        className={styles.create}
        variant="contained"
        color="primary"
        size="large"
      >
        Create
      </Button>
      <Table rows={shoppingList} columns={columns} />
    </div>
  );
};

export default Shopping;
