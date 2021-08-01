import { useDispatch } from "react-redux";
import { logoutAction } from "redux/app/appActions";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const history = useHistory();
  const dispatch = useDispatch();
  dispatch(logoutAction());

  history.push("/home");
  return "Logging out...";
}
