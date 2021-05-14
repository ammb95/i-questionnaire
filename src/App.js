import { Container } from "reactstrap";
import Header from "./components/Header";
import Router from "./router";
import LoadingWrapper from "./contexts/LoadingContext/LoadingWrapper";

// import "./styles/index.scss";
import "./styles/index.css";

function App() {
  return (
    <>
      <Header />
      <div className="page-content">
        <Container className="p-8 px-8 md:py-8 md:px-24">
          <LoadingWrapper>
            <Router />
          </LoadingWrapper>
        </Container>
      </div>
    </>
  );
}

export default App;
