import { TemplateImp } from "./TemplateImp";
import { Provider } from "../../context";

export interface ITemplate {
  isDebug?: boolean;
}

export const Template = (props: ITemplate) => {
  return (
    <Provider props={props}>
      <TemplateImp />
    </Provider>
  );
};
