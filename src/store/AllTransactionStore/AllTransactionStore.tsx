import {
	GridOptions,
	GridReadyEvent,
	IServerSideGetRowsParams,
} from "ag-grid-community";
import axios from "axios";
import { makeAutoObservable } from "mobx";
import API_URL from "../../config/ApiUrl";
import Config from "../../config/Config";
import RootStore from "../RootStore/RootStore";

export default class AllTransactionStore {
	public grid?: any;
	private rootstore: RootStore;

	constructor() {
		this.rootstore = new RootStore();
		makeAutoObservable(this);
	}

	// Setter Functions
	private setGrid = (value: any) => {
		this.grid = value;
	};

	// Grid Setup Functions

	public setupGrid = (params: GridReadyEvent) => {
		this.setGrid(params);
		const datasource = this.createDatasource(Config.grid.server.gridOptions);
		params.api.setServerSideDatasource(datasource);
	};

	private createDatasource = (gridOptions?: GridOptions) => {
		return {
			gridOptions,
			getRows: (params: IServerSideGetRowsParams) => {
				const payload = this.rootstore.getServerListPayload(params);
				this.fetchList(payload).then((data) => {
					params.success({rowData: data.data, rowCount: data.total});
					if (data.count <= 0) {
						params.api.showNoRowsOverlay();
					} else {
						params.api.hideOverlay();
					}
				});
			},
		};
	};

	// API Functions
	public fetchList = (payload: any): Promise<any> => {
		return axios
			.post(API_URL.All_TRANSACTION.LIST, payload)
			.then(({ data }) => {
				data?.data?.forEach((dataItem: any) => {
					if (dataItem.entity_type === 1) {
						dataItem.entity_name = dataItem.organisations?.organisation_name;
					}
					if (dataItem.entity_type === 2) {
						dataItem.entity_name = (
							dataItem.peoples?.first_name +
							" " +
							dataItem.peoples?.last_name
						).trim();
					}
				});
				return data;
			});
	};
}
