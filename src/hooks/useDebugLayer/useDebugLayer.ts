import { useEffect } from "react";
import { useContext } from "../../context";
import { ITemplate } from "../../stories/Template/Template";

/** Добавление дебага */
export const useDebugLayer = () => {
  const {
    context: { isDebug, scene },
  } = useContext<ITemplate>();

  useEffect(() => {
    if (scene) {
      if (isDebug) {
        scene?.debugLayer?.show({
          embedMode: true,
        });
      } else {
        scene?.debugLayer?.hide();
      }
    }
  }, [isDebug, scene]);
};
