import { Consumer } from "./Consumer";
import { Provider } from "../../../context";

export interface IWave {
  isDebug?: boolean;
  isAxes?: boolean;
}

export const Wave = (props: IWave) => {
  return (
    <Provider props={props}>
      <Consumer />
    </Provider>
  );
};
