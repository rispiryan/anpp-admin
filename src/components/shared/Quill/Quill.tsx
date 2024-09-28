import "react-quill/dist/quill.snow.css";

import ReactQuill from "react-quill";

import styles from "./Quill.module.scss";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link"],
    ["clean"],
  ],
};

const Quill = (props: any) => (
  <div className={styles.quill}>
    <ReactQuill className={styles.richText} {...props} modules={modules} theme="snow" />
  </div>
);

export default Quill;
