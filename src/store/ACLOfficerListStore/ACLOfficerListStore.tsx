import axios from "axios";
import { makeAutoObservable } from "mobx";
import API_URL from "../../config/ApiUrl";
import Config from "../../config/Config";
import { ACLListDataProps } from "./ACLOfficerListInterface";

export default class ACLOfficerListStore {
  agGrid: any = null;
  per_page = Config.grid.local.gridOptions?.paginationPageSize;
  public list_data?: ACLListDataProps[];
  editValues = null;
  deleteValues = null;
  viewAROUserValues = null;
  viewAROGroupValues = null;
  viewOSNameValues = null;
  viewDepartmentValues = null;
  viewDesignationValues = null;
  viewACOActionValues = null;

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
    this.editValues = null;
    return axios
      .post(API_URL.ACL_OFFICER_LIST.VIEW + "/" + data.id)
      .then(({ data }) => {
        this.editValues = data.view;
      });
  };

  // Setter Functions
  private setListData = (value?: ACLListDataProps[]): void => {
    this.list_data = value;
    // console.log(toJS(this.list_data));
  };

  // API Functions
  public fetchList = async (): Promise<any> => {
    this.setListData([]);
    return await axios
      .post(API_URL.ACL_OFFICER_LIST.LIST)
      .then(({ data }) => {
        this.setListData(data.acl_officer_list);
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  AddData = (formData: any) => {
    console.log("formData", formData);
    return axios
      .post(API_URL.ACL_OFFICER_LIST.ADD, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  DeleteData = (id: number) => {
    return axios
      .delete(API_URL.ACL_OFFICER_LIST.DESTROY + `/${id}`)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  EditData = (formData: any, editId: number) => {
    return axios
      .post(API_URL.ACL_OFFICER_LIST.EDIT + "/" + editId, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  ViewData = (id: number, type: string) => {
    return axios
      .post(API_URL.ACL_OFFICER_LIST.VIEW + "/" + id, type)
      .then(({ data }) => {
        // console.log("data",data)
        this.viewAROUserValues = data.view.aro_user_detail;
        this.viewAROGroupValues = data.view.aro_group_detail;
        this.viewOSNameValues = data.view.os_names;
        this.viewDepartmentValues = data.view.department_detail;
        this.viewDesignationValues = data.view.designation_detail;
        this.viewACOActionValues = data.view.aco_action_detail;
        // console.log("this.viewValues ", this.viewValues);
      });
  };
}
