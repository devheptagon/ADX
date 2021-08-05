/* eslint-disable no-restricted-globals */
import { useDispatch } from "react-redux";
import { logoutAction } from "redux/app/appActions";
import { useHistory } from "react-router-dom";
import { clearLocalToken } from "utils/appHelper";
import { useEffect } from "react";

export default function Logout() {
  const history = useHistory();
  const dispatch = useDispatch();
  clearLocalToken();
  useEffect(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  parent.postMessage({ action: "logout" }, "*");

  history.push("/login");
  return null;
}
