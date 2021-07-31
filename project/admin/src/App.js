import React from "react";
import "styles/font-awesome-4.7.0/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "redux/store";

import Home from "pages/home";
import Login from "pages/login";
import Logout from "pages/logout";
import TagPage from "pages/tag/tag-page";
import SectorPage from "pages/sector/sector-page";
import AdvertPage from "pages/advert/advert-page";
import ContentsPage from "pages/contents/contents-page";
import SellerPage from "pages/seller/seller-page";
import ProfilePage from "pages/profile/profile-page";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/sectors">
            <SectorPage />
          </Route>
          <Route path="/tags">
            <TagPage />
          </Route>
          <Route path="/adverts">
            <AdvertPage />
          </Route>
          <Route path="/contents">
            <ContentsPage />
          </Route>
          <Route path="/sellers">
            <SellerPage />
          </Route>
          {/*           <Route path="/profile">
            <ProfilePage />
          </Route> */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
