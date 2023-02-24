import { Canvas } from "../../components/Canvas/Canvas";
import { useDebugLayer } from "../../hooks/useDebugLayer/useDebugLayer";
import { useInit } from "../../hooks/useInit/useInit";
import { useSphere } from "../../hooks/useSphere/useSphere";
import { useAxes } from "../../hooks/useAxes/useAxes";

export const TemplateImp = () => {
  useInit();
  useAxes();
  useDebugLayer();
  useSphere();

  return <Canvas />;
};
