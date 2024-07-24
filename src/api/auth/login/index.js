/** @format */

import axios from "axios";

export const login = (email, password) => {
    // return axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
    //     email,
    //     password,
    // });
    return new Promise((resolve,reject)=>setTimeout(resolve({
        data:{tokens:{
            access:{
                token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MjE3NDA4NDAsImV4cCI6MTcyMTc0NDQ0MH0.dl02Yt6AoBmehjuATFzKgctXfASBDg_A-MxUPn1ZmUw",expires:1721732440
            },
            refresh  :{
                token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MjE3Mjg4NDAsImV4cCI6MTcyMTczMjQ0MH0.NCeqvyHm_3lBwMdfhDhouuc1UNaGndP0wcmYVXLSmEU",
                expires:1721732440
            }
        }}
        
    }),2000))
};
