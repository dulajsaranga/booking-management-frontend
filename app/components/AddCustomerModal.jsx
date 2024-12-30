import { Modal, Form, Input, Button } from "antd"

const AddCustomerModal = ({ open, onSumbit, handleClose  }) => {
    const [form] = Form.useForm();

    return(
        <Modal
            title="Add Customer"
            open={open}
            onCancel={handleClose}
            footer={false}
            destroyOnClose={true}
        >
            <Form
                name="add-customer-form"
                form={form}
                layout="vertical"
                onFinish={onSumbit}
            >
                <Form.Item label="First Name" name="firstName" required={true} rules={[{required: true, message: "Please enter first name"}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Last Name" name="lastName" required={true} rules={[{required: true, message: "Please enter last name"}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Email" name="email" required={true} rules={[{required: true, message: "Please enter email"}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Contact No" name="contactNo" required={true} rules={[{required: true, message: "Please enter contact number"}]}>
                    <Input/>
                </Form.Item>

                <div className="flex justify-end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </div>
            </Form>
        </Modal>
    )
}

export default AddCustomerModal;