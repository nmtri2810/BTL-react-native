import useAuth from "./useAuth";
import axios from "../api/customAxios";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const res = await axios.get("refresh");
        setAuth((prev) => {
            console.log(JSON.stringify(prev));
            console.log(res.data.access_token);
            return {
                ...prev,
                email: res.data.email,
                role: res.data.role_id,
                accessToken: res.data.access_token,
            };
        });
        return res.data.access_token;
    };

    return refresh;
};

export default useRefreshToken;
