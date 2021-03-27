import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "message",
  title: "Messages",
  type: "document",
  fields: [
    {
      title: "Message",
      name: "text",
      type: "string",
    },
    {
      title: "from",
      name: "from",
      type: "string",
      hidden: true,
    },
    {
      name: "to",
      title: "to",
      type: "string",
      hidden: true,
    },
    {
      name: "direction",
      title: "direction",
      type: "string",
      hidden: true,
      options: {
        list: [
          { title: "Guest to Seller", value: "guest2seller" },
          { title: "Seller to Guest", value: "seller2guest" },
        ],
      },
    },
  ],

  preview: {
    select: {
      text: "text",
      time: "_updatedAt",
    },
    prepare(selection) {
      return {
        title: selection.text,
        subtitle: selection.time,
        media: <FontAwesomeIcon icon={faComment} />,
      };
    },
  },
};
