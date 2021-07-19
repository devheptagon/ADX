import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserAction } from "redux/app/appActions";
import { loginEP } from "integration/endpoints/auth";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const login = async () => {
    const user = await loginEP("test@test.com", "test");
    dispatch(setUserAction(user));
    setTimeout(() => {
      history.push("/home");
    }, 1000);
  };

  return <button onClick={login}>login</button>;
}
