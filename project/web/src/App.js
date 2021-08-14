import React from "react";
import "styles/globals.css";
import "styles/font-awesome-4.7.0/css/font-awesome.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { initStore } from "redux/store";
import About from "pages/about";
import Home from "pages/home";
import Business from "pages/business";
import Contact from "pages/contact";
import Privacy from "pages/privacy";
import Detail from "pages/detail";
import AdminFrame from "pages/admin-home";
import UpgradeSuccess from "pages/upgrade-success";
import UpgradeCancel from "pages/upgrade-cancel";

function App() {
  const [store, setStore] = React.useState(null);
  React.useEffect(() => {
    initStore().then((s) => {
      setStore(s);
    });
  }, []);

  return store ? (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/business">
            <Business />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/privacy">
            <Privacy />
          </Route>
          <Route path="/detail">
            <Detail />
          </Route>
          <Route path="/manage">
            <AdminFrame />
          </Route>
          <Route path="/success">
            <UpgradeSuccess />
          </Route>
          <Route path="/cancel">
            <UpgradeCancel />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Provider>
  ) : null;
}

export default App;
