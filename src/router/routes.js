import Questionnaires from "../pages/Questionnaires";
import Questionaire from "../pages/Questionnaire";

const ROUTES = [
  {
    path: "/",
    Page: Questionnaires,
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
