import { makeAutoObservable } from "mobx";
import axios from "axios";
import { appListType, doLoginType } from "./AuthInterface";
import RootStore from "../RootStore/RootStore";
import API_URL from "../../config/ApiUrl";
import { CONSTANT } from "../../config/Constant";

export default class AuthStore {
  // Variables
  public user?: any;
  public token?: string;
  public app_loading: boolean;
  public email?: string;
  private rootStore: RootStore;
  public latitudeVal?: number = CONSTANT.DEFAULT_LATITUDE;
  public longitudeVal?: number = CONSTANT.DEFAULT_LONGITUDE;
  public appList?: appListType;
  public accessMenu?: any;
  public permission: any;

  constructor() {
    this.app_loading = true;
    this.rootStore = new RootStore();
    makeAutoObservable(this);
    window.addEventListener("storage", this.handleInvalidToken);
  }

  // Initiate Application Functions
  public InitializeApp = () => {
    // this.rootStore.setNotificationConfig();
    this.rootStore.setAxiosBaseUrl();
    this.rootStore.setAxiosInterceptor();
    this.setupHeaders();
  };

  public handleInvalidToken = (e: any) => {
    let need_redirect = false;
    if (e.key === "token") {
      if ((e.oldValue && !e.newValue) || e.oldValue !== e.newValue) {
        need_redirect = true;
      } else if (!e.oldValue && e.newValue) {
        need_redirect = true;
      }
    }

    if (need_redirect) {
      this.customRedirect();
    }
  };

  public manageLocalStorage = () => {
    if (this.token) {
      if (this.checkNecessaryConfig()) {
        this.setUser(JSON.parse(localStorage.getItem("user_info") ?? ""));
        this.setAccessMenu(
          JSON.parse(localStorage.getItem("access_menu") ?? "")
        );
        this.getCoords();
        this.getPermission();
      } else {
        this.rootStore.resetStore();
      }
      // this.rootStore.customRedirect(this.rootStore.dashboard_redirect_path,10);
    } else {
      this.rootStore.resetStore();
      // this.rootStore.customRedirect(this.rootStore.login_redirect_path,10);
    }
    this.customRedirect("", 10);
  };

  public checkNecessaryConfig = () => {
    let valid = true;
    if (
      !localStorage.getItem("user_info") ||
      localStorage.getItem("user_info") == "undefined"
    ) {
      valid = false;
    }

    if (
      !localStorage.getItem("access_menu") ||
      localStorage.getItem("user_info") == "undefined"
    ) {
      valid = false;
    }

    return valid;
  };

  public isUnauthorized = () => {
    return this.rootStore.isUnauthorise;
  };

  public getPermission = () => {
    if (this.accessMenu) {
      // console.log("enter permission");
      this.permission = this.accessMenu
        .filter((item: any) => item.path === window.location.pathname)
        .map((item: any) => item.action);
    }
  };

  // Check User Privileges
  checkPermission = (permission_type: any) => {
    if (this.permission[0] && this.permission[0].includes(permission_type)) {
      return true;
    } else {
      return false;
    }
  };

  public customRedirect(redirect = "", timeout = 1000) {
    if (this.rootStore.login_redirect_timer) {
      clearTimeout(this.rootStore.login_redirect_timer);
    }

    const token = localStorage.getItem("token");
    const without_login_page = CONSTANT.WITHOUT_LOGIN_PAGE;
    const dashboard_redirect_path = CONSTANT.DASHBOARD_REDIRECT_PATH;
    const login_redirect_path = CONSTANT.LOGIN_REDIRECT_PATH;
    const setAppLoading = this.setAppLoading;

    this.rootStore.login_redirect_timer = setTimeout(function () {
      const currentPath = window.location.pathname;
      if (token && without_login_page.includes(currentPath)) {
        redirect = dashboard_redirect_path;
      } else if (!token && !without_login_page.includes(currentPath)) {
        redirect = login_redirect_path;
      }
      if (redirect) {
        if (redirect == "reload") {
          window.location.reload();
        } else if (currentPath !== redirect) {
          // console.log(window.location.href + redirect);
          window.location.href = redirect;
        }
      } else {
        setAppLoading(false);
      }
    }, timeout);
  }

  public getCoords = async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        (this.latitudeVal = position.coords.latitude),
          (this.longitudeVal = position.coords.longitude);
      },
      (err) => console.log(err.message)
    );
  };

  public setupHeaders = async (access_token?: string): Promise<void> => {
    this.setAppLoading(true);
    this.rootStore
      .setAxiosHeaders(access_token)
      .then((token) => {
        this.setToken(token);
        this.manageLocalStorage();
        // this.fetchAuthUser();
      })
      .catch(() => {
        this.setToken();
        // this.setUser();
        this.manageLocalStorage();
      });
  };

  // Setter Functions
  public setUser = (value?: any): void => {
    this.user = value;
  };
  public setToken = (value?: string): void => {
    this.token = value;
  };
  public setAppLoading = (value: boolean): void => {
    this.app_loading = value;
  };
  public setAppList = (value: appListType): void => {
    this.appList = value;
  };
  public setAccessMenu = (value: any): void => {
    this.accessMenu = value;
  };

  // API Functions
  public doLogin = async (payload: doLoginType): Promise<any> => {
    return await axios
      .post(API_URL.LOGIN, payload)
      .then(({ data }) => {
        if (data.data.app_master_list) {
          localStorage.setItem(
            "app_list",
            JSON.stringify(data.data.app_master_list)
          );
        }
        if (data.data.user.app_master) {
          localStorage.setItem("api_key", data.data.user.app_master.api_key);
          localStorage.setItem("app_id", data.data.user.app_master.id);
        }
        localStorage.setItem(
          "access_menu",
          JSON.stringify(data.data.access_menu)
        );
        localStorage.setItem("user_info", JSON.stringify(data.data.user));
        localStorage.setItem("aws_bucket_url", data.data.aws_bucket_url);

        this.setupHeaders(data.data.token);
        this.setUser(data.data.user);
        this.setAccessMenu(data.data.access_menu);
        this.rootStore.setIsUnauthorise(false);
        return data;
      })
      .catch((data) => {
        this.setToken();
        this.setUser();
        return Promise.reject(data);
      });
  };

  public fetchAdminMenu = async (payload: any): Promise<any> => {
    return await axios
      .post(API_URL.ACCESSMENU_ADMIN, payload)
      .then(({ data }) => {
        localStorage.setItem("access_menu", JSON.stringify(data.access_menu));
        localStorage.setItem("api_key", data.api_key);
        localStorage.setItem("app_id", data.app_id);
        this.setAccessMenu(data.access_menu);
        return data;
      })
      .catch(({ data }) => {
        return Promise.reject(data);
      });
  };

  public doLogout = async (): Promise<any> => {
    return await axios
      .post(API_URL.LOGOUT)
      .then(() => {
        // this.setAppLoading(true);
        this.rootStore.resetStore();
        this.setToken();
        this.setUser();
      })
      .catch((data) => {
        // this.setAppLoading(false);
        return Promise.reject(data);
      });
  };
}
