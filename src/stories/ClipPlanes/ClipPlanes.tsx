import { ClipPlanesImp } from "./ClipPlanesImp";
import { Provider } from "../../context";

export interface IClipPlanes {
  clipHorizontal: number;
  clipVertical: number;
  isDebug?: boolean;
}

export const ClipPlanes = (props: IClipPlanes) => {
  return (
    <Provider props={props}>
      <ClipPlanesImp />
    </Provider>
  );
};
