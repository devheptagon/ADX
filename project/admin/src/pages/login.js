import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserAction, setSellersAction } from "redux/app/appActions";
import { loginEP } from "integration/endpoints/auth";
import { getSellersEP } from "integration/endpoints/user";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const login = async () => {
    const user = await loginEP("test@test.com", "test");
    dispatch(setUserAction(user));
    setTimeout(() => {
      getSellersEP().then((d) => dispatch(setSellersAction(d)));
      history.push("/home");
    }, 1000);
  };

  return <button onClick={login}>login</button>;
}
