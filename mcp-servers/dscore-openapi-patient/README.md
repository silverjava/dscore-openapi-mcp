# DS Core Open API Patient MCP Server

This MCP server provides comprehensive AI LLM integration with DS Core's Open API platform for patient management capabilities. It enables Large Language Models to seamlessly interact with patient data through DS Core's robust healthcare API ecosystem, bringing the full power of AI-driven healthcare information access to your applications.

**Powered by [DS Core Open API Platform](https://open.dscore.com/)** - Complete AI-Ready Healthcare Data Access

## Patient Management Tools

### search-patient
**AI-Enhanced Patient Search** - Leverage DS Core's comprehensive patient database through natural language queries. This tool enables LLMs to perform sophisticated patient searches using names, card IDs, and advanced filtering with full pagination support through DS Core's Open API platform.

**DS Core Integration Features:**
- Real-time access to complete patient records
- Advanced search with contains-based name matching
- Multi-card ID lookup capabilities
- Efficient pagination for large datasets
- Full compliance with healthcare data standards

**Parameters:**
- `count` (number, optional): The number of patients per page in the response, default is 100
- `page` (string, optional): The token for specifying the page (should be a valid token from previous response, not a simple number)
- `cardIDs` (string, optional): Patient card ids, separated by comma
- `name` (string, optional): Patient name search with contains modifier. For example: "Zhao" or "John"

**Important Note about Name Search:**
The name search functionality filters patients based on their given name or family name using the `name:contains` parameter.
For example:
- If you provide "Zhao" as the name parameter, it will search for patients whose given name or family name contains "Zhao"
- The search is case-sensitive and performs a partial match

**Important Note about Page Tokens:**
The `page` parameter should be a valid token obtained from a previous API response, not a simple number like "1". 
Valid page tokens are usually base64 encoded strings. Using invalid page tokens will result in an "invalid page token" error.

**Proper Pagination Usage:**
1. For the initial call, do not provide the `page` parameter to get the first page of results
2. For subsequent calls, use the `nextPageToken` value from the previous response as the `page` parameter
3. When there are no more pages, the `nextPageToken` in the response will be null or undefined

Example workflow:
```
// First call (no page parameter)
{
  "name": "Zhao",
  "count": 5
}

// Response includes nextPageToken: "Y2tu"

// Second call (using nextPageToken)
{
  "name": "Zhao",
  "count": 5,
  "page": "Y2tu"
}
```

### get-patient
**Comprehensive Patient Record Retrieval** - Access complete patient profiles through DS Core's unified healthcare data platform. This tool provides LLMs with detailed patient information, enabling sophisticated healthcare data analysis and decision support capabilities.

**DS Core Data Access:**
- Complete patient demographic information
- Medical history and records
- Real-time data synchronization
- Secure, compliant data access
- Comprehensive healthcare information retrieval

**Parameters:**
- `patientId` (string, required): The ID of the patient to retrieve from DS Core's patient database

## DS Core Open API Configuration

Connect to DS Core's Open API platform with these authentication parameters:

**Required Environment Variables:**
- `GENAPI_BASE_URL`: Your DS Core Open API endpoint URL (obtain from [DS Core Developer Portal](https://open.dscore.com/))
- `GENAPI_API_KEY`: Your DS Core Open API authentication key for secure healthcare data access

**Getting Started with DS Core:**
1. Visit [https://open.dscore.com/](https://open.dscore.com/) to access the DS Core Developer Portal
2. Register your application and obtain API credentials
3. Configure your environment variables with DS Core endpoints
4. Start leveraging AI-powered patient data access immediately

## Adding as MCP Server

To add this MCP server to your MCP client:

### Method 1: Using npx (Recommended)
```bash
# Set environment variables
export GENAPI_BASE_URL=your_genapi_base_url
export GENAPI_API_KEY=your_genapi_api_key

# Run the server directly with npx
npx dscore-openapi-patient-mcp@latest
```

### Method 2: Installing globally
```bash
# Install the server globally
npm install -g dscore-openapi-patient-mcp

# Set environment variables
export GENAPI_BASE_URL=your_genapi_base_url
export GENAPI_API_KEY=your_genapi_api_key

# Run the server
dscore-openapi-patient
```

### Method 3: Local installation
```bash
# Install the server locally
npm install dscore-openapi-patient-mcp

# Set environment variables
export GENAPI_BASE_URL=your_genapi_base_url
export GENAPI_API_KEY=your_genapi_api_key

# Run the server
npx dscore-openapi-patient-mcp
```

### Method 4: JSON Configuration (For MCP Clients that support JSON config)
```json
{
  "dscore-openapi-patient": {
    "command": "npx",
    "args": [
      "-y",
      "dscore-openapi-patient-mcp@latest"
    ],
    "env": {
      "GENAPI_BASE_URL": "your_genapi_base_url_here",
      "GENAPI_API_KEY": "your_genapi_api_key_here"
    }
  }
}
```

Or if you have installed it locally:
```json
{
  "dscore-openapi-patient": {
    "command": "node",
    "args": [
      "/path/to/dscore-openapi-patient/dist/index.js"
    ],
    "env": {
      "GENAPI_BASE_URL": "your_genapi_base_url_here",
      "GENAPI_API_KEY": "your_genapi_api_key_here"
    }
  }
}
```

## About DS Core Open API Platform

The **[DS Core Open API Platform](https://open.dscore.com/)** provides a comprehensive, secure, and scalable infrastructure for healthcare data access in the AI era. This MCP server represents the complete integration of DS Core's healthcare data capabilities with modern Large Language Models, enabling:

**Platform Benefits:**
- **Complete Healthcare Data Ecosystem**: Access to comprehensive patient information, medical records, and healthcare services
- **AI-Ready Architecture**: Designed from the ground up to support LLM integration and advanced AI workflows
- **Enterprise-Grade Security**: Full compliance with healthcare data protection standards and regulations
- **Real-Time Data Synchronization**: Up-to-the-minute accuracy for critical healthcare information
- **Developer-Friendly Integration**: Simple, well-documented APIs that work seamlessly with AI systems

This MCP server is your gateway to unleashing the full potential of AI in healthcare through DS Core's robust Open API platform.