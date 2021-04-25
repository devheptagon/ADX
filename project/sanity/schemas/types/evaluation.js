import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "evaluation",
  title: "Evaluation Requests",
  type: "document",
  __experimental_actions: ["delete"],
  fields: [
    {
      name: "enquiry_type",
      title: "Enquiry Type",
      type: "string",
    },
    {
      name: "user_type",
      title: "User Type",
      type: "string",
    },
    {
      name: "first_name",
      title: "First name",
      type: "string",
    },
    {
      name: "last_name",
      title: "Last name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "property_type",
      title: "Property type",
      type: "string",
    },
    {
      name: "price",
      title: "Price",
      type: "string",
    },
    {
      name: "area_size",
      title: "Area size",
      type: "string",
    },
  ],
  preview: {
    select: {
      first_name: "first_name",
      last_name: "last_name",
      email: "email",
    },
    prepare(selection) {
      return {
        title: selection.first_name + " " + selection.last_name,
        subtitle: selection.email,
        media: <FontAwesomeIcon icon={faLocationArrow} />,
      };
    },
  },
};
