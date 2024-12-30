"use client";

import { useState } from "react";
import { Button, Table, message } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCustomers, addCustomer } from "@/services/customerService";
import AddCustomerModal from "../components/AddCustomerModal";

const  Customers = () => {
    const [showModal, setShowModal] = useState(false);

    const { data, isLoading, refetch} = useQuery({
        queryKey: ["customers"],
        queryFn: getCustomers
    });

    const { mutate: savePatient } = useMutation({
        mutationFn: addCustomer,
        onSuccess: () => {
            setShowModal(false);
            message.success("Successfully added");
            refetch();
        },
        onError: () => message.error("Something went wrong")
    })

    const columns = [
        {
            title: 'Id',
            key: 'id',
            dataIndex: 'id'
        },
        {
            title: 'First Name',
            key: 'firstName',
            dataIndex: 'firstName'
        },
        {
            title: 'Last Name',
            key: 'lastName',
            dataIndex: 'lastName'
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email'
        },
        {
            title: 'Contact No',
            key: 'contactNo',
            dataIndex: 'contactNo'
        }
    ];

    const handleSubmit = (payload) => {
        savePatient(payload);
    }

    return(
        <div>
            <div className="flex justify-end mb-4">
                <Button type="primary" onClick={() => setShowModal(true)}>Add Customer</Button>
            </div>
            <Table columns={columns} dataSource={data} loading={isLoading}/>
            <AddCustomerModal open={showModal} onSumbit={handleSubmit} handleClose={() => setShowModal(false)}  />
        </div>
    )
}

export default Customers;