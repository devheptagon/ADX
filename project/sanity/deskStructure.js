import React from "react";
import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("Base")
    .items([
      S.listItem()
        .title("Settings")
        .child(
          S.list()
            .title("Settings")
            .items([
              ...S.documentTypeListItems().filter((item) =>
                ["tag", "sector"].includes(item.getSchemaType().name)
              ),
            ])
        ),
      ...S.documentTypeListItems().filter(
        (item) => !["tag", "sector"].includes(item.getSchemaType().name)
      ),
    ]);

const timer = setInterval(() => {
  const element = document.querySelector("div[class*='Navbar_root']");
  if (element) {
    element.style.display = "none";
    clearInterval(timer);
  }
}, 5000);
