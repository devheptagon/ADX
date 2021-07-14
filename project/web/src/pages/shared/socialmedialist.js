import React from "react";
import { useSelector } from "react-redux";

export default function SocialMediaIcons() {
  const contents = useSelector((state) => state.appReducer.contents);

  return (
    <>
      <li>
        <a target="_blank" href={contents.facebook}>
          <i className="fa fa-facebook" aria-hidden="true"></i>
        </a>
      </li>
      <li>
        <a target="_blank" href={contents.twitter}>
          <i className="fa fa-twitter" aria-hidden="true"></i>
        </a>
      </li>
      <li>
        <a target="_blank" href={contents.linkedin}>
          <i className="fa fa-linkedin" aria-hidden="true"></i>
        </a>
      </li>
      <li>
        <a target="_blank" href={contents.instagram}>
          <i className="fa fa-instagram" aria-hidden="true"></i>
        </a>
      </li>
      <li>
        <a target="_blank" href={contents.youtube}>
          <i className="fa fa-youtube-play" aria-hidden="true"></i>
        </a>
      </li>
    </>
  );
}
