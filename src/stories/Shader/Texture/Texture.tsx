import { Consumer } from "./Consumer";
import { Provider } from "../../../context";

export interface ITexture {
  isDebug?: boolean;
  isAxes?: boolean;
}

export const Texture = (props: ITexture) => {
  return (
    <Provider props={props}>
      <Consumer />
    </Provider>
  );
};
