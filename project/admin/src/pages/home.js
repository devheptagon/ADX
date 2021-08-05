/* eslint-disable no-restricted-globals */
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  setSectorsAction,
  setFirstLoadAction,
  setTagsAction,
  logoutAction,
  setUserAction,
} from "redux/app/appActions";
import {
  checkLocalToken,
  validateToken,
  clearLocalToken,
  postParentMessage,
} from "utils/appHelper";

import { getSectorsEP } from "integration/endpoints/sector";
import { getTagsEP } from "integration/endpoints/tag";

function Home(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const reduxToken = useSelector((state) => state.appReducer.token);
  const firstLoad = useSelector((state) => state.appReducer.firstLoad);

  useEffect(() => {
    if (firstLoad) {
      dispatch(setFirstLoadAction(false));
      getSectorsEP().then((d) => dispatch(setSectorsAction(d)));
      getTagsEP().then((d) => dispatch(setTagsAction(d)));
    }
  }, [dispatch, firstLoad]);

  if (!reduxToken) {
    const localToken = checkLocalToken();
    if (localToken) {
      validateToken(localToken).then((user) => {
        if (user) {
          dispatch(setUserAction(user));
          postParentMessage(user);
          if (history.location.pathname !== "/adverts")
            history.push("/adverts");
        } else {
          postParentMessage(null);
          clearLocalToken();
          history.push("/login");
        }
      });
    } else {
      history.push("/login");
    }
  } else {
    validateToken(reduxToken).then((user) => {
      if (!user) {
        dispatch(logoutAction());
        clearLocalToken();
        postParentMessage(null);
        history.push("/login");
      } else {
        //if redux token is already set, user is set
        postParentMessage(user);
        if (history.location.pathname !== "/adverts") history.push("/adverts");
      }
    });
  }

  return null;
}

export default Home;
