import {
  GridOptions,
  GridReadyEvent,
  IServerSideGetRowsParams,
} from "ag-grid-community";
import axios from "axios";
import { makeAutoObservable } from "mobx";
import API_URL from "../../config/ApiUrl";
import Config from "../../config/Config";
import { SubCategoryListDataProps } from "./SubCategoryInterface";

export default class ChecklistCategoryStore {
  agGrid: any = null;
  current_page = 1;
  total = 0;
  per_page = Config.grid.server.gridOptions?.paginationPageSize;
  public list_data?: SubCategoryListDataProps[];
  editValues = null;
  deleteValues = null;
  viewRoleValues = null;

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
    var defaultStatus = null;
    // if (this.AUTH) {
    defaultStatus = 737;
    // }
    if (defaultStatus) {
      const filter = { status: { values: defaultStatus, filterType: "set" } };
      this.agGrid.api.setFilterModel(filter);
    }
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
      .post(API_URL.SUB_CATEGORY.VIEW + "/" + data.id)
      .then(({ data }) => {
        this.editValues = data.view;
      });
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

          params.success({
            rowData: data?.sub_categories,
            rowCount: data?.total_count,
          });
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
    // if (final_filter["category.name"]) {
    //   final_filter["category.name"].values = convertTextToID(
    //     final_filter["category.name"],
    //     this.zone_list,
    //     "name",
    //     "id"
    //   );
    //   this.zone_ids = { zone_ids: final_filter["category.name"].values };
    // }

    return { final_filter, final_sort };
  };

  // Setter Functions
  private setListData = (value?: SubCategoryListDataProps[]): void => {
    this.list_data = value;
  };

  // API Functions
  public fetchList = async (payload: any): Promise<any> => {
    this.setListData([]);
    return await axios
      .post(API_URL.SUB_CATEGORY.LIST, payload)
      .then(({ data }) => {
        this.setListData(data.sub_categories);
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
      .post(API_URL.SUB_CATEGORY.ADD, formData)
      .then(() => {
        return this.setupGrid(this.agGrid);
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  DeleteData = (id: number) => {
    return axios
      .delete(API_URL.SUB_CATEGORY.DESTROY + `/${id}`)
      .then(() => {
        return this.setupGrid(this.agGrid);
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  EditData = (formData: any, editId: number) => {
    return axios
      .post(API_URL.SUB_CATEGORY.EDIT + "/" + editId, formData)
      .then(() => {
        return this.setupGrid(this.agGrid);
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  ChangeStatus = (data: any, id: number) => {
    const api_link =
      data === true
        ? API_URL.SUB_CATEGORY.ACTIVATE
        : API_URL.SUB_CATEGORY.DEACTIVATE;
    return axios
      .patch(api_link + "/" + id)
      .then(() => {
        // return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  // ViewData = (id: number, type: string) => {
  //   return axios
  //     .post(API_URL.CHANNEL.VIEW + "/" + id, type)
  //     .then(({ data }) => {
  //       this.viewRoleValues = data.view.user_role_detail;
  //       // console.log("this.viewValues ", this.viewValues);
  //     });
  // };
}
