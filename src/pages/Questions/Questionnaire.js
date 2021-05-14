import React, { useEffect, useState } from "react";
import { navigate, useParams } from "@reach/router";
import useData from "../../hooks/useData";
import { IconButton, Modal, TextField } from "@material-ui/core";
import CollapsibleRow from "../../components/CollapsibleRow";
import { format, parseISO } from "date-fns";
import AnswerForm from "./AnswerForm";
import api from "../../api";

export default function Questionaire() {
  const { id } = useParams();
  const [filter, setFilter] = useState("");

  const [likedAnswers, setLikedAnswers] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [selectedQuestionToAnswer, setSelectedQuestionToAnswer] =
    useState(null);

  const {
    data: questionnaire,
    setData: setQuestionnaire,
    loadData,
  } = useData("questionnaire", `questionnaire/${id}`);

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

  useEffect(() => {
    if (id) {
    } else {
      navigate("/state-exam", { replace: true });
    }
  }, [id]);

  useEffect(() => {
    setShowModal(!!selectedQuestionToAnswer);
  }, [selectedQuestionToAnswer]);

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
        {questionnaire?.questions
          .filter(
            (q) =>
              q?.body.toLowerCase().includes(filter.toLowerCase()) ||
              q?.number === Number(filter)
          )
          .map((question) => (
            <CollapsibleRow
              className="bg-green-900 hover:bg-green-700"
              key={question ? question._id : ""}
              children={{
                Header: ({ ...props }) => (
                  <div
                    className="p-4 font-semibold text-white cursor-default"
                    {...props}
                  >
                    {`${question?.number}. ${question?.body}`}
                  </div>
                ),
                Toggler: ({ iconStyle, ...props }) => (
                  <IconButton style={{ outline: "none" }} {...props}>
                    <i
                      className="las la-caret-down text-white"
                      style={iconStyle}
                    />
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
                            <div key={answer._id}>
                              <div className="mx-4 my-4 p-4 rounded bg-green-600 text-white">
                                <div className="font-medium mb-4">
                                  <div className="w-full flex flex-row justify-between">
                                    <div>{answer.author}</div>
                                    <div>
                                      {answer.created_at && (
                                        <>
                                          {format(
                                            parseISO(
                                              answer?.created_at || new Date()
                                            ),
                                            "MMM dd, yyyy"
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-sm">{answer.body}</div>
                                <div className="w-full mt-4 flex justify-end items-center">
                                  <div className="mr-2">{answer.likes}</div>
                                  <IconButton
                                    onClick={() => handleLike(answer)}
                                    className="outline-none"
                                    disabled={likedAnswers.some(
                                      (la) => la?._id === answer?._id
                                    )}
                                  >
                                    <i
                                      className={`las la-heart ${
                                        likedAnswers.some(
                                          (la) => la?._id === answer?._id
                                        )
                                          ? "text-red-600"
                                          : ""
                                      }`}
                                    />
                                  </IconButton>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                    <button
                      className="float-right bg-gray-400 hover:bg-green-900 hover:text-gray-400 text-green-900 my-8 py-2 px-2 rounded-full outline-none"
                      onClick={() => setSelectedQuestionToAnswer(question)}
                      // {...props}
                    >
                      ANSWER
                    </button>

                    {/* <CollapsibleRow
                      children={{
                        Header: ({ ...props }) => (
                          <div
                            className="p-4 font-semibold text-white cursor-default"
                            {...props}
                          ></div>
                        ),
                        Toggler: ({ iconStyle, ...props }) => (
                          <Button
                            className="bg-green-900 hover:bg-green-700 text-white my-8 py-2 px-2 rounded-full"
                            style={{ outline: "none" }}
                            {...props}
                          >
                            ANSWER
                          </Button>
                        ),
                        Content: () => (
                          <>
                            <div className="py-4">
                              <div className="bg-green-700 rounded-br-lg">
                                <CardContent>
                                  <Form config={ANSWER_FORM(question._id)} />
                                </CardContent>
                              </div>
                            </div>
                          </>
                        ),
                      }}
                    /> */}
                  </>
                ),
              }}
            />
          ))}
      </div>
      <Modal
        open={showModal}
        onBackdropClick={() => setSelectedQuestionToAnswer(null)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="bg-green-900 w-11/12 md:w-5/12 h-auto p-8">
            <div className="grid grid-cols-12">
              <div className="col-span-11">
                <div className="text-lg font-semibold text-white mb-8 cursor-default">
                  {`${selectedQuestionToAnswer?.number}. ${selectedQuestionToAnswer?.body}`}
                </div>
              </div>
              <div className="col-span-1">
                <IconButton
                  onClick={() => {
                    setShowModal(false);
                    setSelectedQuestionToAnswer(null);
                  }}
                  className="outline-none"
                >
                  <i className="las la-times text-white" />
                </IconButton>
              </div>
            </div>
            <AnswerForm
              id={selectedQuestionToAnswer?._id}
              afterSubmit={() => {
                setShowModal(false);
                loadData({ reload: false });
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
