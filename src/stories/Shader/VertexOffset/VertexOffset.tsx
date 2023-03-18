import { Consumer } from "./Consumer";
import { Provider } from "../../../context";

export interface IVertexOffset {
  isDebug?: boolean;
  isAxes?: boolean;
}

export const VertexOffset = (props: IVertexOffset) => {
  return (
    <Provider props={props}>
      <Consumer />
    </Provider>
  );
};
