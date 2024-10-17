"use client";
import { Button } from "@/src/components/ui/button";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const Signin = () => {
  const router = useRouter();
  const [data, setData] = useState({
    phone: "",
    password: "",
  });
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://payment-backend-lb-340135517.ap-southeast-2.elb.amazonaws.com/api/signin",
        data,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("token", response.data.token);
      console.log(response.data);
      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen">
      <div className="flex flex-1 justify-center items-center border-2">
        <img src="https://i.pinimg.com/564x/c9/4d/57/c94d57ef1a4a3a8dd0b9cd2392a0cc6f.jpg" alt="payment-img"/>
      </div>
      <div className="flex  flex-1 justify-center items-center ">
        <div className=" flex p-2 w-[300px] h-[320px] flex-col border-2 ">
          <h1 className="text-4xl">Signin</h1>
          <form
            className="flex flex-col justify-between p-2 gap-2"
            onSubmit={HandleSubmit}
          >
            <input
              className="py-2 border-b-2 outline-none focus: ring-0 focus:border-slate-600 "
              name="phone"
              value={data.phone}
              type="phone"
              placeholder="Phone"
              onChange={HandleChange}
            />
            <input
              className="py-2 border-b-2 outline-none focus: ring-0 focus:border-slate-600 "
              name="password"
              value={data.password}
              type="text"
              placeholder="Password"
              onChange={HandleChange}
            />
            <button className="px-4 py-2 bg-slate-600 text-white" type="submit">
              Submit
            </button>
          </form>
          <span className="text-md">
            Don't have an account? signup here.{" "}
            <Link className="px-4 py-2 bg-slate-600 text-white" href="/signup">
              <Button>SignUp</Button>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signin;
