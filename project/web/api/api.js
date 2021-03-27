import client from "./sanity";

export const getAdverts = async () => {
  const fields = `
    _id,_createdAt,
    title,
    freeHoldPrice,
    'tags': tags[]->{title}, 
    'sectors': sectors[]->{title}, 
    'cover': images[0].asset->url,
    'images': images[].asset->url
  `;
  return await client.fetch(`*[_type == 'advert']{${fields}}`);
};
