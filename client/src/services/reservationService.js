import axios from "./customAxios";

export const reserve = (reservationTime, numOfPeople, notes, email) => {
    return axios.post("create-reservation", {
        reservationTime,
        numOfPeople,
        notes,
        email,
    });
};

export const reservationHistory = (userId) => {
    return axios.get(`reservations?id=${userId}`);
};
