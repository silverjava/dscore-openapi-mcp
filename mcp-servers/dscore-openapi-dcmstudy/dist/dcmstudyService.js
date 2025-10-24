"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listDicomStudiesRemote = listDicomStudiesRemote;
exports.getDicomStudyRemote = getDicomStudyRemote;
// Simple logging function
function log(...args) {
    console.log('[MCP-LOG]', ...args);
}
/**
 * List DICOM studies using the GenAPI DSService_ListDicomStudies endpoint
 *
 * @param params - The search parameters
 * @param params.pageSize - The maximum number of dicom studies to return (max 100, default 20)
 * @param params.pageToken - The next_page_token value returned from a previous List request
 * @param params.metadataMask - Which metadata fields to return in the response (e.g. "00080030" for Study Time)
 * @param params.filter - A filter expression to restrict the dicom studies returned
 *                    Supports patient.id and create_time filters
 *                    Example: patient.id="1234" and create_time >= "2021-01-01T00:00:00Z" and create_time < "2021-01-31T23:59:59Z"
 */
async function listDicomStudiesRemote(params) {
    // Get baseUrl and apiKey from environment variables
    const baseUrl = process.env.GENAPI_BASE_URL;
    const apiKey = process.env.GENAPI_API_KEY;
    if (!baseUrl || !apiKey) {
        throw new Error('GENAPI_BASE_URL and GENAPI_API_KEY environment variables must be set');
    }
    try {
        // Construct the search URL with all supported parameters
        const searchParams = new URLSearchParams();
        if (params.pageSize)
            searchParams.append('pageSize', params.pageSize.toString());
        if (params.pageToken)
            searchParams.append('pageToken', params.pageToken);
        if (params.metadataMask)
            searchParams.append('metadataMask', params.metadataMask);
        if (params.filter)
            searchParams.append('filter', params.filter);
        const url = `${baseUrl}/v1beta/dicomStudies?${searchParams.toString()}`;
        log(`Listing DICOM studies remotely: ${url}`);
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
        const data = await response.json();
        log(`Received ${data.dicomStudies?.length || 0} DICOM studies from GenAPI`);
        // Transform the response to our internal format
        const dicomStudies = (data.dicomStudies || []).map(study => ({
            id: study.name?.split('/').pop() || '',
            name: study.name,
            displayName: study.displayName,
            startTime: study.startTime,
            seriesCount: study.seriesCount,
            instanceCount: study.instanceCount,
            fileSizeBytes: study.fileSizeBytes,
            contentUri: study.contentUri,
            thumbnailContentUri: study.thumbnailContentUri,
            patient: {
                id: study.patient?.id,
                displayName: study.patient?.displayName,
                familyName: study.patient?.familyName,
                givenName: study.patient?.givenName,
                birthday: study.patient?.birthday,
                uri: study.patient?.uri
            },
            instancesMetadata: study.instancesMetadata
        }));
        return {
            dicomStudies,
            nextPageToken: data.nextPageToken,
            totalSize: data.totalSize
        };
    }
    catch (error) {
        log('Error listing DICOM studies remotely:', error);
        throw error;
    }
}
/**
 * Get a DICOM study by ID using the GenAPI GetDicomStudy endpoint
 */
async function getDicomStudyRemote(studyId) {
    // Get baseUrl and apiKey from environment variables
    const baseUrl = process.env.GENAPI_BASE_URL;
    const apiKey = process.env.GENAPI_API_KEY;
    if (!baseUrl || !apiKey) {
        throw new Error('GENAPI_BASE_URL and GENAPI_API_KEY environment variables must be set');
    }
    try {
        // Construct the URL for getting a specific DICOM study
        const url = `${baseUrl}/v1beta/dicomStudies/${studyId}`;
        log(`Getting DICOM study remotely: ${url}`);
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
        const data = await response.json();
        log(`Received DICOM study ${data.name} from GenAPI`);
        // Transform the response to our internal format
        return {
            id: data.name?.split('/').pop() || '',
            name: data.name,
            displayName: data.displayName,
            startTime: data.startTime,
            seriesCount: data.seriesCount,
            instanceCount: data.instanceCount,
            fileSizeBytes: data.fileSizeBytes,
            contentUri: data.contentUri,
            thumbnailContentUri: data.thumbnailContentUri,
            patient: {
                id: data.patient?.id,
                displayName: data.patient?.displayName,
                familyName: data.patient?.familyName,
                givenName: data.patient?.givenName,
                birthday: data.patient?.birthday,
                uri: data.patient?.uri
            },
            instancesMetadata: data.instancesMetadata
        };
    }
    catch (error) {
        log('Error getting DICOM study remotely:', error);
        throw error;
    }
}
