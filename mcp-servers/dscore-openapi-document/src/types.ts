// examples/genapi-document/src/types.ts
export interface Document {
  id: string;
  name: string;
  type: string; // 'pdf', 'doc', 'txt', etc.
  size: number; // in bytes
  uploadDate: string;
  content: string;
  metadata?: {
    [key: string]: any;
  };
  tags?: string[];
  createdBy: string;
}

export interface UploadDocumentRequest {
  name: string;
  type: string;
  content: string;
  metadata?: {
    [key: string]: any;
  };
  tags?: string[];
  createdBy: string;
}

export interface ListDocumentsParams {
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}