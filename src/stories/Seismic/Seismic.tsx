import { SeismicImp } from "./SeismicImp";
import { Provider } from "../../context";

export interface ISeismic {
  isDebug?: boolean;
}

export const Seismic = (props: ISeismic) => {
  return (
    <Provider props={props}>
      <SeismicImp />
    </Provider>
  );
};
