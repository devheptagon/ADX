import React from "react";

export default {
  name: "seller",
  title: "Sellers",
  type: "document",
  fields: [
    {
      title: "Full name",
      name: "fullname",
      type: "string",
    },
    {
      title: "Email",
      name: "email",
      type: "string",
    },
    {
      name: "Password",
      title: "password",
      type: "string",
      hidden: true,
    },
    {
      title: "Phone",
      name: "phone",
      type: "string",
    },
    {
      title: "Address",
      name: "address",
      type: "location",
    },
    {
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],

  preview: {
    select: {
      fullname: "fullname",
      email: "email",
      phone: "phone",
      avatar: "avatar.asset.url",
    },
    prepare(selection) {
      return {
        title: selection.fullname,
        //subtitle: selection.email + "/" + selection.phone,
        media: <img src={selection.avatar} alt="avatar" />,
      };
    },
  },
  //initialValue: () => ({}),
};
