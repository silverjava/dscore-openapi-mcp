export declare class MCPServer {
    private mcpServer;
    private transport;
    constructor(serverName?: string, serverVersion?: string);
    start(): Promise<void>;
    stop(): Promise<void>;
    registerTool(name: string, description: string, inputSchema: any, handler: Function): void;
}
//# sourceMappingURL=mcpServer.d.ts.map