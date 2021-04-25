import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import location from "./types/location";
import sector from "./types/sector";
import area from "./types/area";
import tag from "./types/tag";
import blockContent from "./types/blockContent";
import advert from "./types/advert";
import seller from "./types/seller";
import message from "./types/message";
import guest from "./types/guest";
import admincontact from "./types/admincontact";
import adminabout from "./types/adminabout";
import adminterms from "./types/adminterms";
import evaluation from "./types/evaluation";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    location,
    sector,
    area,
    tag,
    blockContent,
    advert,
    seller,
    message,
    guest,
    admincontact,
    adminabout,
    adminterms,
    evaluation,
  ]),
});
