import { useContext } from "../../context";
import { useEffect } from "react";
import { InitBabylon } from "./InitBabylon";

/** Инициализация движка */
export const useInit = <T extends object>() => {
  const { context, setContext } = useContext<T>();
  const { canvas } = context;

  useEffect(() => {
    if (canvas) {
      const { scene, camera } = new InitBabylon(canvas);

      setContext((prevState) => ({
        ...prevState,
        scene,
        camera,
      }));
    }
  }, [canvas]);
};
