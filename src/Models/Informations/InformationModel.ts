export interface Information {
  _id: string;
  rawText: string;
  type: InformationType;
  validated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InformationCreate {
  rawText: string;
  type: InformationType;
  validated: boolean;
}

export enum InformationType {
  ADVICE = "advice",
  COMMENT = "comment"
}