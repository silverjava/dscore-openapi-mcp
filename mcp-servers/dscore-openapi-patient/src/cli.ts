
// mcp-servers/genapi-patient/src/cli.ts
import { main } from './index';

// Execute the main function
main().catch((error: Error) => {
  console.error('Error starting DS Core Open API Patient MCP Server:', error);
  process.exit(1);
});