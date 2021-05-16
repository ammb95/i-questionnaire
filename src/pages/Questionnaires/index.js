import React from "react";
import useData from "../../hooks/useData";
import Questionnaire from "./Questionnaire";

export default function Questions() {
  const { data: questionnaires } = useData("questionnaires", "questionnaires");

  return (
    <>
      <div className="text-2xl font-semibold text-white">
        Available Questionaires
      </div>
      <div className="pt-16 flex justify-center w-full h-fc md:h-screen/2">
        <div className="w-full md:w-4/5 grid grid-cols-3 gap-8">
          {questionnaires?.map((q) => (
            <Questionnaire key={q?._id} questionnaire={q} />
          ))}
        </div>
      </div>
    </>
  );
}
