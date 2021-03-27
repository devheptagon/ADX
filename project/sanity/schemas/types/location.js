export default {
  title: "location",
  name: "location",
  type: "object",
  fields: [
    {
      title: "Postcode",
      name: "postcode",
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
  ],
  options: {
    collapsible: true, // Makes the whole fieldset collapsible
    collapsed: false, // Defines if the fieldset should be collapsed by default or not
    columns: 2, // Defines a grid for the fields and how many columns it should have
  },
};
