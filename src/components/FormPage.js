import React, { useState } from "react";
import { Form, Input, Button, Modal, Checkbox, Radio } from "antd";

const FormPage = () => {
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      setFormData((prevData) => ({ ...prevData, ...values }));
      if (step < 6) {
        setStep(step + 1);
        form.resetFields();
      } else {
        setIsModalVisible(false);
        setStep(1);
        form.resetFields();
      }
    });
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setStep(1);
    form.resetFields();
  };

  const maritalStatusOptions = [
    { label: "Single", value: "Single" },
    { label: "Married", value: "Married" },
  ];

  const renderFormContent = () => {
    switch (step) {
      case 1:
        return (
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>
        );
      case 2:
        return (
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input />
          </Form.Item>
        );
      case 3:
        return (
          <Form.Item
            name="ssnNumber"
            label="SSN Number"
            rules={[
              { required: true, message: "Please input your SSN number!" },
            ]}
          >
            <Input />
          </Form.Item>
        );
      case 4:
        return (
          <Form.Item
            name="maritalStatus"
            label="Marital Status"
            rules={[
              { required: true, message: "Please select a marital status!" },
            ]}
          >
            <Radio.Group options={maritalStatusOptions} />
          </Form.Item>
        );
      case 5:
        if (formData.maritalStatus === "Single") {
          return (
            <Form.Item
              name="dependencies"
              label="Dependencies"
              rules={[{ required: true, message: "Please select an option!" }]}
            >
              <Radio.Group>
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </Radio.Group>
            </Form.Item>
          );
        } else if (formData.maritalStatus === "Married") {
          return (
            <Form.Item
              name="children"
              label="Children"
              rules={[{ required: true, message: "Please select an option!" }]}
            >
              <Radio.Group>
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </Radio.Group>
            </Form.Item>
          );
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Create Form
      </Button>
      <Modal
        title="Create Form"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handlePrev} disabled={step === 1}>
            Prev
          </Button>,
          <Button key="next" type="primary" onClick={handleOk}>
            {step === 5 ? "Submit" : "Next"}
          </Button>,
        ]}
      >
        <Form form={form}>{renderFormContent()}</Form>
      </Modal>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
};

export default FormPage;
