// examples/genapi-patient/src/index.ts
import { MCPServer } from './mcpServer';
import { searchPatientsRemote, getPatientRemote } from './genapiService';

// Simple logging function
function log(...args: any[]): void {
  console.log('[MCP-LOG]', ...args);
}

export async function main(): Promise<void> {
  const server = new MCPServer();
  
  // Register the remote search patient tool with the MCP server
  server.registerTool(
    'search-patient',
    'Search for patients in the DS Core Open API system. Supports filtering by name (with contains modifier), card IDs, and pagination. ' +
    'Important: For the `page` parameter, do not pass a simple number like "1" on initial calls. ' +
    'The page value should be a token obtained from the `nextPageToken` field in the response of a previous call. ' +
    'On the first call, omit the `page` parameter entirely to get the first page of results. ' +
    'For the `name` parameter, provide a string to search for patients whose given name or family name contains this string. ' +
    'Example: To find patients with "Zhao" in their name, pass "Zhao" as the name parameter. ' +
    'The search is case-sensitive and performs a partial match.',
    {
      count: 'number',
      page: 'string',
      cardIDs: 'string',
      name: 'string'
    },
    async (args: any) => {
      const { count, page, cardIDs, name } = args;
      log(`Searching patients remotely with tool: ${JSON.stringify({ count, page, cardIDs, name })}`);
      
      try {
        // Use the GenAPI search functionality with all supported parameters
        const params: any = {};
        if (count !== undefined) params.count = count;
        if (page) params.page = page;
        if (cardIDs) params.cardIDs = cardIDs;
        if (name) params.name = name;
        
        const result = await searchPatientsRemote(params);
        
        return result;
      } catch (error) {
        throw new Error(`Failed to search patients remotely: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  );
  
  // Register the remote get patient tool with the MCP server
  server.registerTool(
    'get-patient',
    'Get a patient by ID from the DS Core Open API system',
    {
      patientId: 'string'
    },
    async (args: any) => {
      const { patientId } = args;
      log(`Getting patient remotely with tool: ${patientId}`);
      
      try {
        // Use the GenAPI get patient functionality
        const patient = await getPatientRemote(patientId);
        
        return {
          patient: patient
        };
      } catch (error) {
        throw new Error(`Failed to get patient remotely: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  );
  
  await server.start();
  log('DS Core Open API Patient MCP Server started with stdio transport');
  
  // Keep the process running to listen for MCP requests
  // This is necessary for stdio transport to work properly
  process.stdin.resume();
}

if (require.main === module) {
  main().catch(error => {
    log('Error starting DS Core Open API Patient MCP Server:', error);
    process.exit(1);
  });
}