import React, { useEffect, useState } from "react";
import { Col, Row, Spin, Form, Button } from "antd";
import { observer } from "mobx-react";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import { ChecklistRequest } from "../../../../requests/PageRequest";
import useStore from "../../../../store";
import AnswerModalComponent from "./AnswerModalComponent";
// import debounce from "lodash/debounce";

const FormComponent: React.FC<any> = observer(
  ({ form, id, handleSubmit, handleChange, editValues, type }) => {
    const { LOV_STORE } = useStore();
    const { getInspectionAreaList, getChecklistCategoryList, getPriorityList } =
      LOV_STORE;

    const [fetchChecklistFor, setFetchChecklistFor] = useState(true);
    const [fetchChecklistCat, setFetchChecklistCat] = useState(true);
    const [fetchPriority, setFetchPriority] = useState(true);
    const [answerModal, setAnswerModal] = useState<boolean>(false);

    // set the form values to edit
    useEffect(() => {
      if (editValues && type === "edit") {
        LOV_STORE.dropdown_inspection_area_list =
          editValues.inspection_area && [editValues.inspection_area];

        LOV_STORE.dropdown_checklist_category_list =
          editValues.checklist_category && [editValues.checklist_category];

        LOV_STORE.dropdown_priority_list = editValues.priority && [
          editValues.priority,
        ];

        form.setFieldsValue({
          inspection_area_id: editValues.inspection_area_id,
          checklist_category_id: editValues.checklist_category_id,
          title: editValues.title,
          priority_id: editValues.priority_id,
          sort_order: editValues.sort_order,
          desc: editValues.desc,
        });
      }
    }, [editValues, form]);

    const addAnswer = (data: any) => {
      // console.log("option", data);
      const answerVal = data.answers.map((val: any) => val.answer);
      form.setFieldsValue({
        answers: answerVal,
      });
      closeOptionsModal();
    };

    const closeOptionsModal = () => {
      setAnswerModal(false);
    };

    const openOptionsModal = () => {
      setAnswerModal(true);
    };

    return (
      <>
        <AnswerModalComponent
          visible={answerModal}
          close={closeOptionsModal}
          addAnswer={addAnswer}
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
                label="Checklist for"
                name="inspection_area_id"
                placeholder="Select Checklist for"
                showArrow
                showSearch
                onFocus={() =>
                  fetchChecklistFor &&
                  getInspectionAreaList().then(() =>
                    setFetchChecklistFor(false)
                  )
                }
                notFoundContent={
                  fetchChecklistFor ? <Spin size="small" /> : "No Record Found."
                }
                options={{
                  list: LOV_STORE.dropdown_inspection_area_list,
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
              <InputBox.Select
                label="Checklist Category"
                name="checklist_category_id"
                placeholder="Select Checklist Category"
                showArrow
                showSearch
                onFocus={() =>
                  fetchChecklistCat &&
                  getChecklistCategoryList().then(() =>
                    setFetchChecklistCat(false)
                  )
                }
                notFoundContent={
                  fetchChecklistCat ? <Spin size="small" /> : "No Record Found."
                }
                options={{
                  list: LOV_STORE.dropdown_checklist_category_list,
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
                label="Title"
                placeholder="Title"
                name="title"
                rules={ChecklistRequest.title}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Select
                label="Priority"
                name="priority_id"
                placeholder="Select Priority"
                showArrow
                showSearch
                onFocus={() =>
                  fetchPriority &&
                  getPriorityList().then(() => setFetchPriority(false))
                }
                notFoundContent={
                  fetchPriority ? <Spin size="small" /> : "No Record Found."
                }
                options={{
                  list: LOV_STORE.dropdown_priority_list,
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
              <Form.Item label="Answers">
                <InputBox.Text name="answers" hidden={true} />
                <Button
                  type="primary"
                  className="secondarySmallBtn"
                  onClick={openOptionsModal}
                >
                  Manage
                </Button>
              </Form.Item>
            </Col>
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
            <Col xs={{ span: 24 }}>
              <InputBox.TextArea
                label="Description"
                name="desc"
                placeholder="Description"
                rules={ChecklistRequest.desc}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </FormBox>
      </>
    );
  }
);

export default FormComponent;
