import { useEffect } from "react";

import { cooperationLoadingSelector, cooperationListSelector } from "@modules/cooperation/store/selectors";
import { deleteCooperationListAction, getCooperationListAction } from "@modules/cooperation/store/actions";
import { type IDeleteCooperation } from "@modules/cooperation/store/types";
import { useDispatch, useSelector } from "react-redux";
import { type GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";

import Table from "../../components/shared/Table";

import styles from "./Cooperation.module.scss";

const Cooperation = () => {
  const dispatch = useDispatch();
  const loading = useSelector(cooperationLoadingSelector);
  const cooperationList = useSelector(cooperationListSelector);

  useEffect(() => {
    dispatch(getCooperationListAction());
  }, [dispatch]);

  const handleDelete = (params: IDeleteCooperation) => {
    dispatch(deleteCooperationListAction(params));
  };

  const columns: GridColDef<(typeof cooperationList)[number]>[] = [
    { headerName: "ID", field: "id", width: 90 },
    {
      headerName: "Title",
      field: "title",
      flex: 1,
    },
    {
      headerName: "Link",
      field: "link",
      flex: 1,
    },
    {
      headerName: "Logo",
      field: "image",
      flex: 1,
    },
    {
      headerName: "Created At",
      field: "createdAt",
      flex: 1,
    },
    {
      renderCell: ({ row }) => (
        <div className={styles.buttons}>
          <Button variant="contained" color="secondary">
            Edit
          </Button>
          <Button
            onClick={() => handleDelete({ image: row.image, id: row.id })}
            className={styles.delete}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </div>
      ),
      disableColumnMenu: false,
      headerName: "Actions",
      field: "actions",
      sortable: false,
      width: 250,
    },
  ];
  console.log(loading, "loading");

  return (
    <div className={styles.coopeeration}>
      <Button className={styles.create} variant="contained" color="primary" size="large">
        Create
      </Button>
      <Table rows={cooperationList} columns={columns} />
    </div>
  );
};

export default Cooperation;
