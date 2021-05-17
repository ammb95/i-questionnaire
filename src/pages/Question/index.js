import React from "react";
import { useParams } from "@reach/router";
import useData from "../../hooks/useData";
import Answer from "./Answer";

export default function Question() {
  const { id } = useParams();

  const { data: question } = useData("question", `question/${id}`);

  return (
    <>
      <div className="p-4 text-xl font-semibold text-white cursor-default">
        {`${question?.number}. ${question?.body}`}
      </div>
      {!question?.answers.length ? (
        <div className="bg-green-900 text-gray-200 font-semibold text-xl p-4">
          No answers have been provided for this question.
        </div>
      ) : (
        <>
          {question.answers?.map((answer) => (
            <Answer key={answer._id} {...answer} />
          ))}
        </>
      )}
    </>
  );
}
