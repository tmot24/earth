import { ReactNode, useEffect, useState } from "react";
import { Context, TContext } from "./Context";
import { SetContext } from "./SetContext";

interface IProvider<T extends object> {
  props: T;
  children: ReactNode;
}

export const Provider = <T extends object>({
  props,
  children,
}: IProvider<T>) => {
  const [context, setContext] = useState<TContext<T>>({
    ...props,
    canvas: null,
  });

  useEffect(() => {
    setContext((prevState) => ({
      ...prevState,
      ...props,
    }));
  }, [props]);

  return (
    <Context.Provider value={context}>
      <SetContext.Provider value={{ setContext }}>
        {children}
      </SetContext.Provider>
    </Context.Provider>
  );
};
