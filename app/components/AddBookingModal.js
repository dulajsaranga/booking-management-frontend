import { Modal, Form, Input, DatePicker } from "antd";

const AddBookingModal = ({ open, onCancel, onOk }) => {
    const [form] = Form.useForm();

    return(
        <Modal title="Add Booking" open={open} onCancel={onCancel} onOk={onOk}>
            <Form
                name="add-booking-form"
                form={form}
                layout="vertical"
            >
                <Form.Item>
                    <Input/>
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default AddBookingModal;