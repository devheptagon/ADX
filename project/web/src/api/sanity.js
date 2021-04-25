import client from "@sanity/client";

const options = {
  dataset: "production",
  projectId: "sye0t997",
  useCdn: false,
  apiVersion: "2021-03-25",
  //TODO: Bu silinecek, post requestler kendi apimiz tarafindan yapilacak, get ler by default allowed, tokene gerek yok
  token:
    "skFADvrUBhaI4jRe3Isjf7m8Jw3TzumeWebBhwxhCdbJokT3p2oJBtzQl7X0XufetBvD139LmhclZrDZtqfDujSJOA6wPZ1RJ28GWGPJ7CmpBPUn2SA3El58nvezk0ZOZ1oUh2bc49fyB0xiYtUddeUE7Z4guNNGfulh9tqSEEWrejbVIFMS",
};

export default client(options);
