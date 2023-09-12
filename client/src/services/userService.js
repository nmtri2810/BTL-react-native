import axios from "./customAxios";

export const getUser = (id) => {
    return axios.get(`users/?id=${id}`);
};

export const updateUser = (name, phoneNum, email) => {
    return axios.put("update-user", {
        name,
        phoneNum,
        email,
    });
};
