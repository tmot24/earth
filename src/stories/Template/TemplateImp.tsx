import { Canvas } from "../../components/Canvas/Canvas";
import { useDebugLayer } from "../../hooks/useDebugLayer/useDebugLayer";
import { useInit } from "../../hooks/useInit/useInit";
import { useSphere } from "../../hooks/useSphere/useSphere";

export const TemplateImp = () => {
  useInit();
  useDebugLayer();
  useSphere();

  return <Canvas />;
};
