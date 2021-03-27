import client from "./sanity";

export const getAdverts = async () => {
  const fields = `
    _id,_createdAt,
    title,
    tags,
    'tagList': tags[]._ref
  `;
  return await client.fetch(`*[_type == 'advert']{${fields}}`);
};
