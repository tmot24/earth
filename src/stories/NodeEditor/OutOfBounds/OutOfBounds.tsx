import { Consumer } from "./Consumer";
import { Provider } from "../../../context";

export interface IOutOfBounds {
  isDebug?: boolean;
  isAxes?: boolean;
}

export const OutOfBounds = (props: IOutOfBounds) => {
  return (
    <Provider props={props}>
      <Consumer />
    </Provider>
  );
};
