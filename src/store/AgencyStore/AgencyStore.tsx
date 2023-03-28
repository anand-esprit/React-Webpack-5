import axios from "axios";
import { makeAutoObservable, toJS } from "mobx";
import API_URL from "../../config/ApiUrl";
import Config from "../../config/Config";
import { AgenciesListProps } from "./AgencyInterface";



export default class AgencyStore{
    agGrid: any = null;
    per_page = Config.grid.local.gridOptions?.paginationPageSize;
    public agency_data?: AgenciesListProps[];
    editValues = null;
    deleteValues = null;
    dropdown_topic_list = null;

    constructor(){
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
    this.editValues = toJS(data);
  };

  // Setter Functions
  private setAgencyData = (value?: AgenciesListProps[]): void => {
    this.agency_data = value;
  };

  // API Functions
  public fetchList = async (): Promise<any> => {
    this.setAgencyData([]);
    return await axios
      .post(API_URL.AGENCY.LIST)
      .then(({ data }) => {
        this.setAgencyData(data.list);
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  AddData = (formData: any) => {
    return axios
      .post(API_URL.AGENCY.ADD, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  DeleteData = (id: number) => {
    return axios
      .delete(API_URL.AGENCY.DESTROY + `/${id}`)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  EditData = (formData: any, editId: number) => {
    return axios
      .post(API_URL.AGENCY.EDIT + "/" + editId, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

}