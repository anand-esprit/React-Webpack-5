import { createContext, useContext } from "react";
import { Context } from "vm";
import AuthStore from "./AuthStore/AuthStore";
import RootStore from "./RootStore/RootStore";
import DashboardStore from "./DashboardStore/DashboardStore";
import AppMasterStore from "./AppMasterStore/AppMasterStore";
import LOVStore from "./GeneralStore/LOVStore";

const AppContext = createContext({
  ROOT: new RootStore(),
  AUTH: new AuthStore(),
  DASHBOARD_STORE: new DashboardStore(),
  APP_MASTER_STORE: new AppMasterStore(),
  LOV_STORE: new LOVStore(),
});

const useStore = (): Context => useContext(AppContext);

export default useStore;
