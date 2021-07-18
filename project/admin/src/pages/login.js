// import Layout from "./layout";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTokenAction } from "redux/app/appActions";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const login = () => {
    dispatch(setTokenAction("abcdef"));
    history.push("/home");
  };

  return <button onClick={login}>login</button>;
}
