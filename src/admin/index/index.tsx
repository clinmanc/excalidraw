import React, { FC, Suspense } from "react";
import Loading from "../loading";
import "../../excalidraw-app/pwa";
import "../../excalidraw-app/sentry";

// routes
import Router from "./router";
// theme
import ThemeConfig from "../theme";
import GlobalStyles from "../theme/globalStyles";
// components
import ScrollToTop from "../components/ScrollToTop";
import { BaseOptionChartStyle } from "../components/charts/BaseOptionChart";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import "simplebar/src/simplebar.css";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";

window.__EXCALIDRAW_SHA__ = process.env.REACT_APP_GIT_SHA;

const Index: FC = () => (
  <div id="root">
    <Suspense fallback={<Loading />}>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeConfig>
            <ScrollToTop />
            <GlobalStyles />
            <BaseOptionChartStyle />
            <Router />
          </ThemeConfig>
        </BrowserRouter>
      </HelmetProvider>
    </Suspense>
  </div>
);

export default Index;

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
