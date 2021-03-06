// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const RentalTypeEnum = {
  "LONG_TERM": "LONG_TERM",
  "STUDENTS_FLATSHARE": "STUDENTS_FLATSHARE"
};

const PropertyTypeEnum = {
  "BUILDING": "BUILDING",
  "APARTMENT": "APARTMENT",
  "RETAIL": "RETAIL"
};

const AssetTypeEnum = {
  "RESIDENTIAL": "RESIDENTIAL"
};

const { WaitListItemModel, GalleryImageModel, GMapsConfigModel, EstateModel, CoordinateJSON, AddressJSON } = initSchema(schema);

export {
  WaitListItemModel,
  GalleryImageModel,
  GMapsConfigModel,
  EstateModel,
  RentalTypeEnum,
  PropertyTypeEnum,
  AssetTypeEnum,
  CoordinateJSON,
  AddressJSON
};