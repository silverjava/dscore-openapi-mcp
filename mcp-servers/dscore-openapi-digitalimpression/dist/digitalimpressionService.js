"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listDigitalImpressionsRemote = listDigitalImpressionsRemote;
exports.getDigitalImpressionRemote = getDigitalImpressionRemote;
// Simple logging function
function log(...args) {
    console.log('[MCP-LOG]', ...args);
}
/**
 * List digital impressions using the GenAPI DSService_ListDigitalImpressions endpoint
 *
 * @param params - The search parameters
 * @param params.pageSize - The maximum number of digital impressions to return (max 100, default 20)
 * @param params.pageToken - The next_page_token value returned from a previous List request
 * @param params.filter - A filter expression to restrict the digital impressions returned
 *                    Supports patient.id and create_time filters
 *                    Example: patient.id="1234" and create_time > "2021-01-01T00:00:00Z" and create_time < "2021-01-31T23:59:59Z"
 */
async function listDigitalImpressionsRemote(params) {
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
        if (params.filter)
            searchParams.append('filter', params.filter);
        const url = `${baseUrl}/v1beta/digitalImpressions?${searchParams.toString()}`;
        log(`Listing digital impressions remotely: ${url}`);
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
        log(`Received ${data.digitalImpressions?.length || 0} digital impressions from GenAPI`);
        // Transform the response to our internal format
        const digitalImpressions = (data.digitalImpressions || []).map(impression => ({
            id: impression.name?.split('/').pop() || '',
            name: impression.name,
            contentUri: impression.contentUri,
            createTime: impression.createTime,
            device: impression.device,
            deviceVersion: impression.deviceVersion,
            software: impression.software,
            softwareVersion: impression.softwareVersion,
            thumbnailContentUri: impression.thumbnailContentUri,
            patient: {
                id: impression.patient?.id,
                familyName: impression.patient?.familyName,
                givenName: impression.patient?.givenName,
                birthday: impression.patient?.birthday,
                uri: impression.patient?.uri
            },
            supportedFileTypes: impression.supportedFileTypes,
            models: impression.models
        }));
        return {
            digitalImpressions,
            nextPageToken: data.nextPageToken,
            totalSize: data.totalSize
        };
    }
    catch (error) {
        log('Error listing digital impressions remotely:', error);
        throw error;
    }
}
/**
 * Get a digital impression by ID using the GenAPI DSService_GetDigitalImpression endpoint
 *
 * @param digitalImpressionId - The ID of the digital impression to retrieve
 */
async function getDigitalImpressionRemote(digitalImpressionId) {
    // Get baseUrl and apiKey from environment variables
    const baseUrl = process.env.GENAPI_BASE_URL;
    const apiKey = process.env.GENAPI_API_KEY;
    if (!baseUrl || !apiKey) {
        throw new Error('GENAPI_BASE_URL and GENAPI_API_KEY environment variables must be set');
    }
    try {
        // Construct the URL for getting a specific digital impression
        const url = `${baseUrl}/v1beta/digitalImpressions/${digitalImpressionId}`;
        log(`Getting digital impression remotely: ${url}`);
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
        log(`Received digital impression ${data.name} from GenAPI`);
        // Transform the response to our internal format
        return {
            id: data.name?.split('/').pop() || '',
            name: data.name,
            contentUri: data.contentUri,
            createTime: data.createTime,
            device: data.device,
            deviceVersion: data.deviceVersion,
            software: data.software,
            softwareVersion: data.softwareVersion,
            thumbnailContentUri: data.thumbnailContentUri,
            patient: {
                id: data.patient?.id,
                familyName: data.patient?.familyName,
                givenName: data.patient?.givenName,
                birthday: data.patient?.birthday,
                uri: data.patient?.uri
            },
            supportedFileTypes: data.supportedFileTypes,
            models: data.models
        };
    }
    catch (error) {
        log('Error getting digital impression remotely:', error);
        throw error;
    }
}
