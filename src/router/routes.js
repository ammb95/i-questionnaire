import Questionnaires from "../pages/Questionnaires";
import Questionaire from "../pages/Questionnaire";
import Question from "../pages/Question";

const ROUTES = [
  {
    path: "/",
    Page: Questionnaires,
    props: {
      default: true,
    },
  },
  {
    path: "/questionnaire/:id",
    Page: Questionaire,
    props: {},
  },
  {
    path: "/question/:id",
    Page: Question,
    props: {},
  },
];

export default ROUTES;
