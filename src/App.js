import { Container } from "reactstrap";
import Header from "./components/Header";
import Router from "./router";
import LoadingWrapper from "./contexts/LoadingContext/LoadingWrapper";

// import "./styles/index.scss";
import "./styles/index.css";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="page-content">
        <Container>
          <LoadingWrapper>
            <Router />
          </LoadingWrapper>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default App;
