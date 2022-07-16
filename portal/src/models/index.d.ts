import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type CodeModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VisitorModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class CodeModel {
  readonly id: string;
  readonly valu?: string | null;
  readonly usageCount?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<CodeModel, CodeModelMetaData>);
  static copyOf(source: CodeModel, mutator: (draft: MutableModel<CodeModel, CodeModelMetaData>) => MutableModel<CodeModel, CodeModelMetaData> | void): CodeModel;
}

export declare class VisitorModel {
  readonly id: string;
  readonly email?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<VisitorModel, VisitorModelMetaData>);
  static copyOf(source: VisitorModel, mutator: (draft: MutableModel<VisitorModel, VisitorModelMetaData>) => MutableModel<VisitorModel, VisitorModelMetaData> | void): VisitorModel;
}