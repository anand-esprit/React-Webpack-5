import { IServerSideGetRowsParams } from "ag-grid-community";
import { FormInstance } from "antd";
import axios from "axios";
import { makeAutoObservable } from "mobx";
import { Notification } from "../../config/Global";
import Message from "../../config/Message";
import { ErrorProps, FormattedErrorProps } from "./RootInterface";

export default class RootStore {
  public login_redirect_timer?: any;
  public isUnauthorise?: boolean = false;

  constructor() {
    makeAutoObservable(this);
    // this.setAxiosBaseUrl();
  }

  public setAxiosBaseUrl = (): void => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL || "";
  };

  public setAxiosInterceptor = (): void => {
    axios.interceptors.request.use((config) => {
      let header: any = config.headers;
      header = {
        ...header,
        Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        fromapp: 3,
      };
      const authToken = localStorage.getItem("token");
      const api_key = localStorage.getItem("api_key") ?? "";
      const app_id = localStorage.getItem("app_id") ?? "";

      header = authToken
        ? {
            ...header,
            Accept: "application/json",
            Authorization: "Bearer " + authToken,
          }
        : {
            ...header,
            Accept: "application/json",
          };
      if (api_key && app_id) {
        if (api_key !== "null" && app_id !== "null") {
          header = {
            ...header,
            apikey: api_key,
            appid: app_id,
          };
        }
      }
      config.headers = header;
      /** In dev, intercepts request and logs it into console for dev */
      return config;
    });

    axios.interceptors.response.use(
      (response) => {
        if (response?.data?.NOTIFICATION && response?.data?.NOTIFICATION[0]) {
          Notification.success({ message: response.data.NOTIFICATION });
        }
        return response;
      },
      (e) => {
        if (e.response) {
          if (e.response.status !== 422) {
            if (e.response?.data?.NOTIFICATION) {
              e.response.data.NOTIFICATION.map((errMsg: any) =>
                Notification.error({ message: errMsg })
              );
            }
          }

          if (e.response.status === 401) {
            this.setIsUnauthorise(true);
            this.resetStore();
          }

          return Promise.reject(e.response);
        } else {
          Notification.error({
            message: Message().global.networkIssue,
          });
          return Promise.reject({
            data: [],
            message: Message().global.networkIssue,
          });
        }
      }
    );
  };

  public setIsUnauthorise = (value?: boolean): void => {
    this.isUnauthorise = value;
  };

  public resetStore = (): void => {
    localStorage.clear();
  };

  public setAxiosHeaders = (access_token?: string): Promise<any> => {
    if (access_token) localStorage.setItem("token", access_token);
    const auth_token = localStorage.getItem("token");
    if (auth_token && auth_token !== "undefined") {
      return Promise.resolve(auth_token);
    } else {
      return Promise.reject();
    }
  };

  // public setNotificationConfig = (): void => {
  //   message.config({
  //     maxCount: 3,
  //     // duration: 9,
  //   });
  // };

  public assignErrorToInput = (
    form: FormInstance,
    errors?: ErrorProps
  ): void => {
    const formattedErrors: FormattedErrorProps[] = [];
    if (errors) {
      Object.keys(errors).forEach((key) => {
        formattedErrors.push({
          name: key,
          errors: errors[key],
        });
      });
      formattedErrors.forEach((x) => {
        if (typeof x.name === "string" && x.name.indexOf(".") !== -1) {
          const name: any = x.name.split(".");
          name.forEach((e: any) => {
            if (!isNaN(parseInt(e))) {
              e = parseInt(e);
            }
          });
        }
      });
    }
    form.setFields(formattedErrors);
  };

  public getServerListPayload = (params: IServerSideGetRowsParams) => {
    return {
      filter_data: params.request.filterModel,
      sort_data: params.request.sortModel,
      per_page: (params.request.endRow ?? 0) - (params.request.startRow ?? 0),
      page: Math.ceil(
        ((params.request.startRow ?? 0) + 1) /
          ((params.request.endRow ?? 0) - (params.request.startRow ?? 0))
      ),
    };
  };
}
