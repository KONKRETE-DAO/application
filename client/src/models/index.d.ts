import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum RentalTypeEnum {
  LONG_TERM = "LONG_TERM",
  STUDENTS_FLATSHARE = "STUDENTS_FLATSHARE"
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

type WaitListItemModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type GalleryImageModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type GMapsConfigModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EstateModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class WaitListItemModel {
  readonly id: string;
  readonly emailAddress: string;
  readonly publicKey: string;
  readonly estatemodelID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<WaitListItemModel, WaitListItemModelMetaData>);
  static copyOf(source: WaitListItemModel, mutator: (draft: MutableModel<WaitListItemModel, WaitListItemModelMetaData>) => MutableModel<WaitListItemModel, WaitListItemModelMetaData> | void): WaitListItemModel;
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
  readonly isWaitlist?: boolean | null;
  readonly address?: AddressJSON | null;
  readonly description?: string | null;
  readonly surface?: number | null;
  readonly map?: GMapsConfigModel | null;
  readonly coverImageUrl?: string | null;
  readonly debt?: number | null;
  readonly gallery?: (WaitListItemModel | null)[] | null;
  readonly grossYield?: number | null;
  readonly propertyType?: PropertyTypeEnum | keyof typeof PropertyTypeEnum | null;
  readonly returnOnCapitalEmployed?: number | null;
  readonly neighborhood?: string | null;
  readonly revenuePerToken?: number | null;
  readonly bedrooms?: number | null;
  readonly tokenPrice?: number | null;
  readonly rentalType?: RentalTypeEnum | keyof typeof RentalTypeEnum | null;
  readonly totalTokens?: number | null;
  readonly acquisitionStrategy?: string | null;
  readonly trustIndice?: number | null;
  readonly acquisitionPrice?: number | null;
  readonly rentalIncome?: number | null;
  readonly refurbishment?: number | null;
  readonly propertyManagement?: number | null;
  readonly fee?: number | null;
  readonly governmentTaxes?: number | null;
  readonly mortgage?: number | null;
  readonly capitalCall?: number | null;
  readonly waitListItems?: (WaitListItemModel | null)[] | null;
  readonly highlights?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly estateModelMapId?: string | null;
  constructor(init: ModelInit<EstateModel, EstateModelMetaData>);
  static copyOf(source: EstateModel, mutator: (draft: MutableModel<EstateModel, EstateModelMetaData>) => MutableModel<EstateModel, EstateModelMetaData> | void): EstateModel;
}