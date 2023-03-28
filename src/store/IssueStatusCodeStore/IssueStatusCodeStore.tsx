import axios from "axios";
import { makeAutoObservable } from "mobx";
import API_URL from "../../config/ApiUrl";
import Config from "../../config/Config";
import { IssueStatusCodeListProps } from "./IssueStatusCodeInterface";

export default class IssueStatusCodeStore {
  agGrid: any = null;
  per_page = Config.grid.local.gridOptions?.paginationPageSize;
  public list_data?: IssueStatusCodeListProps[];
  editValues = null;
  deleteValues = null;
  dropdown_user_role_list = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Setup grid and set column size to autosize
  setupGrid = (params: any) => {
    this.agGrid = params;
  };

  // change page size, default page size is LocalGridConfig.options.paginationPageSize
  setPageSize = (page = this.per_page) => {
    this.per_page = page;
    if (this.agGrid) {
      this.agGrid.api.paginationSetPageSize(Number(page));
    }
  };

  setDeleteValues = (data: any) => {
    this.deleteValues = data;
  };

  setEditValues = (data: any) => {
    this.editValues = data;
  };

  // Setter Functions
  private setListData = (value?: IssueStatusCodeListProps[]): void => {
    this.list_data = value;
  };

  // API Functions
  public fetchList = async (): Promise<any> => {
    this.setListData([]);
    return await axios
      .post(API_URL.ISSUE_STATUS_CODE.LIST)
      .then(({ data }) => {
        this.setListData(data.issue_status_code);
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  AddData = (formData: any) => {
    return axios
      .post(API_URL.ISSUE_STATUS_CODE.ADD, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  DeleteData = (id: number) => {
    return axios
      .delete(API_URL.ISSUE_STATUS_CODE.DESTROY + `/${id}`)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  EditData = (formData: any, editId: number) => {
    return axios
      .post(API_URL.ISSUE_STATUS_CODE.EDIT + "/" + editId, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  ChangeStatus = (data: any, id: number) => {
    const api_link =
      data === true
        ? API_URL.ISSUE_STATUS_CODE.ACTIVATE
        : API_URL.ISSUE_STATUS_CODE.DEACTIVATE;
    return axios
      .patch(api_link + "/" + id)
      .then(() => {
        // return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };
}
