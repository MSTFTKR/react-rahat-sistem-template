/** @format */

import { cookies } from "../cookie";
import { refreshToken } from "../../api/auth/refreshToken";

const removeCookies = () => {
    cookies.remove("jwt-access", { path: "/" });
    cookies.remove("jwt-access-expires", { path: "/" });
    cookies.remove("jwt-refresh", { path: "/" });
    cookies.remove("jwt-refresh-expires", { path: "/" });
};

const CheckToken = async () => {
    const currentRefresh = cookies.get("jwt-refresh");
    if (cookies.get("jwt-access")) {
        if (new Date(cookies.get("jwt-access-expires")) > new Date()) {
            return cookies.get("jwt-access");
        } else if (currentRefresh) {
            if (new Date(cookies.get("jwt-refresh-expires")) > new Date()) {
                const resp = await refreshToken(currentRefresh);
                cookies.set("jwt-access", resp?.data?.access?.token);
                cookies.set("jwt-access-expires", resp?.data?.access?.expires);
                cookies.set("jwt-refresh", resp?.data?.refresh?.token);
                cookies.set(
                    "jwt-refresh-expires",
                    resp?.data?.refresh?.expires
                );

                return resp?.data?.access?.token;
            } else {
                return false;
            }
        } else {
            removeCookies();
            return false;
        }
    } else {
        removeCookies();
        return false;
    }
};

export default CheckToken;
