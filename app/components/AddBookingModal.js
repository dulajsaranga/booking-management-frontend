import { useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select, Button } from "antd";
import dayjs from "dayjs";
import { bookingTypes } from "@/const";

const AddBookingModal = ({ open, onCancel, onSubmit, customers, rooms, onUpdate, selectedRecord }) =>{
    const [form] = Form.useForm();

    useEffect(() => {
        if(selectedRecord) {
            form.setFieldsValue({
                ...selectedRecord,
                bookingDateFrom: dayjs(selectedRecord.bookingDateFrom),
                bookingDateTo: dayjs(selectedRecord.bookingDateTo)
            })
        }
    },[selectedRecord]);


    const handleSubmit = (data) => {
        const room = rooms.find(room => room.id === data.roomId);

        const payload = {
            ...data,
            bookingDateFrom: dayjs(data.bookingDateFrom).format("YYYY-MM-DD"),
            bookingDateTo: dayjs(data.bookingDateTo).format("YYYY-MM-DD"),
            bookingAmount: room?.roomPrice,
        }

        if(selectedRecord) {
            onUpdate(payload);
        } else {
            onSubmit(payload);;
        }
    }

    return(
        <Modal title={selectedRecord ? "Update" : "Add New Booking"} open={open} onCancel={onCancel} footer={false} destroyOnClose={true}>
            <Form
                name="add customer-form" 
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item label="Customer" name="customerId" required={true} rules={[{ required: true, message: "Please select customer"}]}>
                    <Select
                        showSearch
                        optionFilterProp="label"
                        options={customers?.map(customer => ({
                            value: customer.id,
                            label: `${customer?.firstName} ${customer?.lastName}`
                        }))}
                    />
                </Form.Item>
                <Form.Item label="Room" name="roomId" required={true} rules={[{ required: true, message: "Please select room"}]}>
                    <Select
                        showSearch
                        optionFilterProp="label"
                        options={rooms?.map(room => ({
                            value: room.id,
                            label: room.roomName
                        }))}
                    />
                </Form.Item>
                <Form.Item label="Booking Type" name="bookingType" required={true} rules={[{ required: true, message: "Please select booking type"}]}>  
                    <Select
                        options={bookingTypes}
                    />
                </Form.Item>
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item label="Start Date" name="bookingDateFrom" required={true} rules={[{ required: true, message: "Please select start date"}]}>
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item label="End Date" name="bookingDateTo" required={true} rules={[{ required: true, message: "Please select end date"}]}>
                        <DatePicker/>
                    </Form.Item>
                </div>
                <div className="flex justify-end">
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}

export default AddBookingModal;