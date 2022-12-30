import { createContext, useContext } from "react";
import { Context } from "vm";
import AllTransactionStore from "./AllTransactionStore/AllTransactionStore";
import AuthStore from "./AuthStore/AuthStore";
import RootStore from "./RootStore/RootStore";
import UserStore from "./UserStore/UserStore";

const AppContext = createContext({
	ROOT: new RootStore(),
	AUTH: new AuthStore(),
	USER: new UserStore(),
	ALL_TRANSACTIONS: new AllTransactionStore(),
});

const useStore = (): Context => useContext(AppContext);

export default useStore;
