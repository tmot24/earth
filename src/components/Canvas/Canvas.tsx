import { useEffect, useRef } from "react";
import { useContext } from "../../context";

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

  return (
    <canvas
      style={{ width: "100%", height: "100%", outline: "none" }}
      ref={ref}
    />
  );
};
