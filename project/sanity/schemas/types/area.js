import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "area",
  title: "Areas",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      return {
        title: selection.title,
        media: <FontAwesomeIcon icon={faLocationArrow} />,
      };
    },
  },
};
