import { instance } from "./api";

export const getBookings = async() => {
    const response = await instance.get("/booking");
    return response.data;
}

export const deleteBooking = async(id) => {
    return await instance.delete(`/booking/${id}`);
}

export const addBooking = async(booking) => {
    return await instance.post("/booking", booking);
}

export const updateBooking = async(id, booking) => {
    return await instance.put(`/booking/${id}`, booking);
}