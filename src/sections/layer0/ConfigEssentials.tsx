import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { ExtendedReading } from "../../components/ui/ExtendedReading";
import { ConfigExplorer } from "../../playgrounds/ConfigExplorer";

export function ConfigEssentials() {
  return (
    <Section id="config-essentials">
      <TypewriterTitle
        text="0.9 常用配置场景"
        subtitle="你想做什么，改哪里"
      />

      <p className="text-text-secondary">
        配置文件位置：
        <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-accent">
          ~/.hermes/config.yaml
        </code>
        。不用通读整个文件 — 点击下面的场景，看你需要改哪里：
      </p>

      <ConfigExplorer />

      <p className="mt-4 text-sm text-text-muted">
        大部分配置也可以通过命令行修改：
        <code className="ml-1 rounded bg-bg-elevated px-1.5 py-0.5 font-mono">
          hermes config set &lt;key&gt; &lt;value&gt;
        </code>
      </p>

      <ExtendedReading
        links={[
          {
            title: "config.yaml 完整速查",
            url: "#appendix-config",
            source: "本教程 · 附录",
          },
        ]}
      />
    </Section>
  );
}
