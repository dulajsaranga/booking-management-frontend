"use client";

import { useState } from "react";
import { Button, Table, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getBookings, deleteBooking, addBooking, updateBooking } from "@/services/bookingService";
import { getRooms } from "@/services/roomService";
import { getCustomers } from "@/services/customerService";
import { useQuery, useMutation } from "@tanstack/react-query";
import AddBookingModal from "./components/AddBookingModal";
import dayjs from "dayjs";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings
  });

  const { data: rooms} = useQuery({
    queryKey: ['rooms'],
    queryFn: getRooms
  });

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers
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

  const { mutate: saveBooking } = useMutation({
    mutationFn: addBooking,
    onSuccess: () => {
      message.success("Booking added successfully");
      setIsModalOpen(false);
      refetch();
    },
    onError: (error) => {
      message.error("Unable to add booking");
    }
  });

  const { mutate: editBooking } = useMutation({
    mutationFn: ({ id, payload }) => updateBooking(id, payload),
    onSuccess: () => {
      message.success("Booking updated successfully");
      setIsModalOpen(false);
      refetch();
    },
    onError: (error) => {
      message.error("Unable to update booking");
    }
  });

  const columns = [
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
          <Button icon={<EditOutlined />} className="mr-2" onClick={() => {
            setSelectedRecord(record);
            setIsModalOpen(true);
          }}/>
          <Button icon={<DeleteOutlined />} danger onClick={() => removeBooking(record?.id)}/>
        </div>
    }
  ];
        
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  }

  const handleAdd = (payload) => {
    saveBooking(payload);
  }

  const handleUpdate = (payload) => {
    editBooking({ id: selectedRecord.id, payload });
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>Add New Booking</Button>
      </div>
      <Table columns={columns} dataSource={data} isLoading={isLoading}/>
      { isModalOpen && 
      <AddBookingModal 
        open={isModalOpen} 
        onCancel={handleModalClose} 
        customers={customers} 
        rooms={rooms} 
        selectedRecord={selectedRecord} 
        onSubmit={handleAdd} 
        onUpdate={handleUpdate}
      />}
    </div>
  );
}
