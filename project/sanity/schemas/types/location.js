import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

export default {
  title: "location",
  name: "location",
  type: "object",
  fields: [
    {
      title: "Line1",
      name: "line1",
      type: "string",
    },
    {
      title: "Line2",
      name: "line2",
      type: "string",
    },
    {
      title: "City",
      name: "city",
      type: "string",
    },
    {
      title: "County",
      name: "county",
      type: "string",
    },
    {
      title: "Region",
      name: "region",
      type: "string",
    },
    {
      title: "Postcode",
      name: "postcode",
      type: "string",
    },
  ],
  preview: {
    select: {
      line1: "line1",
      city: "city",
      postcode: "postcode",
    },
    prepare(selection) {
      return {
        title:
          selection.line1 + " , " + selection.city + " , " + selection.postcode,
        media: <FontAwesomeIcon icon={faLocationArrow} />,
      };
    },
  },
  options: {
    collapsible: true, // Makes the whole fieldset collapsible
    collapsed: false, // Defines if the fieldset should be collapsed by default or not
    columns: 2, // Defines a grid for the fields and how many columns it should have
  },
};
