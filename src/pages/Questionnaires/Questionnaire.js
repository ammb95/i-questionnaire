import React from "react";
import { CardContent } from "@material-ui/core";
import { Link } from "@reach/router";

export default function Questionnaire({ questionnaire }) {
  return (
    <Link
      className="col-span-3 md:col-span-1 mb-4 md:mb-0"
      to={`/questionnaires/${questionnaire?._id}`}
    >
      <div className="h-auto md:h-20 min-h-full rounded-full bg-green-900 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 border border-green-900">
        <CardContent className="h-full flex flex-col justify-center items-center text-center">
          <span className="text-xl text-white font-semibold">
            {questionnaire?.title}
          </span>
        </CardContent>
      </div>
    </Link>
  );
}
