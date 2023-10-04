import { createContext, useContext } from "react";
import CounterStore from "./counter.store";

class RootStore {
  constructor() {
    this.counterStore = new CounterStore();
  }
}

const rootStore = new RootStore();
const RootStoreContext = createContext();

export const RootStoreProvider = ({ children }) => {
  return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>;
};

export const useRootStore = () => {
  return useContext(RootStoreContext);
};
