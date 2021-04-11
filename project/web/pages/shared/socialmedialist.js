import React from "react";
import { getContact } from "../../api/api";

export default function SocialMediaIcons() {
  const [data, setData] = React.useState({});
  React.useEffect(() => {
    getContact().then((res) => setData(res));
  }, []);

  return (
    <>
      <li>
        <a target="_blank" href={data.facebook}>
          <i className="fa fa-facebook" aria-hidden="true"></i>
        </a>
      </li>
      <li>
        <a target="_blank" href={data.twitter}>
          <i className="fa fa-twitter" aria-hidden="true"></i>
        </a>
      </li>
      <li>
        <a target="_blank" href={data.linkedin}>
          <i className="fa fa-linkedin" aria-hidden="true"></i>
        </a>
      </li>
      <li>
        <a target="_blank" href={data.instagram}>
          <i className="fa fa-instagram" aria-hidden="true"></i>
        </a>
      </li>
      <li>
        <a target="_blank" href={data.youtube}>
          <i className="fa fa-youtube-play" aria-hidden="true"></i>
        </a>
      </li>
    </>
  );
}
