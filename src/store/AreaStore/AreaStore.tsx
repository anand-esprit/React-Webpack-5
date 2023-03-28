import axios from "axios";
import { makeAutoObservable } from "mobx";
import API_URL from "../../config/ApiUrl";
import Config from "../../config/Config";
import { AreaListDataProps } from "./AreaInterface";
import {
  GridOptions,
  GridReadyEvent,
  IServerSideGetRowsParams,
} from "ag-grid-community";
import { convertTextToID } from "../../config/Global";

export default class AreaStore {
  agGrid: any = null;
  per_page = Config.grid.server.gridOptions?.paginationPageSize;
  public list_data?: AreaListDataProps[];
  editValues = null;
  deleteValues = null;
  current_page = 1;
  total = 0;
  zone_list = null;
  ward_list = null;
  zone_ids: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  private setGrid = (value: any) => {
    this.agGrid = value;
  };

  // Setup grid and set column size to autosize
  setupGrid = (params: GridReadyEvent) => {
    this.setGrid(params);
    this.setPageSize();
    const datasource = this.createDatasource(Config.grid.server.gridOptions);
    params.api.setServerSideDatasource(datasource);
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
    return axios.get(API_URL.AREA.VIEW + "/" + data.id).then(({ data }) => {
      this.editValues = data.view;
    });
  };

  setZoneList = (data: any) => {
    this.zone_list = data;
  };

  setWardList = (data: any) => {
    this.ward_list = data;
  };
  // Create data source to display record in table
  private createDatasource = (gridOptions?: GridOptions) => {
    return {
      gridOptions,
      getRows: (params: IServerSideGetRowsParams) => {
        var filter_data = this.changeFilterAndSort(params.request);

        var payload = {
          filter_data: filter_data.final_filter,
          sort_data: filter_data.final_sort,
          per_page:
            (params.request.endRow ?? 0) - (params.request.startRow ?? 0),
          page: Math.ceil(
            ((params.request.startRow ?? 0) + 1) /
              ((params.request.endRow ?? 0) - (params.request.startRow ?? 0))
          ),
        };
        // const payload = this.rootStore.getServerListPayload(params);
        this.fetchList(payload).then((data) => {
          // debugger;
          params.success({ rowData: data?.areas, rowCount: data?.total_count });
          if (data.total_count <= 0) {
            params.api.showNoRowsOverlay();
          } else {
            params.api.hideOverlay();
          }
        });
      },
    };
  };

  changeFilterAndSort = (params: any) => {
    const final_filter = params.filterModel;
    const final_sort = params.sortModel;
    if (final_filter["zone_id"]) {
      final_filter["zone_id"].values = convertTextToID(
        final_filter["zone_id"],
        this.zone_list,
        "name",
        "id"
      );
      this.zone_ids = { zone_ids: final_filter["zone_id"].values };
    }
    if (final_filter["ward_id"]) {
      final_filter["ward_id"].values = convertTextToID(
        final_filter["ward_id"],
        this.ward_list,
        "name",
        "id"
      );
    }
    console.log("final_filter", final_filter);
    return { final_filter, final_sort };
  };

  public updateDependantLOVFilter = (params: any) => {
    if (params.api.getFilterInstance("zone_id").appliedModel) {
      const setFilter = params.api.getFilterInstance("ward_id");
      let filterModel = params.api.getFilterInstance("zone_id").appliedModel;
      filterModel = convertTextToID(filterModel, this.zone_list, "name", "id");
      this.zone_ids = { zone_ids: filterModel };
      setFilter.refreshFilterValues();
    }
  };

  // Setter Functions
  private setListData = (value?: AreaListDataProps[]): void => {
    // console.log("list data", value);
    this.list_data = value;
  };

  // API Functions
  public fetchList = async (payload: any): Promise<any> => {
    this.setListData([]);
    return await axios
      .post(API_URL.AREA.LIST, payload)
      .then(({ data }) => {
        this.setListData(data.areas);
        this.total = data.total_page;
        this.current_page = data.page;
        return data;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  AddData = (formData: any) => {
    return axios
      .post(API_URL.AREA.ADD, formData)
      .then(() => {
        return this.setupGrid(this.agGrid);
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  DeleteData = (id: number) => {
    return axios
      .delete(API_URL.AREA.DESTROY + `/${id}`)
      .then(() => {
        return this.setupGrid(this.agGrid);
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  EditData = (formData: any, editId: number) => {
    return axios
      .post(API_URL.AREA.EDIT + "/" + editId, formData)
      .then(() => {
        return this.setupGrid(this.agGrid);
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };
}
