import client from "@sanity/client";

const options = {
  dataset: "production",
  projectId: "sye0t997",
  useCdn: process.env.NODE_ENV === "production",
  apiVersion: "2021-03-25",
};

export default client(options);
