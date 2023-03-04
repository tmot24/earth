import { useEffect, useRef } from "react";
import { useContext } from "../../context";
import styles from "./Canvas.module.css";

export const Canvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const { setContext } = useContext();

  useEffect(() => {
    if (ref.current) {
      setContext((prevState: any) => ({
        ...prevState,
        canvas: ref.current,
      }));
    }
  }, []);

  return <canvas className={styles.canvas} ref={ref} />;
};
