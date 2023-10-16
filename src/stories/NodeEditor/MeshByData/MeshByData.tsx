import { Consumer } from "./Consumer";
import { Provider } from "../../../context";

export interface IMeshByData {
  isDebug?: boolean;
  isAxes?: boolean;
}

export const MeshByData = (props: IMeshByData) => {
  return (
    <Provider props={props}>
      <Consumer />
    </Provider>
  );
};
