import { Canvas } from "../../components/Canvas/Canvas";
import { useDebugLayer } from "../../hooks/useDebugLayer/useDebugLayer";
import { useInit } from "../../hooks/useInit/useInit";
import { useSphere } from "../../hooks/useSphere/useSphere";
import { useAxes } from "../../hooks/useAxes/useAxes";
import { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import { useContext } from "../../context";

export const Consumer = () => {
  const {
    context: { scene, camera },
  } = useContext<any>();

  useInit();
  useAxes();
  useDebugLayer();
  useSphere();

  useEffect(() => {}, [scene]);

  useEffect(() => {}, []);

  return <Canvas />;
};
