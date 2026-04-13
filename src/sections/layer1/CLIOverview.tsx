import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { CardGrid } from "../../components/ui/CardGrid";
import { commands } from "../../data/commands";

export function CLIOverview() {
  return (
    <Section id="cli-overview">
      <TypewriterTitle text="Layer 1 · 上手" subtitle="打造你的私人 Agent" />

      <h3 className="text-xl font-semibold">CLI 全景：hermes 的十八般武艺</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        Hermes 的所有能力都通过 CLI 暴露。下面是你最常用的 8 个命令——点击任意卡片查看详情。
      </p>

      <div className="mt-6">
        <CardGrid
          columns={2}
          cards={commands.map((cmd) => ({
            title: cmd.name,
            icon: cmd.icon,
            description: cmd.command,
            detail: <p>{cmd.detail}</p>,
          }))}
        />
      </div>
    </Section>
  );
}
