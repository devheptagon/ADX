import client from "./sanity";

export const getAdverts = async (sectors, areas) => {
  const fields = `
    _id,_createdAt,
    title,
    freeHoldPrice,
    'tags': tags[]->{title}, 
    'area': area->title, 
    'sectors': sectors[]->{title}, 
    'cover': images[0].asset->url,
    'images': images[].asset->url
  `;
  /*
  TODO: asagidaki gibi filtrelemeli
  const sectorFilter = sectors && sectors.length ? "" : "1==1";
  const areaFilter = area && area.length ? "" : "1==1";
  let filter = `*[_type == 'advert' && ${sectorFilter} && ${areaFilter}]{${fields}}`;
  */
  let filter = `*[_type == 'advert']{${fields}}`;
  let results = await client.fetch(filter);
  if (results && areas && areas.length) {
    results = results.filter((f) => areas.includes(f.area));
  }
  if (results && sectors && sectors.length) {
    results = results.filter((f) =>
      f.sectors.some((r) => sectors.includes(r.title))
    );
  }
  return results || [];
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

export const getSectors = async () => {
  const response = await client.fetch(`*[_type == 'sector']{title}`);
  return response;
};

export const getAreas = async () => {
  const response = await client.fetch(`*[_type == 'area']{title}`);
  return response;
};

export const postEvaluationRequest = async (values) => {
  const doc = {
    _type: "evaluation",
    ...values,
  };
  delete doc.gdpr_agreement;
  const response = await client.create(doc);
  return response;
};
