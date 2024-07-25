import { useState } from "react";

import "react-quill/dist/quill.snow.css";

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

  return (
    <div className={styles.container}>
      <div>{id}</div>

      <div>
        <p>Title</p>
        <ReactQuill onChange={setValue} modules={modules} value={value} theme="snow" />
      </div>
    </div>
  );
};

export default EachNews;
