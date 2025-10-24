// mcp-servers/genapi-digitalimpression/src/index.ts
import { MCPServer } from './mcpServer';
import { listDigitalImpressionsRemote, getDigitalImpressionRemote } from './digitalimpressionService';
import { ListDigitalImpressionsParams } from './types';

// Simple logging function
function log(...args: any[]): void {
  console.log('[MCP-LOG]', ...args);
}

export async function main(): Promise<void> {
  const server = new MCPServer();
  
  // Register the remote list digital impressions tool with the MCP server
  server.registerTool(
    'list-digital-impressions',
    'List digital impressions in the DS Core Open API system with pagination and filtering support. Note: The filter parameter only supports patient.id and create_time filters. Example filters: patient.id="1234" and create_time > "2021-01-01T00:00:00Z" and create_time < "2021-01-31T23:59:59Z"',
    {
      pageSize: 'number',
      pageToken: 'string',
      filter: 'string'
    },
    async (args: any) => {
      const params: ListDigitalImpressionsParams = {};
      if (args.pageSize) params.pageSize = args.pageSize;
      if (args.pageToken) params.pageToken = args.pageToken;
      if (args.filter) params.filter = args.filter;
      
      log(`Listing digital impressions remotely with params: ${JSON.stringify(params)}`);
      
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
        const result = await listDigitalImpressionsRemote(params);
        
        return result;
      } catch (error) {
        throw new Error(`Failed to list digital impressions remotely: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  );
  
  // Register the remote get digital impression tool with the MCP server
  server.registerTool(
    'get-digital-impression',
    'Get a digital impression by ID from the DS Core Open API system',
    {
      digitalImpressionId: 'string'
    },
    async (args: any) => {
      const { digitalImpressionId } = args;
      log(`Getting digital impression remotely with ID: ${digitalImpressionId}`);
      
      try {
        // Use the GenAPI get digital impression functionality
        const digitalImpression = await getDigitalImpressionRemote(digitalImpressionId);
        
        return digitalImpression;
      } catch (error) {
        throw new Error(`Failed to get digital impression remotely: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  );
  
  await server.start();
  log('DS Core Open API Digital Impression MCP Server started with stdio transport');
  
  // Keep the process running to listen for MCP requests
  // This is necessary for stdio transport to work properly
  process.stdin.resume();
}

if (require.main === module) {
  main().catch(error => {
    log('Error starting DS Core Open API Digital Impression MCP Server:', error);
    process.exit(1);
  });
}