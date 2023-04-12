import { Consumer } from "./Consumer";
import { Provider } from "../../../context";

export interface IUseCases {
  isDebug?: boolean;
  isAxes?: boolean;
  float: number;
}

export const UseCases = (props: IUseCases) => {
  return (
    <Provider props={props}>
      <Consumer />
    </Provider>
  );
};
