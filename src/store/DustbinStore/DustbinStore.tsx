import axios from "axios";
import { makeAutoObservable, toJS } from "mobx";
import API_URL from "../../config/ApiUrl";
import Config from "../../config/Config";
import { DustbinListProps } from "./DustbinInterface";



export default class DustbinStore{
    agGrid: any = null;
    per_page = Config.grid.local.gridOptions?.paginationPageSize;
    public dustbin_data?: DustbinListProps[];
    editValues = null;
    deleteValues = null;

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
  private setDustbinData = (value?: DustbinListProps[]): void => {
    this.dustbin_data = value;
  };

  // API Functions
  public fetchList = async (): Promise<any> => {
    this.setDustbinData([]);
    return await axios
      .post(API_URL.DUSTBIN.LIST)
      .then(({ data }) => {
        this.setDustbinData(data.dustbin);
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  AddData = (formData: any) => {
    return axios
      .post(API_URL.DUSTBIN.ADD, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  DeleteData = (id: number) => {
    return axios
      .delete(API_URL.DUSTBIN.DESTROY + `/${id}`)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  EditData = (formData: any, editId: number) => {
    return axios
      .post(API_URL.DUSTBIN.EDIT + "/" + editId, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

}