import React from "react";
import S from "@sanity/desk-tool/structure-builder";

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
  return S.listItem()
    .title("Settings")
    .child(
      S.list()
        .title("Settings")
        .items([
          ...S.documentTypeListItems().filter((item) =>
            settingsMenuItems.includes(item.getSchemaType().name)
          ),
        ])
    );
};

export const getDocumentsMenu = () => {
  const filter = (item) =>
    !settingsMenuItems.includes(item.getSchemaType().name);
  return S.documentTypeListItems().filter(filter);
};

export const getDocumentMenuItem = (typeName) => {
  const filter = (item) => item.getSchemaType().name === typeName;
  return S.documentTypeListItems().filter(filter)[0];
};
