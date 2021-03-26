import React from "react";
import S, { listItem } from "@sanity/desk-tool/structure-builder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTools,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";

const settingsMenuItems = ["tag", "sector"];

/* export const hideTopMenu = () => {
  const timer = setInterval(() => {
    const element = document.querySelector("div[class*='Navbar_root']");
    if (element) {
      element.style.display = "none";
      clearInterval(timer);
    }
  }, 5000);
}; */

export const getSettingsMenu = () => {
  return [
    S.listItem()
      .title("Settings")
      .icon(() => <FontAwesomeIcon icon={faTools} />),

    S.documentTypeListItems()
      .filter((item) => item.getSchemaType().name === "sector")[0]
      .icon(() => <FontAwesomeIcon icon={faArrowAltCircleRight} size="xs" />),
    S.documentTypeListItems()
      .filter((item) => item.getSchemaType().name === "tag")[0]
      .icon(() => <FontAwesomeIcon icon={faArrowAltCircleRight} size="xs" />),
  ];
};

/* export const getDocumentsMenu = () => {
  const filter = (item) =>
    !settingsMenuItems.includes(item.getSchemaType().name);
  return S.documentTypeListItems().filter(filter);
};

export const getDocumentMenuItem = (typeName) => {
  const filter = (item) => item.getSchemaType().name === typeName;
  return S.documentTypeListItems().filter(filter)[0];
}; */
