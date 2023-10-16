import { Consumer } from "./Consumer";
import { Provider } from "../../context";

export interface ITwoDimensional {
  isDebug?: boolean;
  isAxes?: boolean;
}

export const TwoDimensional = (props: ITwoDimensional) => {
  return (
    <Provider props={props}>
      <Consumer />
    </Provider>
  );
};
