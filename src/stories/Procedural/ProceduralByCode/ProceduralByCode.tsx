import { Consumer } from "./Consumer";
import { Provider } from "../../../context";

export interface IProceduralByCode {
  isDebug?: boolean;
  isAxes?: boolean;
}

export const ProceduralByCode = (props: IProceduralByCode) => {
  return (
    <Provider props={props}>
      <Consumer />
    </Provider>
  );
};
