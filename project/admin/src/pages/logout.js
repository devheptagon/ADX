import { useDispatch } from "react-redux";
import { logoutAction } from "redux/app/appActions";
import { useHistory } from "react-router-dom";
import { clearLocalToken } from "utils/appHelper";

export default function Logout() {
  const history = useHistory();
  const dispatch = useDispatch();
  clearLocalToken();
  dispatch(logoutAction());

  history.push("/login");
  return "Logging out...";
}
