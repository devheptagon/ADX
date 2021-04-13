import React from "react";
import S from "@sanity/desk-tool/structure-builder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTools,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";

export const getSettingsMenu = () => {
  return [
    S.listItem()
      .title("Settings")
      .icon(() => <FontAwesomeIcon icon={faTools} />),
    S.documentTypeListItems()
      .filter((item) => item.getSchemaType().name === "sector")[0]
      .icon(() => <FontAwesomeIcon icon={faArrowAltCircleRight} />),
    S.documentTypeListItems()
      .filter((item) => item.getSchemaType().name === "area")[0]
      .icon(() => <FontAwesomeIcon icon={faArrowAltCircleRight} />),
    S.documentTypeListItems()
      .filter((item) => item.getSchemaType().name === "tag")[0]
      .icon(() => <FontAwesomeIcon icon={faArrowAltCircleRight} />),
    S.listItem()
      .title("Website Contact")
      .icon(() => <FontAwesomeIcon icon={faArrowAltCircleRight} />)
      .child(
        S.document().schemaType("admincontact").documentId("admincontact1")
      ),
    S.listItem()
      .title("Website About")
      .icon(() => <FontAwesomeIcon icon={faArrowAltCircleRight} />)
      .child(S.document().schemaType("adminabout").documentId("adminabout1")),
    S.listItem()
      .title("Website Terms")
      .icon(() => <FontAwesomeIcon icon={faArrowAltCircleRight} />)
      .child(S.document().schemaType("adminterms").documentId("adminterms")),
  ];
};

/* 
S.documentTypeListItems()
      .filter((item) => item.getSchemaType().name === "admincontact")[0]
      .icon(() => <FontAwesomeIcon icon={faArrowAltCircleRight} />),
    S.documentTypeListItems()
      .filter((item) => item.getSchemaType().name === "adminabout")[0]
      .icon(() => <FontAwesomeIcon icon={faArrowAltCircleRight} />), */
