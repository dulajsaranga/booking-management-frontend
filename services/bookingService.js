import { instance } from "./api";

export const getBookings = async() => {
    const response = await instance.get("/booking");
    return response.data;
}

export const deleteBooking = async(id) => {
    return await instance.delete(`/booking/${id}`);
}