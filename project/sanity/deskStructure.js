import React from "react";
import S from "@sanity/desk-tool/structure-builder";
import { createSuperPane } from "sanity-super-pane";
//S.listItem().title("Normal List").child(createSuperPane("advert", S)),
import {
  getDocumentsMenu,
  getSettingsMenu,
  hideTopMenu,
} from "./helpers/appHelper";

/* export const getDefaultDocumentNode = (props) => {
  if (props.schemaType === "advert") {
    return S.document().views([S.view.component(JsonPreview).title("JSON")]);
  }
  return S.document();
};
 */

//hideTopMenu();

export default () =>
  S.list()
    .title("Menu")
    .items([getSettingsMenu(), S.divider(), ...getDocumentsMenu()]);
/* 
const JsonPreview = ({ document }) => (
  <>
    <h1>JSON Data for "{document.displayed.title}"</h1>
    <pre>{JSON.stringify(document.displayed, null, 2)}</pre>
  </>
);
 */
