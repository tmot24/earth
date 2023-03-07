import { FirstImp } from "./FirstImp";
import { Provider } from "../../../context";

export interface IFirst {
  isDebug?: boolean;
  isAxes?: boolean;
}

export const First = (props: IFirst) => {
  return (
    <Provider props={props}>
      <FirstImp />
    </Provider>
  );
};
