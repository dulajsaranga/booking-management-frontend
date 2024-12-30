import { instance } from "./api";

export const getRooms = async() => {
    const response = await instance.get("/rooms");
    return response.data;
}