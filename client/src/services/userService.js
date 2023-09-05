import axios from "./customAxios";

export const updateUser = (name, phoneNum, email) => {
    return axios.put("update-user", {
        name,
        phoneNum,
        email,
    });
};
