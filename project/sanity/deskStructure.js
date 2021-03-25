import React from "react";
import S from "@sanity/desk-tool/structure-builder";
import {
  getDocumentsMenu,
  getSettingsMenu,
  hideTopMenu,
} from "./helpers/appHelper";

hideTopMenu();

export default () =>
  S.list()
    .title("Menu")
    .items([getSettingsMenu(), ...getDocumentsMenu()]);
