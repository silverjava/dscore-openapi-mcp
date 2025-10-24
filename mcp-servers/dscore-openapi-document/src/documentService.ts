// examples/genapi-document/src/documentService.ts
import { Document, UploadDocumentRequest } from './types';

// Simple logging function
function log(...args: any[]): void {
  console.log('[MCP-LOG]', ...args);
}

// Define interfaces for the ListDocuments API response
export interface DocumentPatient {
  id: string;
  displayName: string;
  familyName?: string;
  givenName?: string;
  birthday?: string;
  uri: string;
}

export interface DocumentInfo {
  name: string;
  displayName: string;
  fileType: string;
  contentUri: string;
  thumbnailContentUri: string;
  createTime: string;
  fileSizeBytes: string;
  mimeType: string;
  patient: DocumentPatient;
  labels?: {
    [key: string]: string;
  };
}

export interface GetDocumentResponse {
  name: string;
  displayName: string;
  fileType: string;
  contentUri: string;
  thumbnailContentUri: string;
  createTime: string;
  fileSizeBytes: string;
  mimeType: string;
  patient: DocumentPatient;
  labels?: {
    [key: string]: string;
  };
}

export interface ListDocumentsResponse {
  documents: DocumentInfo[];
  nextPageToken?: string;
  totalSize: number;
}

export interface ListDocumentsParams {
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}

export interface GenAPIListDocumentsResponse {
  documents: Array<{
    name: string;
    displayName: string;
    fileType: string;
    contentUri: string;
    thumbnailContentUri: string;
    createTime: string;
    fileSizeBytes: string;
    mimeType: string;
    patient: {
      id: string;
      displayName: string;
      familyName?: string;
      givenName?: string;
      birthday?: string;
      uri: string;
    };
    labels?: {
      [key: string]: string;
    };
  }>;
  nextPageToken?: string;
  totalSize: number;
}

export interface GenAPIGetDocumentResponse {
  name: string;
  displayName: string;
  fileType: string;
  contentUri: string;
  thumbnailContentUri: string;
  createTime: string;
  fileSizeBytes: string;
  mimeType: string;
  patient: {
    id: string;
    displayName: string;
    familyName?: string;
    givenName?: string;
    birthday?: string;
    uri: string;
  };
  labels?: {
    [key: string]: string;
  };
}

class DocumentService {
  constructor() {
    // Initialize with sample documents for demonstration
    this.initializeSampleDocuments();
  }

  private initializeSampleDocuments(): void {
    // This is just for demonstration purposes
    // In a real implementation, we would call the actual API
    log('Initialized document service with sample documents');
  }

  /**
   * Get a document by ID
   * Calls the actual GenAPI GetDocument endpoint
   */
  public async getDocument(documentId: string): Promise<GetDocumentResponse> {
    log(`Getting document with ID: ${documentId}`);
    
    // Get baseUrl and apiKey from environment variables
    const baseUrl = process.env.GENAPI_BASE_URL;
    const apiKey = process.env.GENAPI_API_KEY;
    
    if (!baseUrl || !apiKey) {
      throw new Error('GENAPI_BASE_URL and GENAPI_API_KEY environment variables must be set');
    }

    try {
      // Construct the URL for getting a specific document
      const url = `${baseUrl}/v1beta/documents/${documentId}`;
      
      log(`Calling GetDocument API: ${url}`);
      
      // Make the API request
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`GenAPI request failed with status ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json() as GenAPIGetDocumentResponse;
      log(`Received document ${data.name} from GenAPI`);
      
      // Transform the response to our internal format
      return {
        name: data.name,
        displayName: data.displayName,
        fileType: data.fileType,
        contentUri: data.contentUri,
        thumbnailContentUri: data.thumbnailContentUri,
        createTime: data.createTime,
        fileSizeBytes: data.fileSizeBytes,
        mimeType: data.mimeType,
        patient: {
          id: data.patient?.id,
          displayName: data.patient?.displayName,
          familyName: data.patient?.familyName,
          givenName: data.patient?.givenName,
          birthday: data.patient?.birthday,
          uri: data.patient?.uri
        },
        labels: data.labels
      };
    } catch (error) {
      log('Error getting document from GenAPI:', error);
      throw error;
    }
  }

  /**
   * List documents with pagination and filtering support
   * Calls the actual GenAPI ListDocuments endpoint
   * Note: The filter parameter only supports patient.id and create_time filters
   */
  public async listDocuments(params: ListDocumentsParams): Promise<ListDocumentsResponse> {
    log(`Listing documents with params: ${JSON.stringify(params)}`);
    
    // Validate filter parameter - only patient.id and create_time are supported
    if (params.filter) {
      const validFilters = ['patient.id', 'create_time'];
      const filterKey = params.filter.split('=')[0].trim();
      const isValidFilter = validFilters.some(validFilter => filterKey.startsWith(validFilter));
      
      if (!isValidFilter) {
        throw new Error(`Invalid filter parameter. Only ${validFilters.join(' and ')} filters are supported.`);
      }
    }
    
    // Get baseUrl and apiKey from environment variables
    const baseUrl = process.env.GENAPI_BASE_URL;
    const apiKey = process.env.GENAPI_API_KEY;
    
    if (!baseUrl || !apiKey) {
      throw new Error('GENAPI_BASE_URL and GENAPI_API_KEY environment variables must be set');
    }

    try {
      // Construct the URL for listing documents
      const searchParams = new URLSearchParams();
      if (params.pageSize) searchParams.append('pageSize', params.pageSize.toString());
      if (params.pageToken) searchParams.append('pageToken', params.pageToken);
      if (params.filter) searchParams.append('filter', params.filter);
      
      const url = `${baseUrl}/v1beta/documents?${searchParams.toString()}`;
      
      log(`Calling ListDocuments API: ${url}`);
      
      // Make the API request
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`GenAPI request failed with status ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json() as GenAPIListDocumentsResponse;
      log(`Received ${data.documents?.length || 0} documents from GenAPI`);
      
      // Transform the response to our internal format
      const documents: DocumentInfo[] = (data.documents || []).map((doc) => ({
        name: doc.name,
        displayName: doc.displayName,
        fileType: doc.fileType,
        contentUri: doc.contentUri,
        thumbnailContentUri: doc.thumbnailContentUri,
        createTime: doc.createTime,
        fileSizeBytes: doc.fileSizeBytes,
        mimeType: doc.mimeType,
        patient: {
          id: doc.patient?.id,
          displayName: doc.patient?.displayName,
          familyName: doc.patient?.familyName,
          givenName: doc.patient?.givenName,
          birthday: doc.patient?.birthday,
          uri: doc.patient?.uri
        },
        labels: doc.labels
      }));
      
      return {
        documents,
        nextPageToken: data.nextPageToken,
        totalSize: data.totalSize
      };
    } catch (error) {
      log('Error listing documents from GenAPI:', error);
      throw error;
    }
  }
}

export const documentService = new DocumentService();