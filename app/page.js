"use client";

import { useState } from "react";
import { Button, Table, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getBookings, deleteBooking } from "@/services/bookingService";
import { useQuery, useMutation } from "@tanstack/react-query";
import AddBookingModal from "./components/AddBookingModal";
import dayjs from "dayjs";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings
  });

  const { mutate: removeBooking } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      message.success("Booking deleted successfully");
      refetch();
    },
    onError: (error) => {
      message.error("Unable to delete booking");
    }
  });

  const columns = [
    {
      title: "Booking ID",
      key: "id",
      dataIndex: "id"

  },
    {
      title: "Customer",
      key: "customer",
      render: (record) => `${record?.customer?.firstName} ${record?.customer?.lastName}`
    },
    {
      title: "Room",
      key: "room",
      render: (record) => `${record?.room?.roomName}`
    },
    {
      title: "Dates",
      key: "date",
      render: (record) => `${record?.bookingDateFrom} - ${record?.bookingDateTo}`
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "bookingType"
    },
    {
      title: "Amount (LKR)",
      key: "amount",
      dataIndex: "bookingAmount"
    },
    {
      title: "Booked on",
      key: "booked-datte",
      render: (record) => dayjs(record?.createdAt).format("YYYY-MM-DD")
    },
    {
      key: "actions",
      render: (record) =>
        <div className="flex">
          <Button icon={<EditOutlined />} className="mr-2" />
          <Button icon={<DeleteOutlined />} danger onClick={() => removeBooking(record?.id)}/>
        </div>
    }
  ];

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>Add New Booking</Button>
      </div>
      <Table columns={columns} dataSource={data} isLoading={isLoading}/>
      <AddBookingModal open={isModalOpen} onCancel={handleModalClose}/>
    </div>
  );
}
