import React from "react";
import { IconButton } from "@material-ui/core";
import { format, parseISO } from "date-fns";
import api from "../../api";

export default function Answer({
  answer,
  state: { questionnaire, setQuestionnaire, likedAnswers, setLikedAnswers },
}) {
  const handleLike = async (answer) => {
    answer = { ...answer, likes: answer.likes + 1 };
    setLikedAnswers([...likedAnswers, answer]);

    setQuestionnaire({
      ...questionnaire,
      questions: questionnaire.questions.map((q) => {
        if (q._id === answer.question) {
          return {
            ...q,
            answers: q.answers.map((a) => {
              if (a._id === answer._id) {
                return answer;
              }
              return a;
            }),
          };
        }
        return q;
      }),
    });

    try {
      await api.patch(`answers/${answer._id}/like`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-4 my-4 p-4 rounded bg-green-600 text-white">
      <div className="font-medium mb-4">
        <div className="w-full flex flex-row justify-between">
          <div>{answer.author}</div>
          <div>
            {answer.created_at && (
              <>
                {format(
                  parseISO(answer?.created_at || new Date()),
                  "MMM dd, yyyy"
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="text-sm whitespace-pre-line break-words">
        {answer.body}
      </div>
      <div className="w-full mt-4 flex justify-end items-center">
        <div className="mr-2">{answer.likes}</div>
        <IconButton
          onClick={() => handleLike(answer)}
          className="outline-none"
          disabled={likedAnswers.some((la) => la?._id === answer?._id)}
        >
          <i
            className={`las la-heart ${
              likedAnswers.some((la) => la?._id === answer?._id)
                ? "text-red-600"
                : ""
            }`}
          />
        </IconButton>
      </div>
    </div>
  );
}
