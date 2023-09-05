import axios from "./customAxios";

export const reserve = (reservationTime, numOfPeople, notes, email) => {
    return axios.post("reserve", {
        reservationTime,
        numOfPeople,
        notes,
        email,
    });
};

export const reservationHistory = (email) => {
    return axios.get(`reservation/${email}`);
};
