import { useCallback, useEffect, useState, useRef } from "react";

import { Document, Page } from "react-pdf";
import toast from "react-hot-toast";
import cn from "classnames";

import UploadIcon from "../../icons/upload";
import CloseIcon from "../../icons/close";

import styles from "./ImageUploader.module.scss";

interface ImageUploaderProps {
  deleteImage?: (value: any, controlName?: string) => void;
  setImageUrls: (value: any) => void;
  otherErrorMessage?: string;
  hasErrorBlock?: boolean;
  message?: string | null;
  uploaderText?: string;
  fileTypeText?: string;
  limit?: number | null;
  controlName?: string;
  classNames?: string;
  multiple?: boolean;
  disabled?: boolean;
  fileName?: string;
  maxSize?: number;
  accept?: string;
  isBig?: boolean;
  imageUrls: any;
}

const ImageUploader = ({
  uploaderText = "Upload image here",
  accept = "image/png, image/jpeg",
  fileTypeText = "(jpg, png)",
  hasErrorBlock = false,
  maxSize = 50000000,
  disabled = false,
  message = null,
  setImageUrls,
  limit = null,
  deleteImage,
  controlName,
  classNames,
  imageUrls,
  multiple,
  fileName,
  isBig,
}: ImageUploaderProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(message);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isPdf = useCallback(
    (file: string | File) =>
      (typeof file === "string" && file.toLowerCase().endsWith(".pdf")) ||
      (file instanceof File && !file.type.includes("image")),
    [imageUrls],
  );

  useEffect(() => {
    if (message) {
      setErrorMessage(message);
    }
  }, [message]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setErrorMessage(null);
      const selectedFiles: File[] = [];
      const newFiles = Array.from(files);

      if (limit && (imageUrls?.length ? imageUrls?.length + files.length > limit : files.length > limit) && !isBig) {
        toast.error(`You can select maximum ${limit} files`);
      } else {
        newFiles.forEach((file) => {
          if (file.size > maxSize) {
            toast.error(`File size exceeds the limit (${maxSize / 1000000} MB)`);
          } else {
            const renamedFile = new File([file], fileName ? fileName : file.name, { type: file.type });
            selectedFiles.push(renamedFile);
          }
        });
      }

      if (multiple && imageUrls) {
        setImageUrls([...imageUrls, ...selectedFiles]);
      } else {
        setImageUrls([...selectedFiles]);
      }

      if (message) {
        setErrorMessage(null);
      }
    }
  };

  const handleDelete = (url: string | File) => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (imageUrls?.length) {
      setImageUrls(imageUrls?.filter((el: any) => el !== url));
    }

    if (deleteImage && typeof url === "string") {
      controlName ? deleteImage(url, controlName) : deleteImage(url);
    }
  };

  return (
    <div className={cn(styles.imageUploader, classNames)}>
      <button
        className={cn(
          styles.uploadButton,
          { [styles.bigUploadButton]: isBig },
          { [styles.hasError]: errorMessage && hasErrorBlock },
        )}
      >
        {!(errorMessage && hasErrorBlock) ? (
          <>
            <div className={styles.iconWrap}>
              <UploadIcon />
            </div>
            <p className={styles.desc}>{uploaderText}</p>
            <p className={styles.desc}>{fileTypeText}</p>
          </>
        ) : (
          <>
            <p>
              <UploadIcon />
            </p>
            <p className={styles.btnErrorText}>{errorMessage}</p>
          </>
        )}
        <input
          className={cn(styles.fileInput, {
            [styles.disabled]: disabled || (imageUrls?.length && limit) ? imageUrls.length >= Number(limit) : false,
          })}
          disabled={disabled || (imageUrls?.length && limit) ? imageUrls.length >= Number(limit) : false}
          onChange={handleImageChange}
          multiple={multiple}
          ref={fileInputRef}
          accept={accept}
          type="file"
        />
      </button>
      {!hasErrorBlock && errorMessage && <p className={styles.error}>{errorMessage}</p>}
      {!!imageUrls?.length && (
        <div className={cn([styles.documents], { [styles.bigImages]: isBig })}>
          {imageUrls?.map((imageUrl: string | File, index: number) => (
            <div key={typeof imageUrl !== "string" ? imageUrl?.name : imageUrl} className={cn(styles.image)}>
              {isPdf(imageUrl) ? (
                <>
                  <div className={styles.pdfDocumentContainer}>
                    <div className={styles.file}>
                      <Document
                        file={
                          typeof imageUrl === "string"
                            ? `${process.env.REACT_APP_BASE_URL}/${imageUrl}`
                            : URL.createObjectURL(new Blob([imageUrl]))
                        }
                      >
                        <Page pageNumber={1} width={150} />
                      </Document>
                    </div>
                    <div className={styles.fileBlock}></div>
                    <div className={styles.fileName}>
                      <p className={styles.docInfo}>{typeof imageUrl === "string" ? imageUrl : imageUrl.name}</p>
                    </div>
                  </div>
                </>
              ) : (
                <img
                  src={
                    typeof imageUrl === "string"
                      ? `${process.env.REACT_APP_API_URL}/${imageUrl}`
                      : URL.createObjectURL(new Blob([imageUrl]))
                  }
                  alt={`Uploaded ${index + 1}`}
                />
              )}
              <CloseIcon onClick={() => handleDelete(imageUrl)} className={styles.close} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
