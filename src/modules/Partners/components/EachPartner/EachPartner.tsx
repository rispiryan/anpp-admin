import { type ChangeEvent, useState } from "react";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { TextField, Button, styled } from "@mui/material";
import { useParams } from "react-router-dom";

import styles from "./EachPartner.module.scss";

const VisuallyHiddenInput = styled("input")({
  clipPath: "inset(50%)",
  clip: "rect(0 0 0 0)",
  position: "absolute",
  whiteSpace: "nowrap",
  overflow: "hidden",
  height: 1,
  bottom: 0,
  width: 1,
  left: 0,
});

const EachPartner = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [img, setImg] = useState<string>("");

  const handleSubmit = () => {
    console.log({
      title,
      link,
      img,
    });
  };

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImg(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <div>{id}</div>

      <div className={styles.form}>
        <TextField onChange={(e) => setTitle(e.target.value)} label="Title" value={title} />
        <TextField onChange={(e) => setLink(e.target.value)} label="Link" value={link} />
        <Button startIcon={<CloudUploadIcon />} variant="contained" component="label" role={undefined} tabIndex={-1}>
          Upload file
          <VisuallyHiddenInput onChange={handleOnUpload} accept="image/*" type="file" />
        </Button>
        {img && <img src={img} alt="#" />}
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default EachPartner;
