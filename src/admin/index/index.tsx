import React, { FC, Suspense } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "../loading";
import ExcalidrawApp from "../../excalidraw-app";
import TopShow from "../top";
import "../../excalidraw-app/pwa";
import "../../excalidraw-app/sentry";
import Login from "../login/login";
import Home from "../home/home";
window.__EXCALIDRAW_SHA__ = process.env.REACT_APP_GIT_SHA;

const Index: FC = () => (
  <div id="root">
    <Suspense fallback={<Loading />}>
      <TopShow />
      <Router>
        <Switch>
          <Route exact path="/" render={() => <ExcalidrawApp />} />
          <Route exact path="/show" render={() => <ExcalidrawApp />} />
          <Route exact path="/home" render={() => <Home />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/register" render={() => <ExcalidrawApp />} />
        </Switch>
      </Router>
    </Suspense>
  </div>
);

export default Index;
