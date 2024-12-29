"use client";

import { Button, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getBookings } from "@/services/bookingService";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings
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
          <Button icon={<EditOutlined />} className="mr-2" />
          <Button icon={<DeleteOutlined />} danger/>
        </div>
    }
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Button type="primary">Add New Booking</Button>
      </div>
      <Table columns={columns} dataSource={data} isLoading={isLoading}/>
    </div>
  );
}
