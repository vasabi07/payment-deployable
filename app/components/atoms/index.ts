"use client"
import axios from "axios";
import { atom, selector } from "recoil";

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token"); 
  }
  return null;
};
export const usersListAtom = atom({
  key: "usersListAtom",
  default: selector({
    key: "usersListAtomSelector",
    get: async () => {
      const token = getToken();
      const response = await axios.get("http://payment-backend-lb-340135517.ap-southeast-2.elb.amazonaws.com/api/users/allusers", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
       
      });
      return response.data.payload;
    },
  }),
});

export const personalInfoAtom = atom({
  key: "personalInfoAtom",
  default: selector({
    key: "personalInfoAtomSelector",
    get: async () => {
      const token = getToken();
      const response = await axios.get("http://payment-backend-lb-340135517.ap-southeast-2.elb.amazonaws.com/api/personalInfo", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      });
      return response.data.payload;
    },
  }),
});

export const transactionHistoryAtom = atom({
  key: "transactionHistoryAtom",
  default: selector({
    key: "transactionHistoryAtomSelector",
    get: async () => {
      const token = getToken();
      const response = await axios.get("http://payment-backend-lb-340135517.ap-southeast-2.elb.amazonaws.com/api/history", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      });
      return response.data.payload;
    },
  }),
});
