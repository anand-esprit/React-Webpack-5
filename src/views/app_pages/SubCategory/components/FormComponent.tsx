import React, { useEffect, useState } from "react";
import { Col, Row, Form, TreeSelect, Spin, Button } from "antd";
import { observer } from "mobx-react";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import { SubCategoryRequest } from "../../../../requests/PageRequest";
import useStore from "../../../../store";
import OptionsModalComponent from "./OptionsModalComponent";
import { CONSTANT } from "../../../../config/Constant";
// import debounce from "lodash/debounce";

const FormComponent: React.FC<any> = observer(
  ({ form, id, handleSubmit, handleChange, editValues, type }) => {
    const { LOV_STORE } = useStore();
    const { getCategoryList, getChannelList, getDepartmentTreeList } =
      LOV_STORE;

    const [fetchChannel, setFetchChannel] = useState<boolean>(true);
    const [fetchCategory, setFetchCategory] = useState<boolean>(true);
    const [fetchDepartment, setFetchDepartment] = useState<boolean>(true);
    const [optionsModal, setOptionsModal] = useState<boolean>(false);
    const [departmentShow, setDepartmentShow] = useState<boolean>(false);
    const [deptValue, setDeptValue] = useState<any>();

    useEffect(() => {
      getDepartmentTreeList();
    }, [getDepartmentTreeList]);

    // set the form values to edit
    useEffect(() => {
      if (editValues && type === "edit") {
        setDeptValue(editValues.sub_department && editValues.sub_department.id);
        LOV_STORE.dropdown_category_list = editValues.category && [
          editValues.category,
        ];

        LOV_STORE.dropdown_channel_list =
          editValues.channel_detail && editValues.channel_detail;

        form.setFieldsValue({
          code: editValues.code,
          name: editValues.name,
          name_hi: editValues.name_hi,
          agency_ref_id: editValues.agency_ref_id,
          swachta_cat_id: editValues.swachta_cat_id,
          valid_option: editValues.valid_option,
          is_dept_from_subzone: editValues.is_dept_from_subzone,
          is_active: editValues.is_active,
          sort_order: editValues.sort_order,
          cat_id: editValues.cat_id,
          channel_ids: editValues.channel_detail
            ? editValues.channel_detail.map((item: any) => item.id)
            : [],
          sub_department_id: editValues.sub_department_id,
        });

        if (editValues.is_dept_from_subzone === 1) {
          setDepartmentShow(true);
        }
      }
    }, [editValues, form]);

    const addOptions = (data: any) => {
      console.log("option", data);
      form.setFieldsValue({
        options: JSON.stringify(data.options),
      });
      closeOptionsModal();
    };

    const closeOptionsModal = () => {
      setOptionsModal(false);
    };

    const openOptionsModal = () => {
      setOptionsModal(true);
    };

    const onDepartmentChange = (newValue: any) => {
      setDeptValue(newValue);
    };

    return (
      <>
        <OptionsModalComponent
          visible={optionsModal}
          close={closeOptionsModal}
          addOptions={addOptions}
          editValues={editValues}
          type={type}
        />
        <FormBox
          form={form}
          id={id}
          onFinish={handleSubmit}
          onChange={handleChange}
        >
          <Row gutter={15}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Select
                label="Parent Category"
                name="cat_id"
                placeholder="Select Parent Category"
                showArrow
                showSearch
                rules={SubCategoryRequest.cat_id}
                onFocus={() =>
                  fetchCategory &&
                  getCategoryList().then(() => setFetchCategory(false))
                }
                notFoundContent={
                  fetchCategory ? <Spin size="small" /> : "No Record Found."
                }
                options={{
                  list: LOV_STORE.dropdown_category_list,
                  valueKey: "id",
                  textKey: "name",
                }}
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={handleChange}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Code"
                placeholder="Code"
                name="code"
                rules={SubCategoryRequest.code}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <InputBox.Select
                label="Channel"
                name="channel_ids"
                mode="multiple"
                placeholder="Select Channel"
                showArrow
                onFocus={() =>
                  fetchChannel &&
                  getChannelList().then(() => setFetchChannel(false))
                }
                notFoundContent={
                  fetchChannel ? <Spin size="small" /> : "No Record Found."
                }
                options={{
                  list: LOV_STORE.dropdown_channel_list,
                  valueKey: "id",
                  textKey: "name",
                }}
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={handleChange}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Name"
                placeholder="Name"
                name="name"
                rules={SubCategoryRequest.name}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                label="Category Name Hindi"
                placeholder="Category Name Hindi"
                name="name_hi"
                rules={SubCategoryRequest.name_hi}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                label="Agency Reference ID"
                placeholder="Agency Reference ID"
                name="agency_ref_id"
                rules={SubCategoryRequest.agency_ref_id}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                label="Swachta Cat"
                placeholder="Swachta Cat"
                name="swachta_cat_id"
                rules={SubCategoryRequest.swachta_cat_id}
              />
            </Col>
            {Number(localStorage.getItem("app_id")) ===
            CONSTANT.APP_MASTER.ID.AMC ? (
              <>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <InputBox.Text
                    label="Valid Option"
                    placeholder="Valid Option"
                    name="valid_option"
                    rules={SubCategoryRequest.valid_option}
                  />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Form.Item label="Options">
                    <InputBox.Text name="options" hidden={true} />
                    <Button
                      type="primary"
                      className="secondarySmallBtn"
                      onClick={openOptionsModal}
                    >
                      Manage
                    </Button>
                  </Form.Item>
                </Col>
              </>
            ) : (
              <></>
            )}
            <Col xs={{ span: 12 }} md={{ span: 12 }}>
              <InputBox.Radio
                label="Is Active"
                name="is_active"
                required
                onChange={handleChange}
                options={{
                  list: [
                    { id: 1, name: "Yes" },
                    { id: 0, name: "No" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
                rules={SubCategoryRequest.is_active}
              />
            </Col>
            <Col xs={{ span: 12 }} md={{ span: 12 }}>
              <InputBox.Radio
                label="Department as per Geolocation(Subzone)"
                name="is_dept_from_subzone"
                required
                onChange={(e: any) => {
                  e.target.value === 1
                    ? setDepartmentShow(true)
                    : setDepartmentShow(false);
                  handleChange();
                }}
                initialValue={0}
                options={{
                  list: [
                    { id: 1, name: "Yes" },
                    { id: 0, name: "No" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
                rules={SubCategoryRequest.is_dept_from_subzone}
              />
            </Col>
            {departmentShow && (
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item
                  label="Department"
                  valuePropName="sub_department_id"
                  name="sub_department_id"
                >
                  <TreeSelect
                    placeholder="Please select"
                    value={deptValue}
                    showSearch
                    allowClear
                    treeDefaultExpandAll
                    showCheckedStrategy={TreeSelect.SHOW_ALL}
                    onChange={(e: any) => {
                      onDepartmentChange(e);
                      handleChange();
                    }}
                    onFocus={() =>
                      fetchDepartment &&
                      getDepartmentTreeList().then(() =>
                        setFetchDepartment(false)
                      )
                    }
                    notFoundContent={
                      fetchDepartment ? (
                        <Spin size="small" />
                      ) : (
                        "No Record Found."
                      )
                    }
                    fieldNames={{ value: "id", label: "name" }}
                    treeData={LOV_STORE.dropdown_department_tree_list}
                    treeNodeFilterProp="name"
                    filterTreeNode={true}
                  />
                </Form.Item>
              </Col>
            )}
            {type === "edit" ? (
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <InputBox.Text
                  label="Sort Order"
                  placeholder="Sort Order"
                  name="sort_order"
                />
              </Col>
            ) : (
              <></>
            )}
          </Row>
        </FormBox>
      </>
    );
  }
);

export default FormComponent;
