import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import AuthWacher from "./components/AuthWacher";
import {Provider} from "react-redux";
import store from "./stores/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <AuthWacher>
      <RouterProvider router={routes}></RouterProvider>
    </AuthWacher>
    </Provider>
  </StrictMode>
);
