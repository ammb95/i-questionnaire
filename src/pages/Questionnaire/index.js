import React, { useEffect, useMemo, useState } from "react";
import { navigate, useParams } from "@reach/router";
import useData from "../../hooks/useData";
import { TextField } from "@material-ui/core";
import AnswerModal from "./AnswerModal";
import Question from "./Question";

export default function Questionaire() {
  const { id } = useParams();
  const [filter, setFilter] = useState("");

  const [likedAnswers, setLikedAnswers] = useState([]);

  const [selectedQuestionToAnswer, setSelectedQuestionToAnswer] =
    useState(null);

  const {
    data: questionnaire,
    setData: setQuestionnaire,
    loadData,
  } = useData("questionnaire", `questionnaire/${id}`);

  const filteredQuestions = useMemo(
    () =>
      questionnaire?.questions.filter(
        (q) =>
          q?.body.toLowerCase().includes(filter.toLowerCase()) ||
          q?.number === Number(filter)
      ),
    [questionnaire, filter]
  );

  useEffect(() => {
    if (id) {
    } else {
      navigate("/", { replace: true });
    }
  }, [id]);

  return (
    <>
      <h1 className="text-lg md:text-2xl font-bold text-white mb-8">
        {questionnaire?.title}
      </h1>
      <TextField
        placeholder="Enter any word or number"
        color="success.main"
        defaultValue=""
        variant="filled"
        className="w-full md:w-1/2"
        onChange={({ target: { value } }) => setFilter(value)}
      />
      <div className="mt-8">
        {filteredQuestions?.length ? (
          <>
            {filteredQuestions?.map((question) => (
              <Question
                key={question?._id}
                question={question}
                state={{
                  questionnaire,
                  setQuestionnaire,
                  likedAnswers,
                  setLikedAnswers,
                  setSelectedQuestionToAnswer,
                }}
              />
            ))}
          </>
        ) : (
          <div className="bg-green-900 p-8 text-gray-100 font-semibold text-xl p-4">
            There are no questions matching the provided filter.
          </div>
        )}
      </div>
      <AnswerModal
        state={{
          selectedQuestionToAnswer,
          setSelectedQuestionToAnswer,
          loadData,
        }}
      />
    </>
  );
}
