export default {
  name: "adminabout",
  title: "Website About",
  type: "document",
  fields: [
    {
      title: "About",
      name: "about",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
        },
      ],
    },
  ],
};
