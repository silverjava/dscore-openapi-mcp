# DS Core Open API DICOM Study MCP Server

This MCP server provides comprehensive AI LLM integration with DS Core's Open API platform for DICOM study management capabilities. It enables Large Language Models to seamlessly interact with medical imaging studies through DS Core's robust healthcare imaging ecosystem, bringing the full power of AI-driven medical image analysis and retrieval to your applications.

**Powered by [DS Core Open API Platform](https://open.dscore.com/)** - Complete AI-Ready Healthcare Imaging Access

## AI-Powered Medical Imaging Tools

### list-dicom-studies
**AI-Enhanced Medical Imaging Discovery** - Leverage DS Core's comprehensive medical imaging repository through natural language queries. This tool enables LLMs to perform sophisticated DICOM study searches with advanced filtering, metadata extraction, and pagination through DS Core's Open API platform.

**DS Core Integration Features:**
- Real-time access to complete medical imaging repositories
- Advanced filtering by patient ID and creation time
- Customizable metadata masks for targeted data retrieval
- Efficient pagination for large study collections
- Full compliance with medical imaging standards (DICOM)

**Parameters:**
- `pageSize` (number, optional): The maximum number of DICOM studies to return per page (max 100, default 20)
- `pageToken` (string, optional): The next_page_token value returned from a previous List request
- `metadataMask` (string, optional): Which metadata fields to return in the response (e.g. "00080030" for Study Time)
- `filter` (string, optional): A filter expression to restrict the DICOM studies returned. Only supports patient.id and create_time filters.
  - Example: `patient.id="1234"`
  - Example: `create_time >= "2021-01-01T00:00:00Z" and create_time < "2021-01-31T23:59:59Z"`
  - Example: `patient.id="1234" and create_time >= "2021-01-01T00:00:00Z" and create_time < "2021-01-31T23:59:59Z"`

**Response:**
- `dicomStudies` (array): Array of DICOM study objects
- `nextPageToken` (string, optional): Token for the next page of results
- `totalSize` (number): Total number of DICOM studies matching the query

### get-dicom-study
**Comprehensive Medical Imaging Retrieval** - Access complete DICOM studies with full metadata through DS Core's unified medical imaging platform. This tool provides LLMs with detailed study information including series data, instance counts, and comprehensive metadata for advanced medical image analysis.

**DS Core Imaging Data Access:**
- Complete DICOM study metadata and content access
- Patient-study relationship mapping
- Series and instance information retrieval
- Thumbnail and content URI access
- Rich medical imaging metadata (timestamps, file sizes)
- Secure, compliant medical imaging retrieval

**Parameters:**
- `studyId` (string, required): The ID of the DICOM study to retrieve from DS Core's imaging database

**Response:**
- `id` (string): The ID of the DICOM study
- `name` (string): The full resource name of the DICOM study
- `displayName` (string): Display name of the DICOM study
- `startTime` (string): Start time of the DICOM study
- `seriesCount` (number): Number of series in the study
- `instanceCount` (number): Number of instances in the study
- `fileSizeBytes` (string): Size of the study in bytes
- `contentUri` (string): URI to access the study content
- `thumbnailContentUri` (string, optional): URI to access the thumbnail content
- `patient` (object): Patient information associated with the study
  - `id` (string): Patient ID
  - `displayName` (string): Patient display name
  - `familyName` (string, optional): Patient family name
  - `givenName` (string, optional): Patient given name
  - `birthday` (string, optional): Patient birthday
  - `uri` (string): URI to access patient information
- `instancesMetadata` (array, optional): Metadata for instances in the study

## DS Core Open API Configuration

Connect to DS Core's Open API platform with these authentication parameters:

**Required Environment Variables:**
- `GENAPI_BASE_URL`: Your DS Core Open API endpoint URL (obtain from [DS Core Developer Portal](https://open.dscore.com/))
- `GENAPI_API_KEY`: Your DS Core Open API authentication key for secure healthcare data access

**Getting Started with DS Core:**
1. Visit [https://open.dscore.com/](https://open.dscore.com/) to access the DS Core Developer Portal
2. Register your application and obtain API credentials
3. Configure your environment variables with DS Core endpoints
4. Start leveraging AI-powered medical imaging access immediately

## Adding as MCP Server

To add this MCP server to your MCP client:

### Method 1: Using npx (Recommended)
```bash
# Set environment variables
export GENAPI_BASE_URL=your_genapi_base_url
export GENAPI_API_KEY=your_genapi_api_key

# Run the server directly with npx
npx dscore-openapi-dcmstudy-mcp@latest
```

### Method 2: Installing globally
```bash
# Install the server globally
npm install -g dscore-openapi-dcmstudy-mcp

# Set environment variables
export GENAPI_BASE_URL=your_genapi_base_url
export GENAPI_API_KEY=your_genapi_api_key

# Run the server
dscore-openapi-dcmstudy
```

### Method 3: Local installation
```bash
# Install the server locally
npm install dscore-openapi-dcmstudy-mcp

# Set environment variables
export GENAPI_BASE_URL=your_genapi_base_url
export GENAPI_API_KEY=your_genapi_api_key

# Run the server
npx dscore-openapi-dcmstudy-mcp
```

### Method 4: JSON Configuration (For MCP Clients that support JSON config)
```json
{
  "dscore-openapi-dcmstudy": {
    "command": "npx",
    "args": [
      "-y",
      "dscore-openapi-dcmstudy-mcp@latest"
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
  "dscore-openapi-dcmstudy": {
    "command": "node",
    "args": [
      "/path/to/dscore-openapi-dcmstudy/dist/index.js"
    ],
    "env": {
      "GENAPI_BASE_URL": "your_genapi_base_url_here",
      "GENAPI_API_KEY": "your_genapi_api_key_here"
    }
  }
}
```

## AI-Enhanced Medical Imaging

This MCP server bridges the gap between advanced AI capabilities and comprehensive medical imaging management through DS Core's Open API platform. By integrating DICOM study functionalities directly into your LLM workflows, you enable:

**Key AI Imaging Capabilities:**
- **Natural Language Imaging Queries**: Ask questions about medical imaging studies in plain English
- **Intelligent Image Analysis**: Leverage AI to analyze DICOM metadata and study information
- **Real-time Imaging Insights**: Access up-to-date medical imaging repositories for informed decision-making
- **Compliant Imaging Handling**: Ensure medical imaging privacy and security standards
- **Scalable AI Integration**: Build AI-powered medical imaging applications with enterprise-grade reliability

**Use Cases for AI Integration:**
- Virtual radiology assistants with imaging context
- Automated DICOM study analysis and summarization
- AI-powered clinical decision support with imaging references
- Healthcare workflow automation with medical imaging processing
- Medical imaging information extraction and insights

To use this MCP server, configure it in your MCP client with your DS Core Open API credentials to unlock the full potential of AI-driven healthcare imaging access.

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

The list-dicom-studies tool supports AI-optimized pagination through the pageSize and pageToken parameters:

1. **Initial Discovery**: Omit the pageToken parameter to get the first page of results
2. **Progressive Loading**: Use the nextPageToken value from the previous response as the pageToken parameter
3. **Complete Analysis**: When there are no more pages, the nextPageToken in the response will be null or undefined

**AI-Powered Pagination Workflow:**
```json
// First call - Initial study discovery
{
  "pageSize": 10
}

// Response includes nextPageToken: "eyJ..."

// Second call - Progressive study loading
{
  "pageSize": 10,
  "pageToken": "eyJ..."
}
```

## Advanced Metadata Masking

The metadataMask parameter allows you to specify which DICOM metadata fields to include in the response, enabling targeted data retrieval for AI analysis:

**Example: Study Time and Date**
```json
{
  "metadataMask": "00080030,00080020"
}
```

**Example: Patient Information**
```json
{
  "metadataMask": "00100010,00100020,00100030"
}
```

**Example: Study Description and Modality**
```json
{
  "metadataMask": "00081030,00080060"
}
```

**Common DICOM Tags:**
- `00080020`: Study Date
- `00080030`: Study Time
- `00080060`: Modality
- `00081030`: Study Description
- `00100010`: Patient Name
- `00100020`: Patient ID
- `00100030`: Patient Birth Date

## About DS Core Open API Platform

The **[DS Core Open API Platform](https://open.dscore.com/)** provides a comprehensive, secure, and scalable infrastructure for healthcare medical imaging in the AI era. This MCP server represents the complete integration of DS Core's DICOM study management capabilities with modern Large Language Models, enabling:

**Platform Benefits:**
- **Complete Healthcare Imaging Ecosystem**: Access to comprehensive DICOM study repositories, metadata, and imaging content
- **AI-Ready Architecture**: Designed from the ground up to support LLM integration and advanced AI workflows
- **Enterprise-Grade Security**: Full compliance with healthcare data protection standards and medical imaging regulations
- **Real-Time Imaging Synchronization**: Up-to-the-minute accuracy for critical medical imaging information
- **Developer-Friendly Integration**: Simple, well-documented APIs that work seamlessly with AI systems

**Why DS Core for AI Medical Imaging Integration:**
- Proven reliability in production healthcare imaging environments
- Comprehensive DICOM study models that support complex AI use cases
- Scalable infrastructure that grows with your AI medical imaging applications
- Strong commitment to medical imaging privacy and security
- Continuous innovation in healthcare-AI medical imaging integration capabilities

This MCP server is your gateway to unleashing the full potential of AI in healthcare medical imaging through DS Core's robust Open API platform.