"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCPServer = void 0;
// mcp-servers/genapi-document/src/mcp-server.ts
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
class MCPServer {
    constructor() {
        // Create MCP server instance
        this.mcpServer = new mcp_js_1.McpServer({
            name: 'genapi-document-mcp-server',
            version: '1.0.0'
        }, {
            capabilities: {}
        });
        // Create transport for handling MCP requests over stdio
        this.transport = new stdio_js_1.StdioServerTransport();
    }
    async start() {
        try {
            // Connect transport to server (this automatically starts the transport)
            this.mcpServer.connect(this.transport);
            console.log('[MCP-LOG] MCP Server started with stdio transport');
        }
        catch (error) {
            console.log('[MCP-LOG] Error starting MCP Server:', error);
            throw error;
        }
    }
    async stop() {
        try {
            await this.transport.close();
            console.log('[MCP-LOG] MCP Server stopped');
        }
        catch (error) {
            console.log('[MCP-LOG] Error stopping MCP Server:', error);
            throw error;
        }
    }
    // Method to register tools with the MCP server
    registerTool(name, description, inputSchema, handler) {
        // Convert the input schema to Zod schema
        const zodSchema = {};
        if (inputSchema && typeof inputSchema === 'object') {
            for (const [key, value] of Object.entries(inputSchema)) {
                // Simple conversion - in practice, you might want more sophisticated mapping
                if (value === 'string') {
                    zodSchema[key] = zod_1.z.string();
                }
                else if (value === 'number') {
                    zodSchema[key] = zod_1.z.number();
                }
                else if (value === 'boolean') {
                    zodSchema[key] = zod_1.z.boolean();
                }
                else {
                    // Default to string for unknown types
                    zodSchema[key] = zod_1.z.string();
                }
            }
        }
        this.mcpServer.tool(name, description, zodSchema, async (args) => {
            const result = await handler(args);
            return {
                content: [
                    {
                        type: 'text',
                        text: typeof result === 'string' ? result : JSON.stringify(result)
                    }
                ]
            };
        });
    }
}
exports.MCPServer = MCPServer;
