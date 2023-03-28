import React, { useEffect, useState } from "react";
import { Col, Row, Spin, TreeSelect, Form } from "antd";
import { observer } from "mobx-react";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import { ACOActionRequest } from "../../../../requests/PageRequest";
import useStore from "../../../../store";
// import debounce from "lodash/debounce";

const FormComponent: React.FC<any> = observer(
  ({ form, id, handleSubmit, handleChange, editValues, type }) => {
    const { LOV_STORE } = useStore();
    const { getACOSectionTreeList } = LOV_STORE;
    const [fetchACOSection, setFetchACOSection] = useState<boolean>(true);
    const [sectionVal, setSectionVal] = useState();

    // set the form values to edit
    useEffect(() => {
      if (editValues && type === "edit") {
        // LOV_STORE.dropdown_aco_section_tree_list = editValues.controller && [
        //   {
        //     controller: editValues.controller,
        //     name: editValues.controller_name,
        //     children: [],
        //   },
        // ];

        setSectionVal(editValues.controller && editValues.controller);

        form.setFieldsValue({
          name: editValues.name,
          desc: editValues.desc,
          action: editValues.action,
          controller: sectionVal,
          sort_order: editValues.sort_order,
        });
      }
    }, [editValues, form]);

    const onSectionChange = (newValue: any) => {
      setSectionVal(newValue);
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
              rules={ACOActionRequest.name}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              required
              label="Action"
              placeholder="Action"
              name="action"
              rules={ACOActionRequest.action}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            {/* <InputBox.Select
              label="Controller"
              name="controller"
              placeholder="Select Section"
              required
              rules={ACOActionRequest.controller}
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
                valueKey: "controller",
                textKey: "name",
              }}
            /> */}
            <Form.Item
              label="Section"
              valuePropName="controller"
              name="controller"
              required
              rules={!sectionVal ? ACOActionRequest.controller : []}
            >
              <TreeSelect
                // defaultValue={
                //   editValues && type === "edit" && editValues.controller_name
                // }
                placeholder="Please select"
                value={sectionVal}
                showSearch
                allowClear
                treeDefaultExpandAll
                showCheckedStrategy={TreeSelect.SHOW_ALL}
                onChange={(e: any) => {
                  onSectionChange(e);
                  handleChange();
                }}
                onFocus={() =>
                  fetchACOSection &&
                  getACOSectionTreeList().then(() => setFetchACOSection(false))
                }
                notFoundContent={
                  fetchACOSection ? <Spin size="small" /> : "No Record Found."
                }
                fieldNames={{ value: "controller", label: "name" }}
                treeData={LOV_STORE.dropdown_aco_section_tree_list}
                treeNodeFilterProp="controller"
                filterTreeNode={(search, item: any) => {
                  return (
                    item.controller
                      .toLowerCase()
                      .indexOf(search.toLowerCase()) >= 0
                  );
                }}
              />
            </Form.Item>
          </Col>
          {type === "edit" ? (
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Sort Order"
                placeholder="Sort Order"
                name="sort_order"
                rules={ACOActionRequest.sort_order}
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
              rules={ACOActionRequest.description}
              onChange={handleChange}
            />
          </Col>
        </Row>
      </FormBox>
    );
  }
);

export default FormComponent;
