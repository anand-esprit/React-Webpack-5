import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Button, Modal, Form, Row, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { InputBox } from "../../../../components/AntdAddons";

const OptionsModalComponent: React.FC<any> = observer(
  ({ visible, close, addOptions, editValues, type }) => {
    const [form] = Form.useForm();

    useEffect(() => {
      let optionsData: any = [];

      if (type === "add") {
        optionsData.push({
          option: "",
        });
      }

      if (editValues && type === "edit") {
        console.log("editValues.options", editValues.options);
        const options = JSON.parse(editValues.options);

        if (options?.length > 0) {
          optionsData = options.map((item: any) => {
            return { option: item.option };
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
        options: optionsData,
      });
    }, [editValues]);

    return (
      <Modal
        centered
        title="Options"
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
              form="addOptionsForm"
            >
              Submit
            </Button>
          ) : null,
        ]}
      >
        <Form
          form={form}
          name="addOptionsForm"
          onFinish={addOptions}
          autoComplete="off"
          className="addModerator"
        >
          <Form.List name="options">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }) => (
                  <Row gutter={15} key={key}>
                    <Col xs={{ span: 24 }} md={{ span: 22 }}>
                      <InputBox.Text
                        required
                        // label="Email"
                        placeholder="Option"
                        name={[name, "option"]}
                        disabled={type === "view"}
                        rules={[
                          {
                            required: true,
                            message: "Option field is Required",
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
                    Add Option
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

export default OptionsModalComponent;
