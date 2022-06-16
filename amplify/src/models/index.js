// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const RentalTypeEnum = {
  "LONG_TERM": "LONG_TERM",
  "SHORT_TERM": "SHORT_TERM"
};

const PropertyTypeEnum = {
  "BUILDING": "BUILDING",
  "APARTMENT": "APARTMENT",
  "RETAIL": "RETAIL"
};

const AssetTypeEnum = {
  "RESIDENTIAL": "RESIDENTIAL"
};

const { GalleryImageModel, HighlightModel, GMapsConfigModel, EstateModel, CoordinateJSON, AddressJSON } = initSchema(schema);

export {
  GalleryImageModel,
  HighlightModel,
  GMapsConfigModel,
  EstateModel,
  RentalTypeEnum,
  PropertyTypeEnum,
  AssetTypeEnum,
  CoordinateJSON,
  AddressJSON
};