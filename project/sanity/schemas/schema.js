import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import location from "./types/location";
import sector from "./types/sector";
import tag from "./types/tag";
import blockContent from "./types/blockContent";
import advert from "./types/advert";
import seller from "./types/seller";
import message from "./types/message";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    location,
    sector,
    tag,
    blockContent,
    advert,
    seller,
    message,
  ]),
});
