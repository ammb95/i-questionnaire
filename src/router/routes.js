import Questions from "../pages/Questions";
import Questionaire from "../pages/Questions/Questionnaire";

const ROUTES = [
  {
    path: "/",
    Page: Questions,
    props: {
      default: true,
    },
  },
  {
    path: "/questionnaires/:id",
    Page: Questionaire,
    props: {},
  },
];

export default ROUTES;
