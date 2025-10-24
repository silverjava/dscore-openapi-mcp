// mcp-servers/genapi-document/src/mcp-server.ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

export class MCPServer {
  private mcpServer: McpServer;
  private transport: StdioServerTransport;

  constructor() {
    // Create MCP server instance
    this.mcpServer = new McpServer(
      {
        name: 'genapi-document-mcp-server',
        version: '1.0.0'
      },
      {
        capabilities: {}
      }
    );
    
    // Create transport for handling MCP requests over stdio
    this.transport = new StdioServerTransport();
  }
  
  public async start(): Promise<void> {
    try {
      // Connect transport to server (this automatically starts the transport)
      this.mcpServer.connect(this.transport);
      console.log('[MCP-LOG] MCP Server started with stdio transport');
    } catch (error) {
      console.log('[MCP-LOG] Error starting MCP Server:', error);
      throw error;
    }
  }
  
  public async stop(): Promise<void> {
    try {
      await this.transport.close();
      console.log('[MCP-LOG] MCP Server stopped');
    } catch (error) {
      console.log('[MCP-LOG] Error stopping MCP Server:', error);
      throw error;
    }
  }
  
  // Method to register tools with the MCP server
  public registerTool(
    name: string,
    description: string,
    inputSchema: any,
    handler: Function
  ): void {
    // Convert the input schema to Zod schema
    const zodSchema: { [key: string]: any } = {};
    if (inputSchema && typeof inputSchema === 'object') {
      for (const [key, value] of Object.entries(inputSchema)) {
        // Simple conversion - in practice, you might want more sophisticated mapping
        if (value === 'string') {
          zodSchema[key] = z.string();
        } else if (value === 'number') {
          zodSchema[key] = z.number();
        } else if (value === 'boolean') {
          zodSchema[key] = z.boolean();
        } else {
          // Default to string for unknown types
          zodSchema[key] = z.string();
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