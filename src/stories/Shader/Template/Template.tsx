import { Consumer } from "./Consumer";
import { Provider } from "../../../context";

export interface ITemplate {
  isDebug?: boolean;
  isAxes?: boolean;
}

export const Template = (props: ITemplate) => {
  return (
    <Provider props={props}>
      <Consumer />
    </Provider>
  );
};
