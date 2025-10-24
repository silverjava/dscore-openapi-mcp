# DS Core MCP Server

A monorepo collection of Model Context Protocol (MCP) servers for DS Core's Open API platform, enabling AI Large Language Models to seamlessly interact with healthcare data and services.

**Powered by [DS Core Open API Platform](https://open.dscore.com/)** - Complete AI-Ready Healthcare Data Access

## MCP Servers

This monorepo contains four specialized MCP servers for different DS Core healthcare domains:

### 1. Patient Management (`dscore-openapi-patient`)
AI-enhanced patient data access with search and retrieval capabilities.

**Tools:**
- `search-patient` - Search patients by name, card ID with pagination
- `get-patient` - Retrieve complete patient records

### 2. Document Management (`dscore-openapi-document`)
Healthcare document discovery and retrieval with advanced filtering.

**Tools:**
- `list-documents` - List documents with patient/time filtering
- `get-document` - Get complete document metadata and content URIs

### 3. DICOM Study Management (`dscore-openapi-dcmstudy`)
Medical imaging study access with DICOM metadata support.

**Tools:**
- `list-dicom-studies` - List DICOM studies with customizable metadata masks
- `get-dicom-study` - Retrieve complete study information with series/instance data

### 4. Digital Impression Management (`dscore-openapi-digitalimpression`)
Dental scan data access and management.

**Tools:**
- `list-digital-impressions` - List digital impressions with filtering
- `get-digital-impression` - Get complete dental scan data and metadata

## Quick Start

### Prerequisites
- Node.js (v16 or higher recommended)
- DS Core Open API credentials from [https://open.dscore.com/](https://open.dscore.com/)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dscore-mcp-server

# Install dependencies
npm install

# Build all servers
npm run build
```

### Build Individual Servers

```bash
npm run build:patient
npm run build:document
npm run build:dcmstudy
npm run build:digitalimpression
```

## Configuration

All MCP servers require DS Core Open API credentials:

**Required Environment Variables:**
- `GENAPI_BASE_URL` - Your DS Core Open API endpoint URL
- `GENAPI_API_KEY` - Your DS Core Open API authentication key

## Usage

Each MCP server can be run independently. See individual server READMEs for detailed usage instructions:

- [Patient Server README](mcp-servers/dscore-openapi-patient/README.md)
- [Document Server README](mcp-servers/dscore-openapi-document/README.md)
- [DICOM Study Server README](mcp-servers/dscore-openapi-dcmstudy/README.md)
- [Digital Impression Server README](mcp-servers/dscore-openapi-digitalimpression/README.md)

### Example: Running with npx

```bash
# Set environment variables
export GENAPI_BASE_URL=your_genapi_base_url
export GENAPI_API_KEY=your_genapi_api_key

# Run any server
npx dscore-openapi-patient-mcp@latest
npx dscore-openapi-document-mcp@latest
npx dscore-openapi-dcmstudy-mcp@latest
npx dscore-openapi-digitalimpression-mcp@latest
```

## Development

```bash
# Build all servers
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Clean build artifacts
npm run clean
```

## Monorepo Structure

```
dscore-mcp-server/
├── mcp-servers/
│   ├── dscore-openapi-patient/
│   ├── dscore-openapi-document/
│   ├── dscore-openapi-dcmstudy/
│   └── dscore-openapi-digitalimpression/
├── package.json
├── tsconfig.base.json
└── README.md
```

## About DS Core Open API Platform

The **[DS Core Open API Platform](https://open.dscore.com/)** provides comprehensive, secure, and scalable infrastructure for healthcare data access in the AI era. These MCP servers enable seamless integration of DS Core's healthcare capabilities with modern Large Language Models.

**Platform Benefits:**
- Complete healthcare data ecosystem access
- AI-ready architecture for LLM integration
- Enterprise-grade security and compliance
- Real-time data synchronization
- Developer-friendly APIs

## License

MIT

## Author

GenAPI
