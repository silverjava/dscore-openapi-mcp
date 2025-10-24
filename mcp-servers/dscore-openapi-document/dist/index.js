"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// mcp-servers/genapi-document/src/index.ts
const mcpServer_1 = require("./mcpServer");
const documentService_1 = require("./documentService");
// Simple logging function
function log(...args) {
    console.log('[MCP-LOG]', ...args);
}
async function main() {
    log('Initializing DS Core Open API Document MCP Server...');
    const server = new mcpServer_1.MCPServer();
    // Register tool to get a document by ID (new tool for DSService_GetDocument)
    server.registerTool('get-document', 'Get a document by ID from the DS Core Open API system', {
        documentId: 'string'
    }, async (args) => {
        const { documentId } = args;
        log(`Getting document with ID: ${documentId}`);
        const document = await documentService_1.documentService.getDocument(documentId);
        return document;
    });
    // Register tool to list documents (new tool for DSService_ListDocuments)
    server.registerTool('list-documents', 'List documents with pagination and filtering support. Note: The filter parameter only supports patient.id and create_time filters. Example filters: patient.id="1234" and create_time >= "2021-01-01T00:00:00Z" and create_time < "2021-01-31T23:59:59Z"', {
        pageSize: 'number',
        pageToken: 'string',
        filter: 'string'
    }, async (args) => {
        const params = {};
        if (args.pageSize)
            params.pageSize = args.pageSize;
        if (args.pageToken)
            params.pageToken = args.pageToken;
        if (args.filter)
            params.filter = args.filter;
        log(`Listing documents with params: ${JSON.stringify(params)}`);
        const result = await documentService_1.documentService.listDocuments(params);
        return result;
    });
    log('Starting MCP server...');
    try {
        await server.start();
        log('MCP Server started with stdio transport');
        log('DS Core Open API Document MCP Server started with stdio transport');
    }
    catch (error) {
        log('Error starting MCP server:', error);
        console.error('Full error details:', error);
        throw error;
    }
    log('Server started successfully, keeping process running...');
    // Keep the process running to listen for MCP requests
    // This is necessary for stdio transport to work properly
    process.stdin.on('data', (data) => {
        log('Received data from stdin:', data.toString());
    });
    process.stdin.on('end', () => {
        log('stdin ended');
    });
    process.stdin.on('error', (error) => {
        log('stdin error:', error);
    });
    process.on('exit', (code) => {
        log('Process exiting with code:', code);
    });
    process.on('uncaughtException', (error) => {
        log('Uncaught exception:', error);
        console.error('Uncaught exception details:', error);
        process.exit(1);
    });
    process.on('unhandledRejection', (reason, promise) => {
        log('Unhandled rejection at:', promise, 'reason:', reason);
        console.error('Unhandled rejection details:', reason);
        process.exit(1);
    });
    log('Process listeners registered, keeping process running...');
    process.stdin.resume();
}
main().catch(error => {
    log('Error starting DS Core Open API Document MCP Server:', error);
    console.error('Full error details:', error);
    process.exit(1);
});
