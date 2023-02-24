import { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import { AxesViewer } from "@babylonjs/core";
import { useContext } from "../../context";
import { ITemplate } from "../../stories/Template/Template";

export const useAxes = () => {
  const { context } = useContext<ITemplate>();
  const { isAxes, scene } = context;
  const axesRef = useRef<AxesViewer>();

  useEffect(() => {
    if (isAxes) {
      axesRef.current = new BABYLON.AxesViewer(scene);
    } else {
      axesRef.current?.dispose();
    }
  }, [isAxes, scene]);
};
