import { BasicImp } from "./BasicImp";
import { Provider } from "../../context";

export interface IBasic {
  isDebug?: boolean;
}

export const Basic = (props: IBasic) => {
  return (
    <Provider props={props}>
      <BasicImp />
    </Provider>
  );
};
