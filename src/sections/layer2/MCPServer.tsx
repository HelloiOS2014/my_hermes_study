import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { TabPanel } from "../../components/ui/TabPanel";
import { CheckList } from "../../components/ui/CheckList";

const stdioConfigExample = `# config.yaml — MCP Server 配置（stdio 传输）
mcp_servers:
  github:
    transport: stdio
    command: "npx"
    args:
      - "-y"
      - "@modelcontextprotocol/server-github"
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "\${GITHUB_TOKEN}"
    # 可选配置
    timeout: 30          # 单次调用超时（秒）
    auto_reconnect: true # 连接断开后自动重连
    max_retries: 3       # 最大重试次数

  filesystem:
    transport: stdio
    command: "npx"
    args:
      - "-y"
      - "@modelcontextprotocol/server-filesystem"
      - "/Users/me/projects"`;

const httpConfigExample = `# config.yaml — MCP Server 配置（HTTP/SSE 传输）
mcp_servers:
  remote-db:
    transport: http
    url: "https://mcp.example.com/db-server"
    headers:
      Authorization: "Bearer \${MCP_DB_TOKEN}"
    timeout: 60
    auto_reconnect: true

  # Streamable HTTP（MCP 2025-03 新增）
  analytics:
    transport: streamable-http
    url: "https://mcp.example.com/analytics"
    headers:
      X-API-Key: "\${ANALYTICS_KEY}"`;

export function MCPServer() {
  return (
    <Section id="mcp-server">
      <h3 className="text-xl font-semibold">MCP Server 接入</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        MCP（Model Context Protocol）是连接 Agent 与外部工具的标准协议。
        Hermes 原生支持 MCP，你可以接入社区提供的数百个 MCP Server——从 GitHub 操作到数据库查询，
        不需要写一行 Tool 代码。
      </p>

      {/* Transport comparison */}
      <div className="mt-6">
        <TabPanel
          tabs={[
            {
              label: "stdio 传输",
              content: (
                <div className="space-y-3">
                  <p className="text-sm text-text-secondary">
                    <strong>stdio</strong> 是最常用的传输方式：Hermes 启动一个子进程，
                    通过标准输入/输出与 MCP Server 通信。适合本地运行的 Server。
                  </p>
                  <CodeBlock code={stdioConfigExample} lang="yaml" title="config.yaml — stdio" />
                </div>
              ),
            },
            {
              label: "HTTP 传输",
              content: (
                <div className="space-y-3">
                  <p className="text-sm text-text-secondary">
                    <strong>HTTP/SSE</strong> 适合远程部署的 MCP Server。
                    支持标准 HTTP 和 Streamable HTTP（2025 年新增的流式传输协议）。
                  </p>
                  <CodeBlock code={httpConfigExample} lang="yaml" title="config.yaml — HTTP" />
                </div>
              ),
            },
          ]}
        />
      </div>

      {/* Features */}
      <h4 className="mt-8 text-lg font-semibold">Hermes MCP 集成特性</h4>
      <div className="mt-4">
        <CheckList
          items={[
            {
              label: "Auto-reconnect",
              description: "MCP Server 崩溃或网络断开时自动重连，最多重试 3 次",
            },
            {
              label: "Sampling 支持",
              description: "支持 MCP sampling 协议，Server 可以请求 LLM 帮忙做子推理",
            },
            {
              label: "Credential Stripping",
              description: "环境变量（如 ${TOKEN}）在传输前注入，不会泄露到 LLM 上下文中",
            },
            {
              label: "超时控制",
              description: "每个 Server 可独立设置超时时间，防止慢 Server 拖慢整个 Agent",
            },
            {
              label: "Tool 命名空间",
              description: "不同 Server 的 Tool 自动添加前缀（如 github.create_issue），避免命名冲突",
            },
          ]}
        />
      </div>

      {/* Tip */}
      <div className="mt-6 rounded-lg border border-accent/30 bg-accent/5 p-4">
        <p className="text-sm text-text-secondary">
          <strong className="text-accent">Tip：</strong>
          使用 <code>hermes mcp list</code> 查看当前已连接的 MCP Server 和它们提供的 Tools。
          用 <code>hermes mcp test github</code> 可以单独测试某个 Server 的连接状态。
        </p>
      </div>
    </Section>
  );
}
