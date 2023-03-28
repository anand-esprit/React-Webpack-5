// import { PageHeader } from "antd";
import { observer } from "mobx-react";
import React, { useState } from "react";
import BreadcrumbComponent from "../../../components/BreadcrumbComponent/BreadcrumbComponent";
import ContentBox from "../../../components/ContentBox/ContentBox";
import { ACLOfficerListBreadcrumb } from "../../../config/BreadcrumbConfig";
import useStore from "../../../store";
import HeaderButtons from "./components/HeaderButtons";
import ListComponent from "./components/ListComponent";
import AddComponent from "./components/AddComponent";
import DeleteComponent from "./components/DeleteComponent";
import EditComponent from "./components/EditComponent";
import { PageHeader } from "antd";
import RecordPerPage from "../../../components/AgGridWrapper/RecordPerPage";

const ACLOfficerList: React.FC = observer(() => {
  const { ACL_OFFICER_LIST_STORE } = useStore();
  const {
    list_data,
    fetchList,
    setDeleteValues,
    setEditValues,
    setPageSize,
    per_page,
  } = ACL_OFFICER_LIST_STORE;

  const [addModal, setAddModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const openAddModal = () => {
    setAddModal(true);
  };

  const closeAddModal = () => {
    setAddModal(false);
  };

  const openDeleteModal: any = (data: any) => {
    setDeleteValues(data);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const openEditModal: any = (data: any) => {
    setEditValues(data);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  return (
    <>
      <BreadcrumbComponent items={ACLOfficerListBreadcrumb.path} />
      <div className="mainPageWrap">
        <PageHeader
          className="mainPageHeader"
          title={ACLOfficerListBreadcrumb.title}
          extra={[
            <HeaderButtons key={1} open={openAddModal} />,
            <RecordPerPage
              key={2}
              style={{ width: "180px" }}
              defaultValue={per_page + " per page"}
              onChange={setPageSize}
            />,
          ]}
        />
        <ContentBox>
          <ListComponent
            rowData={list_data}
            getData={fetchList}
            openDeleteModal={openDeleteModal}
            openEditModal={openEditModal}
          />
          <AddComponent visible={addModal} close={closeAddModal} />
          <DeleteComponent visible={deleteModal} close={closeDeleteModal} />
          <EditComponent visible={editModal} close={closeEditModal} />
        </ContentBox>
      </div>
    </>
  );
});

export default ACLOfficerList;
