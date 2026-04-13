import { Section } from "../../components/layout/Section";
import { TabPanel } from "../../components/ui/TabPanel";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { ExtendedReading } from "../../components/ui/ExtendedReading";
import { platformGuides } from "../../data/platforms";

export function MessagingPlatforms() {
  return (
    <Section id="messaging-platforms">
      <h3 className="text-xl font-semibold">消息平台 + Gateway</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        Hermes Gateway 是一个统一的消息网关——一个进程同时连接 Telegram、Discord、微信、飞书等 20+ 平台。
        你只需配置好各平台的 token，运行 <code>hermes gateway</code>，Agent 就能在所有平台上同时响应。
      </p>

      <div className="mt-6">
        <TabPanel
          tabs={platformGuides.map((platform) => ({
            label: `${platform.icon} ${platform.name}`,
            content: (
              <ol className="space-y-4">
                {platform.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">{step.title}</div>
                      {step.note && (
                        <p className="mt-1 text-sm text-text-secondary">{step.note}</p>
                      )}
                      {step.code && (
                        <div className="mt-2">
                          <CodeBlock code={step.code} lang="bash" />
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            ),
          }))}
        />
      </div>

      <ExtendedReading
        links={[
          {
            title: "Hermes Gateway 部署完全指南",
            url: "https://medium.com/@hermes-agent/gateway-deployment-guide",
            source: "Medium",
          },
          {
            title: "Supported Platforms List",
            url: "https://docs.hermes-agent.dev/platforms",
            source: "Official Docs",
          },
        ]}
      />
    </Section>
  );
}
