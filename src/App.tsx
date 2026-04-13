import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { Footer } from "./components/layout/Footer";
import { Section } from "./components/layout/Section";
import { WhatIsHermes } from "./sections/layer0/WhatIsHermes";
import { Comparison } from "./sections/layer0/Comparison";
import { QuickStart } from "./sections/layer0/QuickStart";
import { ArchitectureOverview } from "./sections/layer0/ArchitectureOverview";

export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Header />
      <div className="mx-auto flex max-w-[1200px]">
        <Sidebar />
        <main className="min-w-0 flex-1 px-6 lg:px-12">
          <WhatIsHermes />
          <Comparison />
          <QuickStart />
          <ArchitectureOverview />
          <Section id="cli-overview"><h2 className="text-2xl font-bold">1.1 CLI 全景</h2><p className="mt-4 text-text-secondary">占位</p></Section>
          <Section id="model-selection"><h2 className="text-2xl font-bold">1.2 选模型</h2><p className="mt-4 text-text-secondary">占位</p></Section>
          <Section id="soul-md"><h2 className="text-2xl font-bold">1.3 SOUL.md</h2><p className="mt-4 text-text-secondary">占位</p></Section>
          <Section id="project-context"><h2 className="text-2xl font-bold">1.4 项目上下文</h2><p className="mt-4 text-text-secondary">占位</p></Section>
          <Section id="memory-system"><h2 className="text-2xl font-bold">1.5 记忆系统</h2><p className="mt-4 text-text-secondary">占位</p></Section>
          <Section id="skills-system"><h2 className="text-2xl font-bold">1.6 Skills</h2><p className="mt-4 text-text-secondary">占位</p></Section>
          <Section id="tool-explorer"><h2 className="text-2xl font-bold">1.7 工具箱</h2><p className="mt-4 text-text-secondary">占位</p></Section>
          <Section id="security"><h2 className="text-2xl font-bold">1.8 安全</h2><p className="mt-4 text-text-secondary">占位</p></Section>
          <Section id="messaging-platforms"><h2 className="text-2xl font-bold">1.9 消息平台</h2><p className="mt-4 text-text-secondary">占位</p></Section>
          <Section id="terminal-backends"><h2 className="text-2xl font-bold">1.10 终端后端</h2><p className="mt-4 text-text-secondary">占位</p></Section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
