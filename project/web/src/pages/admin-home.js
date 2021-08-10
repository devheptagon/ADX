import { useHistory } from "react-router-dom";
import IFrame from "./shared/iframe";

export default function Index() {
  const history = useHistory();
  return <IFrame target={`home${history.location.search}`} />;
}
