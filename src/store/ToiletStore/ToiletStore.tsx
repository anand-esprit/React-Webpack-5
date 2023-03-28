import axios from "axios";
import { makeAutoObservable, toJS } from "mobx";
import API_URL from "../../config/ApiUrl";
import Config from "../../config/Config";
import { ToiletListProps } from "./ToiletInterface";



export default class ToiletStore{
    agGrid: any = null;
    per_page = Config.grid.local.gridOptions?.paginationPageSize;
    public toilet_data?: ToiletListProps[];
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
  private setToiletData = (value?: ToiletListProps[]): void => {
    this.toilet_data = value;
  };

  // API Functions
  public fetchList = async (): Promise<any> => {
    this.setToiletData([]);
    return await axios
      .post(API_URL.TOILET.LIST)
      .then(({ data }) => {
        this.setToiletData(data.toilets);
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  AddData = (formData: any) => {
    return axios
      .post(API_URL.TOILET.ADD, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  DeleteData = (id: number) => {
    return axios
      .delete(API_URL.TOILET.DESTROY + `/${id}`)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  EditData = (formData: any, editId: number) => {
    return axios
      .post(API_URL.TOILET.EDIT + "/" + editId, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

}