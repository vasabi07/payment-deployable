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
    return (
      <div className="p-4">
        <Skeleton className="w-full h-[300px] rounded-md bg-green-800" />
      </div>
    );
  } else if (history.state === "hasError") {
    return <div className="text-red-500">There was an error getting details</div>;
  } else if (history.state === "hasValue") {
    return (
      <div className="bg-white p-4 shadow-md rounded-md">
        <div className="flex justify-end mb-6">
          <div className="flex flex-col items-center p-4 bg-blue-100 shadow-lg rounded-md w-[220px]">
            <Avatar className="mb-3">
              <AvatarImage
                className="w-16 h-16 rounded-full"
                src="https://github.com/shadcn.png"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-xl font-semibold">{userInfo.contents.name.toUpperCase()}</h2>
              <p className="text-gray-600">Balance: ${userInfo.contents.balance.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {history.contents.map((item: tHistory) => (
            <div key={item.id} className="p-4 bg-gray-100 shadow-md rounded-md flex items-center justify-between">
              <span className="font-medium">Sender: {item.senderId}</span>
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
                <span className="font-semibold">${item.amount.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
                <span className="font-medium">Receiver: {item.receiverId}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-semibold ${item.status === "Success" ? "text-green-600" : "text-red-600"}`}>
                  {item.status}
                </span>
                {item.status === "Success" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-green-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default TransactionHistory;
