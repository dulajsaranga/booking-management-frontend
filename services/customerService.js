import { instance } from "./api";

export const getCustomers = async() => {
    const response = await instance.get("/customer");
    return response.data;
}

export const addCustomer = async(customer) => {
    return await instance.post("/customer", customer);
}