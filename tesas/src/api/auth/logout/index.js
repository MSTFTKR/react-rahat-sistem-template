/** @format */

import axios from "axios";
import { cookies } from "../../../utils/cookie";

export const logout = () => {
    console.log('asdsada')
    // const refreshToken = cookies.get("jwt-refresh");

    // if (refreshToken) {
    //     axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, {
    //         refreshToken,
    //     });
    // }

    cookies.remove("jwt-access");
    cookies.remove("jwt-access-expires");
    cookies.remove("jwt-refresh");
    cookies.remove("jwt-refresh-expires");
};