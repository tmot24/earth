import {Consumer} from "./Consumer";
import {Provider} from "../../../context";

export interface IMap {
  isDebug?: boolean;
  isAxes?: boolean;
}

export const Map = (props: IMap) => {
  return (
      <Provider props={props}>
        <Consumer/>
      </Provider>
  );
};
