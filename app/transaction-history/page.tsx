"use client";
import { personalInfoAtom, transactionHistoryAtom } from "@/app/components/atoms";
import { Skeleton } from "@/src/components/ui/skeleton";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import { useRecoilValueLoadable } from "recoil";
interface UserType {
  name: string;
  email: string;
  phone: string;
  balance: number;
}

interface tHistory {
  id: number;
  senderId: number;
  receiverId: number;
  amount: number;
  status: string;
  timestamp: string;
}
const TransactionHistory = () => {
  const userInfo = useRecoilValueLoadable<UserType>(personalInfoAtom);

  const history = useRecoilValueLoadable<tHistory[]>(transactionHistoryAtom);

  if (history.state === "loading") {
    return <div><Skeleton className="w-full h-[300px] rounded-full bg-green-800" />
</div>;
  } else if (history.state === "hasError") {
    return <div>there was an error getting details</div>;
  } else if (history.state === "hasValue") {
    return (
      <div className="bg-green-50">
         <div className="  flex justify-end m-2 items-center   ">
        <div className="flex flex-col shadow-md justify-center items-center w-[188px] h-[200px] border-2 bg-blue-100 ">
        <Avatar>
          <AvatarImage className="w-12 h-12 rounded-full" src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

       <div className="flex flex-col justify-center items-center text-lg font-bold">
       <span>{userInfo.contents.name.toUpperCase()}</span>
       <span>Balance:{userInfo.contents.balance}</span>
       </div>
        </div>
      </div>
        {history.contents.map((item: tHistory) => (
          <div className=" bg-slate-300 p-4 flex justify-between items-center text-lg">
            <span>Sender:{item.senderId}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>

            <span className="flex items-center justify-between"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
{item.amount}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>

            <span>Receiver:{item.receiverId}</span>
            <span>{item.status}</span>

            <span> {item.status === "Success" ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 bg-green-500 rounded-full">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
<path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

}</span>
          </div>
        ))}
      </div>
    );
  }
};

export default TransactionHistory;
