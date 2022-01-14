import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DetailsPage from "./components/DetailsPage/DetailsPage";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainSearchResultPage from "./components/MainSearchResultPage/MainSearchResultPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import MainPage from "./components/MainPage/MainPage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path={["/", "/current"]} render={() => <MainPage />} />
        <Route
          exact
          path="/current/:city"
          render={() => <MainSearchResultPage />}
        />
        <Route
          exact
          path="/long-forecast/:city"
          render={() => <DetailsPage />}
        />
        <Route exact path="/error" render={() => <ErrorPage />} />

        <Redirect to="/error" />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
