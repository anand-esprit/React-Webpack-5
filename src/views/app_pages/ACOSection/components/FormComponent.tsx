import React, { useEffect, useState } from "react";
import { Col, Row, Spin, Form, TreeSelect } from "antd";
import { observer } from "mobx-react";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import { ACOSectionRequest } from "../../../../requests/PageRequest";
import useStore from "../../../../store";
// import debounce from "lodash/debounce";

const FormComponent: React.FC<any> = observer(
  ({ form, id, handleSubmit, handleChange, editValues, type }) => {
    const { LOV_STORE } = useStore();
    const { getACOSectionTreeList } = LOV_STORE;
    const [fetchACOSection, setFetchACOSection] = useState<boolean>(true);
    const [parentVal, setParentVal] = useState();

    // set the form values to edit
    useEffect(() => {
      if (editValues && type === "edit") {
        // LOV_STORE.dropdown_aco_section_list = editValues.parent && [
        //   editValues.parent,
        // ];

        setParentVal(editValues.parent && editValues.parent.id);

        form.setFieldsValue({
          name: editValues.name,
          desc: editValues.desc,
          action: editValues.action,
          controller: editValues.controller,
          sort_order: editValues.sort_order,
          parent_id: parentVal,
        });
      }
    }, [editValues, form]);

    const onParentChange = (newValue: any) => {
      setParentVal(newValue);
    };

    return (
      <FormBox
        form={form}
        id={id}
        onFinish={handleSubmit}
        onChange={handleChange}
      >
        <Row gutter={15}>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              required
              label="Name"
              placeholder="Name"
              name="name"
              rules={ACOSectionRequest.name}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              required
              label="Controller"
              placeholder="Controller"
              name="controller"
              rules={ACOSectionRequest.controller}
              disabled={type === "edit" ? true : false}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              label="Parent Controller"
              valuePropName="parent_id"
              name="parent_id"
            >
              <TreeSelect
                // defaultValue={
                //   editValues && type === "edit" && editValues.controller_name
                // }
                placeholder="Please select"
                value={parentVal}
                showSearch
                allowClear
                treeDefaultExpandAll
                showCheckedStrategy={TreeSelect.SHOW_ALL}
                onChange={(e: any) => {
                  onParentChange(e);
                  handleChange();
                }}
                onFocus={() =>
                  fetchACOSection &&
                  getACOSectionTreeList().then(() => setFetchACOSection(false))
                }
                notFoundContent={
                  fetchACOSection ? <Spin size="small" /> : "No Record Found."
                }
                fieldNames={{ value: "id", label: "name" }}
                treeData={LOV_STORE.dropdown_aco_section_tree_list}
                treeNodeFilterProp="name"
                filterTreeNode={(search, item: any) => {
                  return (
                    item.controller
                      .toLowerCase()
                      .indexOf(search.toLowerCase()) >= 0
                  );
                }}
              />
            </Form.Item>
            {/* <InputBox.Select
              label="Parent Controller"
              name="parent_id"
              rules={ACOSectionRequest.parent_id}
              placeholder="Select Parent Controller"
              showSearch
              onChange={handleChange}
              onFocus={() =>
                fetchACOSection &&
                getACOSectionList().then(() => setFetchACOSection(false))
              }
              notFoundContent={
                fetchACOSection ? <Spin size="small" /> : "No Record Found."
              }
              // onChange={(e) => handleStateChange(e)}
              options={{
                list: LOV_STORE.dropdown_aco_section_list,
                valueKey: "id",
                textKey: "name",
              }}
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            /> */}
          </Col>
          {type === "edit" ? (
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Sort Order"
                placeholder="Sort Order"
                name="sort_order"
                rules={ACOSectionRequest.ACOSectionRequest}
              />
            </Col>
          ) : (
            <></>
          )}
        </Row>
        <Row gutter={15}>
          <Col xs={{ span: 24 }}>
            <InputBox.TextArea
              label="Description"
              name="desc"
              placeholder="Description"
              onChange={handleChange}
              rules={ACOSectionRequest.description}
            />
          </Col>
        </Row>
      </FormBox>
    );
  }
);

export default FormComponent;
