import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {PersistGate} from "redux-persist/integration/react";
import {addInterceptors} from "./axiosApi";
import {persistor, store} from "./app/store";
import {Provider} from "react-redux";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "./constants";
import {BrowserRouter} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme";

addInterceptors(store);

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline/>
              <App/>
            </ThemeProvider>
          </BrowserRouter>
        </PersistGate>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")!).render(app);
