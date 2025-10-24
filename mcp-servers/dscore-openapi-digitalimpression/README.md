# DS Core Open API Digital Impression MCP Server

This MCP server provides comprehensive AI LLM integration with DS Core's Open API platform for digital impression management capabilities. It enables Large Language Models to seamlessly interact with dental scan data through DS Core's robust digital dentistry ecosystem, bringing the full power of AI-driven dental impression analysis and retrieval to your applications.

**Powered by [DS Core Open API Platform](https://open.dscore.com/)** - Complete AI-Ready Dental Scan Data Access

## AI-Powered Digital Dentistry Tools

### list-digital-impressions
**AI-Enhanced Digital Impression Discovery** - Leverage DS Core's comprehensive dental scan repository through natural language queries. This tool enables LLMs to perform sophisticated digital impression searches with advanced filtering, pagination, and metadata extraction through DS Core's Open API platform.

**DS Core Integration Features:**
- Real-time access to complete dental impression repositories
- Advanced filtering by patient ID and creation time
- Efficient pagination for large impression collections
- Rich metadata extraction and analysis
- Full compliance with digital dentistry standards

**Parameters:**
- `pageSize` (number, optional): The maximum number of digital impressions to return (max 100, default 20)
- `pageToken` (string, optional): The next_page_token value returned from a previous List request
- `filter` (string, optional): A filter expression to restrict the digital impressions returned. Only supports `patient.id` and `create_time` filters.

**Example filter:** `patient.id="1234" and create_time > "2021-01-01T00:00:00Z" and create_time < "2021-01-31T23:59:59Z"`

### get-digital-impression
**Comprehensive Digital Impression Retrieval** - Access complete dental scan data with full metadata through DS Core's unified digital dentistry platform. This tool provides LLMs with detailed impression information including scan data, patient associations, and comprehensive metadata for advanced dental analysis.

**DS Core Dental Data Access:**
- Complete digital impression metadata and scan data access
- Patient-impression relationship mapping
- Rich dental scan metadata (creation time, file sizes)
- Secure, compliant digital impression retrieval
- Full integration with digital dentistry workflows
- Advanced 3D scan data management

**Parameters:**
- `digitalImpressionId` (string, required): The ID of the digital impression to retrieve from DS Core's dental scan database

## DS Core Open API Configuration

Connect to DS Core's Open API platform with these authentication parameters:

**Required Environment Variables:**
- `GENAPI_BASE_URL`: Your DS Core Open API endpoint URL (obtain from [DS Core Developer Portal](https://open.dscore.com/))
- `GENAPI_API_KEY`: Your DS Core Open API authentication key for secure healthcare data access

**Getting Started with DS Core:**
1. Visit [https://open.dscore.com/](https://open.dscore.com/) to access the DS Core Developer Portal
2. Register your application and obtain API credentials
3. Configure your environment variables with DS Core endpoints
4. Start leveraging AI-powered digital impression access immediately

## Adding as MCP Server

To add this MCP server to your MCP client:

### Method 1: Using npx (Recommended)
```bash
# Set environment variables
export GENAPI_BASE_URL=your_genapi_base_url
export GENAPI_API_KEY=your_genapi_api_key

# Run the server directly with npx
npx dscore-openapi-digitalimpression-mcp@latest
```

### Method 2: Installing globally
```bash
# Install the server globally
npm install -g dscore-openapi-digitalimpression-mcp

# Set environment variables
export GENAPI_BASE_URL=your_genapi_base_url
export GENAPI_API_KEY=your_genapi_api_key

# Run the server
dscore-openapi-digitalimpression
```

### Method 3: Local installation
```bash
# Install the server locally
npm install dscore-openapi-digitalimpression-mcp

# Set environment variables
export GENAPI_BASE_URL=your_genapi_base_url
export GENAPI_API_KEY=your_genapi_api_key

# Run the server
npx dscore-openapi-digitalimpression-mcp
```

### Method 4: JSON Configuration (For MCP Clients that support JSON config)
```json
{
  "dscore-openapi-digitalimpression": {
    "command": "npx",
    "args": [
      "-y",
      "dscore-openapi-digitalimpression-mcp@latest"
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
  "dscore-openapi-digitalimpression": {
    "command": "node",
    "args": [
      "/path/to/dscore-openapi-digitalimpression/dist/index.js"
    ],
    "env": {
      "GENAPI_BASE_URL": "your_genapi_base_url_here",
      "GENAPI_API_KEY": "your_genapi_api_key_here"
    }
  }
}
```

## AI-Enhanced Digital Dentistry

This MCP server bridges the gap between advanced AI capabilities and comprehensive digital dentistry management through DS Core's Open API platform. By integrating digital impression functionalities directly into your LLM workflows, you enable:

**Key AI Digital Dentistry Capabilities:**
- **Natural Language Impression Queries**: Ask questions about dental scans in plain English
- **Intelligent Scan Analysis**: Leverage AI to analyze digital impression metadata and quality
- **Real-time Dental Insights**: Access up-to-date dental scan repositories for informed decision-making
- **Compliant Scan Handling**: Ensure dental scan data privacy and security standards
- **Scalable AI Integration**: Build AI-powered digital dentistry applications with enterprise-grade reliability

**Use Cases for AI Integration:**
- Virtual dental assistants with scan context
- Automated digital impression analysis and quality assessment
- AI-powered dental treatment planning with scan references
- Healthcare workflow automation with digital impression processing
- Dental scan information extraction and insights

To use this MCP server, configure it in your MCP client with your DS Core Open API credentials to unlock the full potential of AI-driven digital dentistry access.

## Advanced Filtering Examples

### Filter by Patient ID:
```json
{
  "filter": "patient.id=\"patient-123\""
}
```

### Filter by Creation Time:
```json
{
  "filter": "create_time > \"2023-01-01T00:00:00Z\" and create_time < \"2023-12-31T23:59:59Z\""
}
```

### Combined Filter:
```json
{
  "filter": "patient.id=\"patient-123\" and create_time > \"2023-01-01T00:00:00Z\""
}
```

## Intelligent Pagination

The list-digital-impressions tool supports AI-optimized pagination through the pageSize and pageToken parameters:

1. **Initial Discovery**: Omit the pageToken parameter to get the first page of results
2. **Progressive Loading**: Use the nextPageToken value from the previous response as the pageToken parameter
3. **Complete Analysis**: When there are no more pages, the nextPageToken in the response will be null or undefined

**AI-Powered Pagination Workflow:**
```json
// First call - Initial impression discovery
{
  "pageSize": 10
}

// Response includes nextPageToken: "eyJ..."

// Second call - Progressive impression loading
{
  "pageSize": 10,
  "pageToken": "eyJ..."
}
```

## Digital Impression Quality Analysis

AI can leverage the metadata and scan data to perform quality assessments:

**Quality Indicators Available:**
- Timestamp analysis for workflow optimization
- File size metrics for scan quality assessment
- Patient association verification
- Creation time tracking for treatment timeline analysis

**AI Applications:**
- Scan quality assessment and recommendations
- Treatment timeline optimization
- Patient care coordination through impression data
- Digital workflow automation

## About DS Core Open API Platform

The **[DS Core Open API Platform](https://open.dscore.com/)** provides a comprehensive, secure, and scalable infrastructure for digital dentistry in the AI era. This MCP server represents the complete integration of DS Core's digital impression management capabilities with modern Large Language Models, enabling:

**Platform Benefits:**
- **Complete Digital Dentistry Ecosystem**: Access to comprehensive dental impression repositories, scan data, and metadata
- **AI-Ready Architecture**: Designed from the ground up to support LLM integration and advanced AI workflows
- **Enterprise-Grade Security**: Full compliance with healthcare data protection standards and dental imaging regulations
- **Real-Time Scan Synchronization**: Up-to-the-minute accuracy for critical dental impression information
- **Developer-Friendly Integration**: Simple, well-documented APIs that work seamlessly with AI systems

**Why DS Core for AI Digital Dentistry Integration:**
- Proven reliability in production digital dentistry environments
- Comprehensive digital impression models that support complex AI use cases
- Scalable infrastructure that grows with your AI dental applications
- Strong commitment to dental scan data privacy and security
- Continuous innovation in healthcare-AI digital dentistry integration capabilities

This MCP server is your gateway to unleashing the full potential of AI in digital dentistry through DS Core's robust Open API platform.