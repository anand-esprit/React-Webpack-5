import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Button, Modal, Form, Row, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { InputBox } from "../../../../components/AntdAddons";

const AnswerModalComponent: React.FC<any> = observer(
  ({ visible, close, addAnswer, editValues, type }) => {
    const [form] = Form.useForm();

    useEffect(() => {
      let answersData: any = [];

      if (type === "add") {
        answersData.push({
          option: "",
        });
      }

      if (editValues && type === "edit") {
        const answers = JSON.parse(editValues.answers);
        if (answers?.length > 0) {
          answersData = answers.map((item: any) => {
            return { answer: item };
          });
        }
      }

      // if (viewValues && type === "view") {
      //   const options = JSON.parse(viewValues.options);

      //   if (options?.length > 0) {
      //     optionsData = options.map((item: any) => {
      //       return { option: item.option };
      //     });
      //   }
      // }

      form.setFieldsValue({
        answers: answersData,
      });
    }, [editValues]);

    return (
      <Modal
        centered
        title="Answers"
        open={visible}
        closeIcon={<FontAwesomeIcon icon={faTimes} />}
        onCancel={close}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        footer={[
          // <Button key="2" htmlType="button" className="cancelBtn" onClick={close}>
          //   Cancel
          // </Button>,

          type !== "view" ? (
            <Button
              key="1"
              type="primary"
              htmlType="submit"
              form="addAnswerForm"
            >
              Submit
            </Button>
          ) : null,
        ]}
      >
        <Form
          form={form}
          name="addAnswerForm"
          onFinish={addAnswer}
          autoComplete="off"
          className="addModerator"
        >
          <Form.List name="answers">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }) => (
                  <Row gutter={15} key={key}>
                    <Col xs={{ span: 24 }} md={{ span: 22 }}>
                      <InputBox.Text
                        required
                        // label="Email"
                        placeholder="Answer"
                        name={[name, "answer"]}
                        disabled={type === "view"}
                        rules={[
                          {
                            required: true,
                            message: "Answer field is Required",
                          },
                        ]}
                      />
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 2 }}>
                      {type !== "view" && name !== 0 && (
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      )}
                    </Col>
                  </Row>
                ))}
                {type !== "view" && (
                  <Button
                    className="addBtn"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Answer
                  </Button>
                )}
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    );
  }
);

export default AnswerModalComponent;
