import { IconButton } from "@material-ui/core";
import { Link } from "@reach/router";
import React from "react";
import CollapsibleRow from "../../components/CollapsibleRow";
import Answer from "./Answer";

export default function Question({
  question,
  state: {
    questionnaire,
    setQuestionnaire,
    likedAnswers,
    setLikedAnswers,
    setSelectedQuestionToAnswer,
  },
}) {
  return (
    <CollapsibleRow
      className="bg-green-900 hover:bg-green-700"
      children={{
        Header: ({ ...props }) => (
          <div
            className="p-4 font-semibold text-white cursor-default"
            {...props}
          >
            <Link to={`/question/${question._id}`}>
              {`${question?.number}. ${question?.body}`}
            </Link>
          </div>
        ),
        Toggler: ({ iconStyle, ...props }) => (
          <IconButton style={{ outline: "none" }} {...props}>
            <i className="las la-caret-down text-white" style={iconStyle} />
          </IconButton>
        ),
        Content: () => (
          <>
            <div className="overflow-y-scroll bg-gray-300 scrollbar max-h-80">
              {!question.answers.length ? (
                <div className="text-green-900 font-semibold text-xl p-4">
                  No answers have been provided for this question.
                </div>
              ) : (
                <>
                  {question.answers?.map((answer) => (
                    <Answer
                      key={answer._id}
                      answer={answer}
                      state={{
                        questionnaire,
                        setQuestionnaire,
                        likedAnswers,
                        setLikedAnswers,
                      }}
                    />
                  ))}
                </>
              )}
            </div>
            <button
              className="float-right bg-green-700 hover:bg-green-900 text-white my-8 py-2 px-2 rounded-full outline-none"
              onClick={() => setSelectedQuestionToAnswer(question)}
            >
              ANSWER
            </button>
          </>
        ),
      }}
    />
  );
}
