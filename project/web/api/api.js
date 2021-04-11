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

export const getAbout = async () => {
  const response = await client.fetch(
    `*[_type == 'adminabout' && _id =='adminabout1']{about}`
  );
  return response[0].about[0].children[0].text;
};

export const getContact = async () => {
  const response = await client.fetch(
    `*[_type == 'admincontact' && _id =='admincontact1']`
  );
  return response[0];
};

export const getPrivacy = async () => {
  const response = await client.fetch(
    `*[_type == 'adminterms' && _id =='adminterms']`
  );
  return response[0].terms;
};
