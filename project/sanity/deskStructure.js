import React from "react";
import S from "@sanity/desk-tool/structure-builder";
import { createSuperPane } from "sanity-super-pane";
import { getSettingsMenu } from "./helpers/appHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAd,
  faComments,
  faUsers,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";

export default () =>
  S.list()
    .title("Menu")
    .items([
      S.divider(),
      S.listItem()
        .title("Adverts")
        .icon(() => <FontAwesomeIcon icon={faAd} />)
        .child(createSuperPane("advert", S, ["seller", "location"])),
      S.listItem()
        .title("Sellers")
        .icon(() => <FontAwesomeIcon icon={faUsers} />)
        .child(createSuperPane("seller", S, ["email", "phone"])),
      S.listItem()
        .title("Messages")
        .icon(() => <FontAwesomeIcon icon={faComments} />)
        .child(createSuperPane("message", S, [])),

      S.listItem()
        .title("Guests")
        .icon(() => <FontAwesomeIcon icon={faChalkboardTeacher} />)
        .child(createSuperPane("guest", S, ["text", "_updatedAt"])),
      S.divider(),

      ...getSettingsMenu(),
    ]);
