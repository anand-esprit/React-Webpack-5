import axios from "axios";
import { makeAutoObservable } from "mobx";
import API_URL from "../../config/ApiUrl";
import Config from "../../config/Config";
import { ACOCitizenSectionListProps } from "./ACOCitizenSectionInterface";

export default class ACOCitizenSectionStore {
  agGrid: any = null;
  per_page = Config.grid.local.gridOptions?.paginationPageSize;
  public list_data?: ACOCitizenSectionListProps[];
  editValues = null;
  deleteValues = null;

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
      .get(API_URL.ACO_CITIZEN_SECTION.VIEW + "/" + data.id)
      .then(({ data }) => {
        this.editValues = data.view;
      });
  };

  // Setter Functions
  private setListData = (value?: ACOCitizenSectionListProps[]): void => {
    this.list_data = value;
  };

  // API Functions
  public fetchList = async (): Promise<any> => {
    this.setListData([]);
    return await axios
      .post(API_URL.ACO_CITIZEN_SECTION.LIST)
      .then(({ data }) => {
        // console.log('List Data', data);
        this.setListData(data.aco_citizen_section);
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  AddData = (formData: any) => {
    return axios
      .post(API_URL.ACO_CITIZEN_SECTION.ADD, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  DeleteData = (id: number) => {
    return axios
      .delete(API_URL.ACO_CITIZEN_SECTION.DESTROY + `/${id}`)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  EditData = (formData: any, editId: number) => {
    return axios
      .post(API_URL.ACO_CITIZEN_SECTION.EDIT + "/" + editId, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };
}
