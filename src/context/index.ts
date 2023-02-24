import { useContext as useReactContext } from "react";
import { Context, TContext } from "./Context";
import { SetContext, TSetContext } from "./SetContext";

export const useContext = <T extends object>() => {
  const context = useReactContext<TContext<T>>(Context);
  const { setContext } = useReactContext<TSetContext<T>>(SetContext);

  return { context, setContext };
};

export * from "./Provider";
