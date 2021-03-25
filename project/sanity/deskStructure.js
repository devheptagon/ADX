import React from "react";
import S from "@sanity/desk-tool/structure-builder";
import { createSuperPane } from "sanity-super-pane";
import {
  getDocumentsMenu,
  getSettingsMenu,
  hideTopMenu,
} from "./helpers/appHelper";

hideTopMenu();

export default () =>
  S.list()
    .title("Menu")
    .items([
      getSettingsMenu(),
      S.divider(),
      ...getDocumentsMenu(),
      S.listItem().title("Normal List").child(createSuperPane("advert", S)),
    ]);

const JsonPreview = ({ document }) => (
  <>
    <h1>hi</h1>
  </>
);
