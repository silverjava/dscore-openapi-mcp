// mcp-servers/genapi-digitalimpression/src/types.ts
export interface DigitalImpression {
  id: string;
  name: string;
  contentUri: string;
  createTime: string;
  device?: string;
  deviceVersion?: string;
  software?: string;
  softwareVersion?: string;
  thumbnailContentUri?: string;
  patient: {
    id: string;
    familyName: string;
    givenName?: string;
    birthday?: string;
    uri: string;
  };
  supportedFileTypes: string[];
  models?: Array<{
    displayName?: string;
    textureFileNames?: string[];
    type?: string;
  }>;
}

export interface ListDigitalImpressionsParams {
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}

export interface ListDigitalImpressionsResponse {
  digitalImpressions: DigitalImpression[];
  nextPageToken?: string;
  totalSize: number;
}