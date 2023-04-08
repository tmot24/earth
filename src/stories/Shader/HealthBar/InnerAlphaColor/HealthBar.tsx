import { Consumer } from "./Consumer";
import { Provider } from "../../../../context";

export interface IHealthBar {
  isDebug?: boolean;
  isAxes?: boolean;
  health: number;
}

export const HealthBar = (props: IHealthBar) => {
  return (
    <Provider props={props}>
      <Consumer />
    </Provider>
  );
};
