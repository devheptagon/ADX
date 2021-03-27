import React from "react";

export default {
  name: "advert",
  title: "Adverts",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(200),
    },
    {
      name: "tenure",
      title: "Tenure",
      type: "string",
    },
    {
      name: "freeHoldPrice",
      title: "FreeHoldPrice",
      type: "number",
    },
    {
      name: "leaseHoldPrice",
      title: "LeaseHoldPrice",
      type: "number",
    },
    {
      name: "annualNetProfit",
      title: "AnnualNetProfit",
      type: "number",
    },
    {
      name: "annualTurnover",
      title: "AnnualTurnover",
      type: "number",
    },
    {
      name: "annualRent",
      title: "AnnualRent",
      type: "number",
    },
    {
      name: "location",
      title: "Address",
      type: "location",
    },
    {
      name: "sectors",
      title: "Sectors",
      type: "array",
      of: [
        {
          type: "reference",
          title: "Sectors",
          to: {
            type: "sector",
          },
        },
      ],
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          type: "reference",
          title: "Tags",
          to: {
            type: "tag",
          },
        },
      ],
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
      validation: (Rule) => Rule.required().min(10),
    },
    {
      name: "advertStatus",
      title: "Status",
      type: "string",
    },
    {
      name: "seller",
      title: "Seller",
      type: "reference",
      to: {
        type: "seller",
      },
    },
    {
      name: "images",
      title: "Photos",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
      tenure: "tenure",
      image: "images.0.asset.url",
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.tenure,
        media: <img src={selection.image} alt="photo" />,
      };
    },
  },
  //initialValue: () => ({}),
};
