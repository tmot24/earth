import { useEffect, useRef } from "react";
import { useContext } from "../../context";
import { ITemplate } from "../../stories/CommonTemplate/Template";
import { DebugLayer, DebugLayerTab } from "@babylonjs/core";

/** Добавление дебага */
export const useDebugLayer = () => {
  const {
    context: { isDebug, scene },
  } = useContext<ITemplate>();

  const debugLayer = useRef<DebugLayer>();

  useEffect(() => {
    if (scene) {
      if (isDebug) {
        debugLayer.current = scene?.debugLayer;
        debugLayer.current.show({
          embedMode: true,
          initialTab: DebugLayerTab.Statistics,
        });
      } else {
        debugLayer.current?.hide();
      }
    }

    // Всё равно вылетает ошибка
    return () => {
      debugLayer.current?.hide();
    };
  }, [isDebug, scene]);
};
