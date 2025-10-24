// mcp-servers/genapi-dcmstudy/src/types.ts
export interface DicomStudy {
  id: string;
  name: string;
  displayName: string;
  startTime: string;
  seriesCount: number;
  instanceCount: number;
  fileSizeBytes: string;
  contentUri: string;
  thumbnailContentUri: string;
  patient: {
    id: string;
    displayName: string;
    familyName?: string;
    givenName?: string;
    birthday?: string;
    uri: string;
  };
  instancesMetadata?: Array<{
    instanceUid: string;
    seriesUid: string;
    metadata?: Array<any>;
    sha256Checksum?: string;
  }>;
}

export interface SearchDicomStudiesParams {
  pageSize?: number;
  pageToken?: string;
  filter?: string;
  metadataMask?: string;
}

export interface SearchDicomStudiesResponse {
  dicomStudies: DicomStudy[];
  nextPageToken?: string;
  totalSize: number;
}

export interface GetDicomStudyResponse {
  id: string;
  name: string;
  displayName: string;
  startTime: string;
  seriesCount: number;
  instanceCount: number;
  fileSizeBytes: string;
  contentUri: string;
  thumbnailContentUri: string;
  patient: {
    id: string;
    displayName: string;
    familyName?: string;
    givenName?: string;
    birthday?: string;
    uri: string;
  };
  instancesMetadata?: Array<{
    instanceUid: string;
    seriesUid: string;
    metadata?: Array<any>;
    sha256Checksum?: string;
  }>;
}