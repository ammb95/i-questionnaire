import React, { useState } from "react";
import { Field, Formik, Form } from "formik";
import { TextField } from "@material-ui/core";
import * as Yup from "yup";
import Loading from "../../components/Loading";
import api from "../../api";

export default function AnswerForm({ id, afterSubmit = () => {} }) {
  const initialValues = {};

  const [submitting, setSubmitting] = useState(false);

  const schema = Yup.object().shape({
    author: Yup.string().required("Insert your name."),
    body: Yup.string().required("Insert your answer."),
  });

  return (
    <>
      <div className={submitting ? "visible" : "hidden"}>
        <Loading />
      </div>
      <div className={!submitting ? "visible" : "hidden"}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (data) => {
            setSubmitting(true);

            try {
              await api.post(`question/${id}/answers`, data);
            } catch (error) {
              console.log(error);
            }

            setSubmitting(false);

            afterSubmit();
          }}
          validationSchema={schema}
        >
          {({ handleSubmit, errors, touched }) => (
            <Form
              id={id}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="mb-8">
                <Field
                  name="author"
                  id={`author-${id}`}
                  key={`author-${id}`}
                  as={TextField}
                  error={!!errors["author"]}
                  helperText={errors["author"]}
                  placeholder="Your name"
                  type="text"
                  className="w-1/2"
                  variant="filled"
                />
              </div>
              <div>
                <Field
                  name="body"
                  id={`body-${id}`}
                  key={`body-${id}`}
                  as={TextField}
                  error={!!errors["body"]}
                  helperText={errors["body"]}
                  placeholder="Your Answer"
                  type="text-area"
                  className="w-full"
                  variant="filled"
                  multiline
                  rows={3}
                  rowsMax={10}
                />
              </div>

              <button
                className="mt-8 p-2 bg-green-700 rounded-lg hover:bg-green-800 float-right outline-none text-white"
                type="submit"
              >
                SUBMIT
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
