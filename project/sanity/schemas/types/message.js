import React from "react";

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
    },
    prepare(selection) {
      return {
        title: selection.text,
        //subtitle: selection.email + "/" + selection.phone,
      };
    },
  },
  initialValue: () => ({
    //reviewCount: 0,
  }),
};
