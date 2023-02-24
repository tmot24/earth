import { createContext, Dispatch, SetStateAction } from "react";
import { TContext } from "./Context";

export type TSetContext<T extends object> = {
  setContext: Dispatch<SetStateAction<TContext<T>>>;
};

// @ts-ignore
export const SetContext = createContext<TSetContext<T>>({
  setContext: () => {},
});
