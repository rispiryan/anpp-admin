import { useEffect, useState, useRef } from "react";

import styles from "./Loader.module.scss";

interface IProps {
  isLoading: boolean;
}

const Loader = ({ isLoading }: IProps) => {
  const [isInnerLoading, setIsInnerLoading] = useState(false);
  const timeOutRef = useRef(0);

  useEffect(() => {
    const timeOutId = timeOutRef.current;

    if (!isLoading && isInnerLoading) {
      timeOutRef.current = window.setTimeout(() => {
        setIsInnerLoading(false);
      }, 300);
    } else if (isLoading && !isInnerLoading) {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }

      setIsInnerLoading(true);
    }

    return () => {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
    };
  }, [isInnerLoading, isLoading]);

  if (!isInnerLoading) {
    return null;
  }

  return (
    <div className={styles.fade}>
      <div className={styles.lineScale}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;
