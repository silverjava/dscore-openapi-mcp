"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
// mcp-servers/genapi-dcmstudy/src/index.ts
const mcpServer_1 = require("./mcpServer");
const dcmstudyService_1 = require("./dcmstudyService");
// Simple logging function
function log(...args) {
    console.log('[MCP-LOG]', ...args);
}
async function main() {
    const server = new mcpServer_1.MCPServer();
    // Register the remote list DICOM studies tool with the MCP server
    server.registerTool('list-dicom-studies', 'List DICOM studies in the DS Core Open API system with pagination and filtering support. Note: The filter parameter only supports patient.id and create_time filters. Example filters: patient.id="1234" and create_time >= "2021-01-01T00:00:00Z" and create_time < "2021-01-31T23:59:59Z"', {
        pageSize: 'number',
        pageToken: 'string',
        metadataMask: 'string',
        filter: 'string'
    }, async (args) => {
        const params = {};
        if (args.pageSize)
            params.pageSize = args.pageSize;
        if (args.pageToken)
            params.pageToken = args.pageToken;
        if (args.metadataMask)
            params.metadataMask = args.metadataMask;
        if (args.filter)
            params.filter = args.filter;
        log(`Listing DICOM studies remotely with params: ${JSON.stringify(params)}`);
        try {
            // Validate filter parameter - only patient.id and create_time are supported
            if (params.filter) {
                const validFilters = ['patient.id', 'create_time'];
                const filterKey = params.filter.split('=')[0].trim();
                const isValidFilter = validFilters.some(validFilter => filterKey.startsWith(validFilter));
                if (!isValidFilter) {
                    throw new Error(`Invalid filter parameter. Only ${validFilters.join(' and ')} filters are supported.`);
                }
            }
            // Use the GenAPI list functionality
            const result = await (0, dcmstudyService_1.listDicomStudiesRemote)(params);
            return result;
        }
        catch (error) {
            throw new Error(`Failed to list DICOM studies remotely: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    });
    // Register the remote get DICOM study tool with the MCP server
    server.registerTool('get-dicom-study', 'Get a DICOM study by ID from the DS Core Open API system', {
        studyId: 'string'
    }, async (args) => {
        const { studyId } = args;
        log(`Getting DICOM study remotely with ID: ${studyId}`);
        try {
            // Use the GenAPI get DICOM study functionality
            const study = await (0, dcmstudyService_1.getDicomStudyRemote)(studyId);
            return study;
        }
        catch (error) {
            throw new Error(`Failed to get DICOM study remotely: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    });
    await server.start();
    log('DS Core Open API DICOM Study MCP Server started with stdio transport');
    // Keep the process running to listen for MCP requests
    // This is necessary for stdio transport to work properly
    process.stdin.resume();
}
if (require.main === module) {
    main().catch(error => {
        log('Error starting DS Core Open API DICOM Study MCP Server:', error);
        process.exit(1);
    });
}
