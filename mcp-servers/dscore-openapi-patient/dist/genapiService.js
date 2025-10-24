"use strict";
// mcp-servers/genapi-patient/src/genapiService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPatientsRemote = searchPatientsRemote;
exports.getPatientRemote = getPatientRemote;
// Simple logging function
function log(...args) {
    console.log('[MCP-LOG]', ...args);
}
/**
 * Search for patients using the GenAPI SearchPatient endpoint
 *
 * @param params - The search parameters
 * @param params.count - The number of patients per page in the response, default is 100
 * @param params.page - The token for specifying the page (should be a valid token from previous response)
 * @param params.cardIDs - Patient card ids, separated by comma
 * @param params.name - Patient name search with contains modifier, format: "name:contains=xxx"
 */
async function searchPatientsRemote(params) {
    // Get baseUrl and apiKey from environment variables
    const baseUrl = process.env.GENAPI_BASE_URL;
    const apiKey = process.env.GENAPI_API_KEY;
    if (!baseUrl || !apiKey) {
        throw new Error('GENAPI_BASE_URL and GENAPI_API_KEY environment variables must be set');
    }
    try {
        // Construct the search URL with all supported parameters
        const searchParams = new URLSearchParams();
        // Handle _count parameter
        if (params.count !== undefined) {
            searchParams.append('_count', params.count.toString());
        }
        // Handle _page parameter - only add if it's a valid token (not a simple number)
        if (params.page && params.page.trim() !== '') {
            // Validate that page token looks like a proper token (not just a number)
            // Proper tokens are usually base64 encoded strings
            if (!/^\d+$/.test(params.page)) {
                searchParams.append('_page', params.page);
            }
            else {
                console.warn(`Invalid page token ignored: ${params.page}. Page tokens should be base64 encoded strings, not simple numbers.`);
            }
        }
        // Handle cardIDs parameter - only add if not empty
        if (params.cardIDs && params.cardIDs.trim() !== '') {
            searchParams.append('cardIDs', params.cardIDs);
        }
        // Handle name parameter (with :contains modifier)
        if (params.name) {
            // If name already contains the :contains modifier, use it as is
            // Otherwise, add the :contains modifier
            if (params.name.includes(':contains=')) {
                // Split the parameter into key and value
                const [key, value] = params.name.split('=');
                searchParams.append(key, value);
            }
            else {
                searchParams.append('name:contains', params.name);
            }
        }
        const url = `${baseUrl}/v1beta/fhir/Patient?${searchParams.toString()}`;
        log(`Searching patients remotely: ${url}`);
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
        log(`Received ${data.entry?.length || 0} patients from GenAPI`);
        // Transform the response to our internal format
        const patients = (data.entry || [])
            .filter(entry => entry.resource)
            .map(entry => {
            const resource = entry.resource;
            const firstName = resource.name?.[0]?.given?.[0] || '';
            const lastName = resource.name?.[0]?.family || '';
            // Extract contact info
            const email = resource.telecom?.find((t) => t.system === 'email')?.value;
            const phone = resource.telecom?.find((t) => t.system === 'phone')?.value;
            return {
                id: resource.id,
                firstName,
                lastName,
                dateOfBirth: resource.birthDate || '',
                gender: resource.gender,
                contactInfo: {
                    email,
                    phone
                }
            };
        });
        // Extract next page token from link array
        let nextPageToken;
        if (data.link) {
            const nextLink = data.link.find(link => link.relation === 'next');
            if (nextLink?.url) {
                try {
                    const url = new URL(nextLink.url);
                    nextPageToken = url.searchParams.get('_page') || undefined;
                }
                catch (e) {
                    // If URL parsing fails, just ignore
                }
            }
        }
        return {
            patients,
            totalCount: data.total || patients.length,
            nextPageToken
        };
    }
    catch (error) {
        log('Error searching patients remotely:', error);
        throw error;
    }
}
/**
 * Get a patient by ID using the GenAPI GetPatient endpoint
 */
async function getPatientRemote(patientId) {
    // Get baseUrl and apiKey from environment variables
    const baseUrl = process.env.GENAPI_BASE_URL;
    const apiKey = process.env.GENAPI_API_KEY;
    if (!baseUrl || !apiKey) {
        throw new Error('GENAPI_BASE_URL and GENAPI_API_KEY environment variables must be set');
    }
    try {
        // Construct the URL for getting a specific patient
        const url = `${baseUrl}/v1beta/fhir/Patient/${patientId}`;
        log(`Getting patient remotely: ${url}`);
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
        const resource = await response.json();
        log(`Received patient ${resource.id} from GenAPI`);
        // Transform the response to our internal format
        const firstName = resource.name?.[0]?.given?.[0] || '';
        const lastName = resource.name?.[0]?.family || '';
        // Extract contact info
        const email = resource.telecom?.find((t) => t.system === 'email')?.value;
        const phone = resource.telecom?.find((t) => t.system === 'phone')?.value;
        return {
            id: resource.id,
            firstName,
            lastName,
            dateOfBirth: resource.birthDate || '',
            gender: resource.gender,
            contactInfo: {
                email,
                phone
            }
        };
    }
    catch (error) {
        log('Error getting patient remotely:', error);
        throw error;
    }
}
//# sourceMappingURL=genapiService.js.map