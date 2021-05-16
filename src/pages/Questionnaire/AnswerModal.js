import React, { useEffect, useState } from "react";
import { IconButton, Modal } from "@material-ui/core";
import AnswerForm from "./AnswerForm";

export default function AnswerModal({
  state: { selectedQuestionToAnswer, setSelectedQuestionToAnswer, loadData },
}) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(!!selectedQuestionToAnswer);
  }, [selectedQuestionToAnswer]);

  return (
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
  );
}
