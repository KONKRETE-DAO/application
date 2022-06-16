import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum RentalTypeEnum {
  LONG_TERM = "LONG_TERM",
  SHORT_TERM = "SHORT_TERM"
}

export enum PropertyTypeEnum {
  BUILDING = "BUILDING",
  APARTMENT = "APARTMENT",
  RETAIL = "RETAIL"
}

export enum AssetTypeEnum {
  RESIDENTIAL = "RESIDENTIAL"
}

export declare class CoordinateJSON {
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  constructor(init: ModelInit<CoordinateJSON>);
}

export declare class AddressJSON {
  readonly streetNumber?: string | null;
  readonly streetName?: string | null;
  readonly neighborhoodName?: string | null;
  readonly cityName?: string | null;
  readonly state?: string | null;
  readonly zip?: string | null;
  readonly countyName?: string | null;
  constructor(init: ModelInit<AddressJSON>);
}

type GalleryImageModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type HighlightModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type GMapsConfigModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EstateModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class GalleryImageModel {
  readonly id: string;
  readonly url?: string | null;
  readonly estatemodelID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<GalleryImageModel, GalleryImageModelMetaData>);
  static copyOf(source: GalleryImageModel, mutator: (draft: MutableModel<GalleryImageModel, GalleryImageModelMetaData>) => MutableModel<GalleryImageModel, GalleryImageModelMetaData> | void): GalleryImageModel;
}

export declare class HighlightModel {
  readonly id: string;
  readonly value?: string | null;
  readonly estatemodelID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<HighlightModel, HighlightModelMetaData>);
  static copyOf(source: HighlightModel, mutator: (draft: MutableModel<HighlightModel, HighlightModelMetaData>) => MutableModel<HighlightModel, HighlightModelMetaData> | void): HighlightModel;
}

export declare class GMapsConfigModel {
  readonly id: string;
  readonly center?: CoordinateJSON | null;
  readonly marker?: CoordinateJSON | null;
  readonly zoom?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<GMapsConfigModel, GMapsConfigModelMetaData>);
  static copyOf(source: GMapsConfigModel, mutator: (draft: MutableModel<GMapsConfigModel, GMapsConfigModelMetaData>) => MutableModel<GMapsConfigModel, GMapsConfigModelMetaData> | void): GMapsConfigModel;
}

export declare class EstateModel {
  readonly id: string;
  readonly slug?: string | null;
  readonly name?: string | null;
  readonly apr?: number | null;
  readonly isWaitlist?: boolean | null;
  readonly address?: AddressJSON | null;
  readonly description?: string | null;
  readonly expectedIncome?: number | null;
  readonly rentStartDate?: string | null;
  readonly rentPerToken?: number | null;
  readonly tokenPrice?: number | null;
  readonly assetType?: AssetTypeEnum | keyof typeof AssetTypeEnum | null;
  readonly propertyType?: PropertyTypeEnum | keyof typeof PropertyTypeEnum | null;
  readonly neighborhood?: string | null;
  readonly bedsNumber?: RentalTypeEnum | keyof typeof RentalTypeEnum | null;
  readonly rentalStrategy?: string | null;
  readonly trustIndice?: number | null;
  readonly acquisitionPrice?: number | null;
  readonly tokensNumber?: number | null;
  readonly totalPrice?: number | null;
  readonly mortgage?: number | null;
  readonly rentalIncome?: number | null;
  readonly netRentalIncome?: number | null;
  readonly internalRateOfReturn?: number | null;
  readonly untitledfield?: string | null;
  readonly GMapsConfigModel?: GMapsConfigModel | null;
  readonly coverImageUrl?: string | null;
  readonly refurbishment?: number | null;
  readonly available?: boolean | null;
  readonly debt?: number | null;
  readonly HighlightModels?: (HighlightModel | null)[] | null;
  readonly GalleryImageModels?: (GalleryImageModel | null)[] | null;
  readonly surface?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly estateModelGMapsConfigModelId?: string | null;
  constructor(init: ModelInit<EstateModel, EstateModelMetaData>);
  static copyOf(source: EstateModel, mutator: (draft: MutableModel<EstateModel, EstateModelMetaData>) => MutableModel<EstateModel, EstateModelMetaData> | void): EstateModel;
}