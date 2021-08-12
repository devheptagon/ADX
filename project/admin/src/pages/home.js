/* eslint-disable no-restricted-globals */
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  setSectorsAction,
  setFirstLoadAction,
  setTagsAction,
  logoutAction,
  setUserAction,
  setSellersAction,
  setMessagesAction,
} from "redux/app/appActions";
import {
  checkLocalToken,
  validateToken,
  clearLocalToken,
  postParentMessage,
} from "utils/appHelper";

import { getSectorsEP } from "integration/endpoints/sector";
import { getTagsEP } from "integration/endpoints/tag";
import { getSellersEP } from "integration/endpoints/user";
import { getMessagesEP } from "integration/endpoints/message";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function findTargetPage(queryHook) {
  let query = queryHook();
  const target = query.get("t");
  if (!target) return "/profile";

  const sid = query.get("sid"); //sellerid
  const aid = query.get("aid"); //advertid
  return "/newmessage?sid=" + sid + "&aid=" + aid;
}

function Home(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const reduxToken = useSelector((state) => state.appReducer.token);
  const firstLoad = useSelector((state) => state.appReducer.firstLoad);
  const sellers = useSelector((state) => state.appReducer.sellers);
  const messages = useSelector((state) => state.appReducer.messages);
  const targetPage = findTargetPage(useQuery);

  const redirectTarget = () => {
    if (!sellers?.length)
      getSellersEP().then((res) => dispatch(setSellersAction(res)));

    if (!messages?.length)
      getMessagesEP().then((res) => dispatch(setMessagesAction(res)));

    if (!history.location.pathname.includes(targetPage)) {
      history.push(targetPage);
    }
  };

  const redirectLogin = () => {
    history.push("/login" + history.location.search);
  };

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
          redirectTarget();
        } else {
          postParentMessage(null);
          clearLocalToken();
          redirectLogin();
        }
      });
    } else {
      redirectLogin();
    }
  } else {
    validateToken(reduxToken).then((user) => {
      if (!user) {
        dispatch(logoutAction());
        clearLocalToken();
        postParentMessage(null);
        redirectLogin();
      } else {
        //if redux token is already set, user is set
        postParentMessage(user);
        redirectTarget();
      }
    });
  }

  return null;
}

export default Home;
