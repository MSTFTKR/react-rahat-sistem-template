/** @format */
import axios from "axios";
import CheckToken from "../../../utils/checkToken/CheckToken";
export const dataList = async (
    pageNumber,
    pageSize,
    searchedValue,
    sort,
    filter
) => {
    const token = await CheckToken();
    if (!token) {
        // Redirect to login page
        window.location.href = "/login";
    }

    return await axios.post(
        `${process.env.REACT_APP_API_URL}/tax-payer/get-list`,
        {
            data:{pageNumber,
            pageSize,
            searchedValue,
            sort,
            filter,}
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
}

