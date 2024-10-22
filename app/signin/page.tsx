"use client";
import { Button } from "@/src/components/ui/button";
import { toast } from "@/src/hooks/use-toast";
import axios from "axios";
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
        "https://paymentbackend.vasprojects.com/api/signin",
        data,
        {
          withCredentials: true,
        }
      );
      
      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast({
          title: "Success",
          description: "successfully logged in",
          className:  "bg-black text-stone-200 p-2 rounded-md m-2 fixed bottom-4 right-4 w-auto max-w-xs shadow-lg",
        });
        router.push("/");
      }else{
        toast({
          title: "Failure",
          description: "Issue with login",
          className:  "bg-black text-stone-200 p-2 rounded-md m-2 fixed bottom-4 right-4 w-auto max-w-sm shadow-lg",
        });
        router.push("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="w-full h-auto flex flex-1 justify-center items-center border-2">
        <img src="https://i.pinimg.com/564x/c9/4d/57/c94d57ef1a4a3a8dd0b9cd2392a0cc6f.jpg" alt="payment-img"/>
      </div>
      <div className="flex  flex-1 justify-center items-center ">
        <div className=" flex p-2 w-[350px] h-[320px]  flex-col border-2 rounded-md shadow-md">
          <h1 className="text-4xl">Signin</h1>
          <form
            className="flex flex-col justify-between p-2 gap-3 mb-4 "
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
            <Button className="px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-800" type="submit">
              Submit
            </Button>
          </form>
          <span className="text-md">
            Don't have an account? signup here.{" "}
            <Link className="p-1 rounded-md hover:bg-stone-400 text-stone-700 bg-stone-300" href="/signup">
              SignUp
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signin;
