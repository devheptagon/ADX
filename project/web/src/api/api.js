import { setAdvertsAction, setLoadingAction } from "redux/app/appActions";
import client from "./sanity";

const advertFields = `
_id,_createdAt,
title,
'tags': tags[]->{title}, 
'area': area->title, 
'sectors': sectors[]->{title}, 
'cover': images[0].asset->url,
'images': images[].asset->url,
'seller': seller->fullname + '|' + seller->email + '|' + seller->phone,
location,
advertStatus,
tenures,
freeHoldPrice,
leaseHoldPrice,
annualRent,
description
`;

export const fillAdverts = async (filters, dispatch) => {
  /*
  TODO: asagidaki gibi filtrelemeli
  const sectorFilter = sectors && sectors.length ? "" : "1==1";
  const areaFilter = area && area.length ? "" : "1==1";
  let filter = `*[_type == 'advert' && ${sectorFilter} && ${areaFilter}]{${fields}}`;
  */

  dispatch(setLoadingAction(true));
  let sql = `*[_type == 'advert' && !(_id in path("drafts.**"))]{${advertFields}}| order(_createdAt desc)`;
  let results = await client.fetch(sql);
  dispatch(setLoadingAction(false));

  if (!filters) {
    dispatch(setAdvertsAction(results));
    return;
  }

  const {
    selectedSectors,
    selectedAreas,
    selectedTenures,
    selectedKeywords,
    selectedMinPrice,
    selectedMaxPrice,
  } = filters;

  if (results && selectedAreas && selectedAreas.length) {
    results = results.filter((f) =>
      selectedAreas?.map((s) => s.value).includes(f.area)
    );
  }
  if (results && selectedSectors && selectedSectors.length) {
    results = results.filter((f) =>
      f.sectors?.some((r) =>
        selectedSectors?.map((s) => s.value).includes(r.title)
      )
    );
  }
  if (results && selectedTenures && selectedTenures.length) {
    results = results.filter((f) =>
      f.tenures?.some((r) => selectedTenures?.map((s) => s.value).includes(r))
    );
  }
  if (results && selectedKeywords && selectedKeywords.length) {
    results = results.filter((f) =>
      f.tags?.some((r) =>
        selectedKeywords?.map((s) => s.value).includes(r.title)
      )
    );
  }
  if (results && +selectedMinPrice) {
    results = results.filter((r) => {
      const price = r.freeHoldPrice || r.leaseHoldPrice;
      if (!price) return r;
      return +price >= +selectedMinPrice;
    });
  }
  if (results && +selectedMaxPrice) {
    results = results.filter((r) => {
      const price = r.freeHoldPrice || r.leaseHoldPrice;
      if (!price) return r;
      return +price <= +selectedMaxPrice;
    });
  }

  //TODO: PAGING
  dispatch(setAdvertsAction(results));
};

export const getAbout = async () => {
  const response = await client.fetch(
    `*[_type == 'adminabout' && !(_id in path("drafts.**")) && _id =='adminabout1']{about}`
  );
  return response[0].about[0].children[0].text;
};

export const getContact = async () => {
  const response = await client.fetch(
    `*[_type == 'admincontact' && !(_id in path("drafts.**")) && _id =='admincontact1']`
  );
  return response[0];
};

export const getPrivacy = async () => {
  const response = await client.fetch(
    `*[_type == 'adminterms' && !(_id in path("drafts.**")) && _id =='adminterms']`
  );
  return response[0].terms;
};

export const getSectors = async () => {
  const response = await client.fetch(
    `*[_type == 'sector' && !(_id in path("drafts.**"))]{title}| order(title asc)`
  );
  return response || [];
};

export const getAreas = async () => {
  const response = await client.fetch(
    `*[_type == 'area' && !(_id in path("drafts.**"))]{title}| order(title asc)`
  );
  return response || [];
};

export const getKeywords = async () => {
  const response = await client.fetch(
    `*[_type == 'tag' && !(_id in path("drafts.**"))]{title}`
  );
  return response || [];
};

export const postEvaluationRequest = async (values) => {
  const doc = {
    _type: "evaluation",
    ...values,
  };
  if (doc.price) doc.price = doc.price.toString();
  if (doc.area_size) doc.area_size = doc.area_size.toString();
  delete doc.gdpr_agreement;
  const response = await client.create(doc);
  return response;
};

export const getAdvert = async (id) => {
  const response = await client.fetch(
    `*[_type == 'advert' && _id == '${id}']{${advertFields}}`
  );
  return response && response.length ? response[0] : {};
};

export const getTopAdverts = async () => {
  let sql = `*[_type == 'advert' && !(_id in path("drafts.**"))]{${advertFields}}| order(_createdAt desc)[0...10]`;
  return await client.fetch(sql);
};
