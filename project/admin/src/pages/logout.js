import { useDispatch } from "react-redux";
import { setTokenAction } from "redux/app/appActions";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const history = useHistory();
  const dispatch = useDispatch();
  dispatch(setTokenAction(null));
  history.push("/home");
  return "Logging out...";
}
