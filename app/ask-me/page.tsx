import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import axios from "axios";
import React, { useState } from "react";

const AskMe = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const HandleSearch = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/ask-me",
        {
          question,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setAnswer(response.data.answer);
      } else {
        console.log("error in getting results");
      }
    } catch (error) {
      console.log("error sending request", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-gray-50 shadow-md rounded-lg">
      <h2 className="text-center text-xl font-semibold text-primary mb-4">
        Ask About Money Matters
      </h2>
      <form onSubmit={HandleSearch} className="flex flex-col space-y-4">
        <Input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your financial question..."
          className="p-3 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button
          type="submit"
          className="bg-primary text-white hover:bg-primary-dark py-2 rounded-lg transition duration-150"
        >
          Ask
        </Button>
      </form>
      {answer && (
        <div className="mt-6 p-4 bg-primary-light text-secondary-dark rounded-lg shadow-inner">
          <h3 className="text-md font-bold">Answer:</h3>
          <p className="text-sm">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default AskMe;
