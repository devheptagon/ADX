export default {
  name: "advert",
  title: "Adverts",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
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
      title: "Location",
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
      type: "string",
    },
    {
      name: "advertStatus",
      title: "Status",
      type: "string",
    },
    {
      name: "agentId",
      title: "AgentId",
      type: "string",
    },
    {
      name: "reviewCount",
      title: "Review Count",
      type: "number",
      readOnly: "true",
    },
    {
      name: "images",
      title: "Images",
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

  initialValue: () => ({
    reviewCount: 0,
  }),

  preview: {
    select: {
      title: "title",
      reviews: "reviewCount",
      custom: "something",
    },
  },
};
