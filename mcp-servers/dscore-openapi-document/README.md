# DS Core Open API Document MCP Server

This MCP server provides comprehensive AI LLM integration with DS Core's Open API platform for document management capabilities. It enables Large Language Models to seamlessly interact with healthcare documents through DS Core's robust document management ecosystem, bringing the full power of AI-driven document analysis and retrieval to your applications.

**Powered by [DS Core Open API Platform](https://open.dscore.com/)** - Complete AI-Ready Healthcare Document Access

## AI-Powered Document Management Tools

### list-documents
**AI-Enhanced Document Discovery** - Leverage DS Core's comprehensive document repository through natural language queries. This tool enables LLMs to perform sophisticated document searches with advanced filtering, pagination, and metadata extraction through DS Core's Open API platform.

**DS Core Integration Features:**
- Real-time access to complete healthcare document repositories
- Advanced filtering by patient ID and creation time
- Efficient pagination for large document collections
- Rich metadata extraction and analysis
- Full compliance with healthcare document standards

**Parameters:**
- `pageSize` (number, optional): The maximum number of documents to return per page (max 100, default 20)
- `pageToken` (string, optional): The next_page_token value returned from a previous List request
- `filter` (string, optional): A filter expression to restrict the documents returned. Only supports patient.id and create_time filters.
  - Example: `patient.id="1234"`
  - Example: `create_time >= "2021-01-01T00:00:00Z" and create_time < "2021-01-31T23:59:59Z"`
  - Example: `patient.id="1234" and create_time >= "2021-01-01T00:00:00Z" and create_time < "2021-01-31T23:59:59Z"`

**Response:**
- `documents` (array): Array of document objects
- `nextPageToken` (string, optional): Token for the next page of results
- `totalSize` (number): Total number of documents matching the query

### get-document
**Comprehensive Document Retrieval** - Access complete healthcare documents with full metadata through DS Core's unified document management platform. This tool provides LLMs with detailed document information including content access, patient associations, and comprehensive metadata for advanced document analysis.

**DS Core Data Access:**
- Complete document metadata and content access
- Patient-document relationship mapping
- Thumbnail and content URI access
- Rich document metadata (file type, size, timestamps)
- Secure, compliant document retrieval
- Full integration with healthcare document workflows

**Parameters:**
- `documentId` (string, required): The ID of the document to retrieve from DS Core's document database

**Response:**
- `name` (string): The full resource name of the document
- `displayName` (string): Display name of the document
- `fileType` (string): Type of the document file
- `contentUri` (string): URI to access the document content
- `thumbnailContentUri` (string, optional): URI to access the thumbnail content
- `createTime` (string): Creation time of the document
- `fileSizeBytes` (string): Size of the document in bytes
- `mimeType` (string): MIME type of the document
- `patient` (object): Patient information associated with the document
  - `id` (string): Patient ID
  - `displayName` (string): Patient display name
  - `familyName` (string, optional): Patient family name
  - `givenName` (string, optional): Patient given name
  - `birthday` (string, optional): Patient birthday
  - `uri` (string): URI to access patient information
- `labels` (object, optional): Document labels

## DS Core Open API Configuration

Connect to DS Core's Open API platform with these authentication parameters:

**Required Environment Variables:**
- `GENAPI_BASE_URL`: Your DS Core Open API endpoint URL (obtain from [DS Core Developer Portal](https://open.dscore.com/))
- `GENAPI_API_KEY`: Your DS Core Open API authentication key for secure healthcare data access

**Getting Started with DS Core:**
1. Visit [https://open.dscore.com/](https://open.dscore.com/) to access the DS Core Developer Portal
2. Register your application and obtain API credentials
3. Configure your environment variables with DS Core endpoints
4. Start leveraging AI-powered document access immediately

## Adding as MCP Server

To add this MCP server to your MCP client:

### Method 1: Using npx (Recommended)
```bash
# Set environment variables
export GENAPI_BASE_URL=your_genapi_base_url
export GENAPI_API_KEY=your_genapi_api_key

# Run the server directly with npx
npx dscore-openapi-document-mcp@latest
```

### Method 2: Installing globally
```bash
# Install the server globally
npm install -g dscore-openapi-document-mcp

# Set environment variables
export GENAPI_BASE_URL=your_genapi_base_url
export GENAPI_API_KEY=your_genapi_api_key

# Run the server
dscore-openapi-document
```

### Method 3: Local installation
```bash
# Install the server locally
npm install dscore-openapi-document-mcp

# Set environment variables
export GENAPI_BASE_URL=your_genapi_base_url
export GENAPI_API_KEY=your_genapi_api_key

# Run the server
npx dscore-openapi-document-mcp
```

### Method 4: JSON Configuration (For MCP Clients that support JSON config)
```json
{
  "dscore-openapi-document": {
    "command": "npx",
    "args": [
      "-y",
      "dscore-openapi-document-mcp@latest"
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
  "dscore-openapi-document": {
    "command": "node",
    "args": [
      "/path/to/dscore-openapi-document/dist/index.js"
    ],
    "env": {
      "GENAPI_BASE_URL": "your_genapi_base_url_here",
      "GENAPI_API_KEY": "your_genapi_api_key_here"
    }
  }
}
```

## AI-Enhanced Document Management

This MCP server bridges the gap between advanced AI capabilities and comprehensive healthcare document management through DS Core's Open API platform. By integrating document management functionalities directly into your LLM workflows, you enable:

**Key AI Document Capabilities:**
- **Natural Language Document Queries**: Ask questions about documents in plain English
- **Intelligent Document Analysis**: Leverage AI to analyze document content and metadata
- **Real-time Document Insights**: Access up-to-date document repositories for informed decision-making
- **Compliant Document Handling**: Ensure healthcare document privacy and security standards
- **Scalable AI Integration**: Build AI-powered document management applications with enterprise-grade reliability

**Use Cases for AI Integration:**
- Virtual health assistants with document context
- Automated document analysis and summarization
- AI-powered clinical decision support with document references
- Healthcare workflow automation with document processing
- Document information extraction and insights

To use this MCP server, configure it in your MCP client with your DS Core Open API credentials to unlock the full potential of AI-driven healthcare document access.

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
  "filter": "create_time >= \"2023-01-01T00:00:00Z\" and create_time < \"2023-12-31T23:59:59Z\""
}
```

### Combined Filter:
```json
{
  "filter": "patient.id=\"patient-123\" and create_time >= \"2023-01-01T00:00:00Z\""
}
```

## Intelligent Pagination

The list-documents tool supports AI-optimized pagination through the pageSize and pageToken parameters:

1. **Initial Discovery**: Omit the pageToken parameter to get the first page of results
2. **Progressive Loading**: Use the nextPageToken value from the previous response as the pageToken parameter
3. **Complete Analysis**: When there are no more pages, the nextPageToken in the response will be null or undefined

**AI-Powered Pagination Workflow:**
```json
// First call - Initial document discovery
{
  "pageSize": 10
}

// Response includes nextPageToken: "eyJ..."

// Second call - Progressive document loading
{
  "pageSize": 10,
  "pageToken": "eyJ..."
}
```

## About DS Core Open API Platform

The **[DS Core Open API Platform](https://open.dscore.com/)** provides a comprehensive, secure, and scalable infrastructure for healthcare document management in the AI era. This MCP server represents the complete integration of DS Core's document management capabilities with modern Large Language Models, enabling:

**Platform Benefits:**
- **Complete Healthcare Document Ecosystem**: Access to comprehensive document repositories, metadata, and content management
- **AI-Ready Architecture**: Designed from the ground up to support LLM integration and advanced AI workflows
- **Enterprise-Grade Security**: Full compliance with healthcare data protection standards and regulations
- **Real-Time Document Synchronization**: Up-to-the-minute accuracy for critical healthcare document information
- **Developer-Friendly Integration**: Simple, well-documented APIs that work seamlessly with AI systems

**Why DS Core for AI Document Integration:**
- Proven reliability in production healthcare document environments
- Comprehensive document models that support complex AI use cases
- Scalable infrastructure that grows with your AI document applications
- Strong commitment to healthcare document privacy and security
- Continuous innovation in healthcare-AI document integration capabilities

This MCP server is your gateway to unleashing the full potential of AI in healthcare document management through DS Core's robust Open API platform.