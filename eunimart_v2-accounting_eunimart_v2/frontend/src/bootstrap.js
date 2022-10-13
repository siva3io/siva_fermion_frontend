import React from "react";
import ReactDOM from "react-dom";
import Url_routes from "./url_routes";
import { createBrowserHistory } from "history";

const mount = (el) => {
  const history = createBrowserHistory();

  ReactDOM.render(<Url_routes history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#app");
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
