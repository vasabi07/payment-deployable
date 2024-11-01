"use client";
import { Input } from "@/src/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { useRecoilValue } from "recoil";
import { getToken, personalInfoAtom } from "./atoms";

const TransactionModal = ({
  receiverId,
  receiverName,
  onClose,
}: {
  receiverId: string;
  receiverName: string;
  onClose: () => void;
}) => {
  const [money, setMoney] = useState(0);
  const [userPin, setUserPin] = useState<string | null>(null);
  const { pin } = useRecoilValue(personalInfoAtom);
  const [processing, setProcessing] = useState(false);
  const startTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isNaN(money) || money <= 0 || pin !== userPin) {
      console.error("Please enter a valid amount.");
      return;
    }
    try {
      console.log({ receiverId, amount: money });
      const token = getToken();
      if (!token) {
        return console.log("Token hasn't reached post request");
      }
      const response = await axios.post(
        "https://paymentbackend.vasprojects.com/api/transfer",
        {
          receiverId: receiverId.toString(),
          amount: money,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setProcessing(true);
      }
      console.log(response);
    } catch (error) {
      console.log("Transaction failed at the frontend", error);
    }
  };

  return (
    <div>
      {!processing && (
        <Card className="flex flex-col gap-2 bg-green-50 shadow-md rounded-lg">
          <CardHeader className="flex justify-center items-center pt-2 text-xl text-gray-800">
            <CardTitle>Enter the amount below</CardTitle>
          </CardHeader>
          <form className="flex flex-col justify-between p-4 gap-4">
            <CardContent>
              <Input
                name="amount"
                type="number"
                className="p-2 outline-none focus:border-stone-400 focus:ring focus:ring-stone-200"
                onChange={(e) => setMoney(parseFloat(e.target.value))}
                placeholder="Amount"
              />
            </CardContent>
            <CardContent>Enter your PIN below</CardContent>
            <CardContent>
              <Input
                name="pin"
                type="password" // Changed to password input for better security
                className="p-2 outline-none focus:border-stone-400 focus:ring focus:ring-stone-200"
                onChange={(e) => setUserPin(e.target.value)}
                placeholder="PIN"
              />
            </CardContent>
            <CardContent className="text-gray-700">
              You are sending money to: <strong>{receiverName}</strong>
            </CardContent>
            <CardContent>
              <Button
                className="w-full bg-blue-600 text-white hover:bg-blue-500"
                onClick={startTransaction}
                type="button"
              >
                Pay
              </Button>
            </CardContent>
          </form>
        </Card>
      )}
      <div className="w-full bg-blue-200">
        {processing && (
          <div className="bg-green-100 shadow-lg p-4 rounded-md">
            <div className="text-lg text-gray-800">
              Your transaction is being processed.
              <br /> Close the modal and go to the Transaction History page to see
              the result.
            </div>
            <div className="mt-4">
              <Button 
                className="p-2 bg-gray-300 hover:bg-gray-400"
                onClick={() => {
                  setProcessing(false);
                  onClose();
                }}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionModal;
