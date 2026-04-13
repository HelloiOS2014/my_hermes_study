import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { Footer } from "./components/layout/Footer";
import { Section } from "./components/layout/Section";

export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Header />
      <div className="mx-auto flex max-w-[1200px]">
        <Sidebar />
        <main className="min-w-0 flex-1 px-6 lg:px-12">
          <Section id="what-is-hermes">
            <h2 className="text-2xl font-bold">0.1 What is Hermes Agent?</h2>
            <p className="mt-4 text-text-secondary">Layer 0 内容将在后续任务中替换</p>
          </Section>
          <Section id="comparison">
            <h2 className="text-2xl font-bold">0.2 和其他框架有什么不同</h2>
            <p className="mt-4 text-text-secondary">占位</p>
          </Section>
          <Section id="quick-start">
            <h2 className="text-2xl font-bold">0.3 安装 + 第一次对话</h2>
            <p className="mt-4 text-text-secondary">占位</p>
          </Section>
          <Section id="architecture">
            <h2 className="text-2xl font-bold">0.4 架构鸟瞰</h2>
            <p className="mt-4 text-text-secondary">占位</p>
          </Section>
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
