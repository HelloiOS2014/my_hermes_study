import { Section } from "../../components/layout/Section";
import { CheckList } from "../../components/ui/CheckList";

export function Security() {
  return (
    <Section id="security">
      <h3 className="text-xl font-semibold">安全体系</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        让 AI Agent 执行命令、读写文件、访问网络——这些能力很强大，但也意味着必须有完善的安全机制。
        Hermes 在多个层面实施了防护措施：
      </p>

      <div className="mt-6">
        <CheckList
          items={[
            {
              label: "危险命令审批",
              description:
                "rm -rf、git push --force 等破坏性命令需要用户确认后才能执行。Agent 不能绕过这个审批机制。",
            },
            {
              label: "Prompt Injection 防御",
              description:
                "对 AGENTS.md、外部网页内容、用户输入进行基础的 injection 检测，防止恶意指令劫持 Agent 行为。",
            },
            {
              label: "Credential 管理（chmod 600）",
              description:
                "API key 和 token 存储在 ~/.hermes/.env 中，文件权限自动设置为 600（仅所有者可读写）。",
            },
            {
              label: "Credential Pool（多 key 轮转）",
              description:
                "支持配置多个 API key 并自动轮转，既能分散限流风险，也能在单个 key 泄露时快速切换。",
            },
            {
              label: "路径安全",
              description:
                "文件操作默认限制在当前工作目录和 ~/.hermes/ 范围内，防止 Agent 意外修改系统文件。",
            },
            {
              label: "URL 安全验证",
              description:
                "浏览器工具和 web_extract 工具会校验目标 URL，阻止访问内网地址（SSRF 防护）和已知恶意域名。",
            },
          ]}
        />
      </div>
    </Section>
  );
}
