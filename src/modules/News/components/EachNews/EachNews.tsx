import { useState } from "react";

import "react-quill/dist/quill.snow.css";

import { TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";

import styles from "./EachNews.module.scss";
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"],
  ],
};

const EachNews = () => {
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");

  const handleClick = () => {
    console.log({
      value,
      title,
    });
  };

  return (
    <div className={styles.container}>
      <div>{id}</div>

      <div className={styles.form}>
        <TextField onChange={(e) => setTitle(e.target.value)} label="Title" value={title} />
        <ReactQuill className={styles.richText} onChange={setValue} modules={modules} value={value} theme="snow" />
        <Button onClick={handleClick} variant="contained">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default EachNews;
