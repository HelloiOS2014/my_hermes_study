import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { Footer } from "./components/layout/Footer";
import { WhatIsHermes } from "./sections/layer0/WhatIsHermes";
import { Comparison } from "./sections/layer0/Comparison";
import { QuickStart } from "./sections/layer0/QuickStart";
import { ArchitectureOverview } from "./sections/layer0/ArchitectureOverview";
import { CLIOverview } from "./sections/layer1/CLIOverview";
import { ModelSelection } from "./sections/layer1/ModelSelection";
import { SoulMd } from "./sections/layer1/SoulMd";
import { ProjectContext } from "./sections/layer1/ProjectContext";
import { MemorySystem } from "./sections/layer1/MemorySystem";
import { SkillsSystem } from "./sections/layer1/SkillsSystem";
import { ToolExplorer } from "./sections/layer1/ToolExplorer";
import { Security } from "./sections/layer1/Security";
import { MessagingPlatforms } from "./sections/layer1/MessagingPlatforms";
import { TerminalBackends } from "./sections/layer1/TerminalBackends";

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
          <CLIOverview />
          <ModelSelection />
          <SoulMd />
          <ProjectContext />
          <MemorySystem />
          <SkillsSystem />
          <ToolExplorer />
          <Security />
          <MessagingPlatforms />
          <TerminalBackends />
        </main>
      </div>
      <Footer />
    </div>
  );
}
