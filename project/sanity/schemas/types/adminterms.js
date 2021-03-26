export default {
  name: "adminterms",
  title: "Website Terms",
  type: "document",
  fields: [
    {
      title: "Terms and Privacy",
      name: "terms",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
  ],
};
