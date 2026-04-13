import { Section } from "../../components/layout/Section";
import { HoverTable } from "../../components/ui/HoverTable";
import { backendHeaders, backendRows } from "../../data/platforms";

export function TerminalBackends() {
  return (
    <Section id="terminal-backends">
      <h3 className="text-xl font-semibold">终端后端选型</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        Hermes 的 <code>terminal</code> 工具支持 6 种后端，每种后端提供不同级别的安全隔离和部署灵活性。
        选择哪个后端取决于你的使用场景：个人开发选 local，生产环境推荐 Docker，HPC 场景用 Singularity。
      </p>

      <div className="mt-6">
        <HoverTable headers={backendHeaders} rows={backendRows} />
      </div>

      {/* Why box */}
      <div className="mt-6 rounded-lg border border-warning/30 bg-warning/5 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-warning">
          <span>💡</span> 为什么需要 6 种后端？
        </div>
        <p className="text-sm text-text-secondary">
          这源于<strong>安全 x 部署场景</strong>的组合需求。让 AI 执行 shell 命令本质上是高风险操作——
          local 后端适合你信任 Agent 的场景，而 Docker/SSH/Modal 后端通过不同层级的隔离来限制潜在损害范围。
          不同组织有不同的基础设施偏好，6 种后端确保 Hermes 能适配几乎所有环境。
        </p>
      </div>
    </Section>
  );
}
