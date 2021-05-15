import { CardContent } from "@material-ui/core";
import React from "react";
import useData from "../../hooks/useData";
import { Link } from "@reach/router";

export default function Questions() {
  const { data: questionnaires } = useData("questionnaires", "questionnaires");

  return (
    <>
      <div className="text-2xl font-semibold text-white">
        Available Questionaires
      </div>
      <div className="pt-16 flex justify-center w-full h-screen/2">
        <div className="w-full md:w-4/5 grid grid-cols-3 gap-8">
          {questionnaires?.map(({ _id, title }) => (
            <Link
              className="col-span-3 md:col-span-1 mb-4 md:mb-0"
              to={`/questionaires/${_id}`}
            >
              <div className="h-auto md:h-20 min-h-full rounded-full bg-green-900 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 border border-green-900">
                <CardContent className="h-full flex flex-col justify-center items-center text-center">
                  <span className="text-xl text-white font-semibold">
                    {title}
                  </span>
                </CardContent>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
