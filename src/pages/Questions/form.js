import { TextField } from "@material-ui/core";
// import * as Yup from "yup";
import api from "../../api";

const FIELDS = [
  {
    name: "author",
    Input: TextField,
    InputProps: (error) => ({
      placeholder: "Your name",
      type: "text",
      className: `w-1/2`,
      error,
      variant: "filled",
      // defaultValue: "",
    }),
    // validation: Yup.string().required("Insert a name."),
    useInputErrorConfig: true,
  },
  {
    name: "body",
    Input: TextField,
    InputProps: (error) => ({
      placeholder: "Your Answer",
      type: "textarea",
      className: `w-full`,
      multiline: true,
      rows: 3,
      rowsMax: 10,
      error,
      variant: "filled",
      // defaultValue: "",
    }),
    // validation: Yup.string().required("Insert your answer."),
    useInputErrorConfig: true,
  },
];

// const raw_schema = {};

// FIELDS.forEach((field) => {
//   raw_schema[field.name] = field.validation;
// });

// const schema = Yup.object().shape(raw_schema);

const schema = null;

const ANSWER_FORM = (id) => ({
  id: `answer-form-${id}`,
  fields: FIELDS,
  onSubmit: async (data) => {
    try {
      //
      await api.post(`question/${id}/answers`, data);
    } catch (err) {
      console.log(err);
      //
    }
  },
  schema,
});

export default ANSWER_FORM;
