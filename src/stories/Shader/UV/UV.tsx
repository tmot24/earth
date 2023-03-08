import { UVImp } from "./UVImp";
import { Provider } from "../../../context";

export interface IUV {
  isDebug?: boolean;
  isAxes?: boolean;
  startColor: number;
  endColor: number;
}

export const UV = (props: IUV) => {
  return (
    <Provider props={props}>
      <UVImp />
    </Provider>
  );
};
