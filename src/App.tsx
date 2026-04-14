import { useState } from "react";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { Footer } from "./components/layout/Footer";
// Layer 0
import { WhatIsHermes } from "./sections/layer0/WhatIsHermes";
import { Comparison } from "./sections/layer0/Comparison";
import { Prerequisites } from "./sections/layer0/Prerequisites";
import { Installation } from "./sections/layer0/Installation";
import { NousPortal } from "./sections/layer0/NousPortal";
import { ApiKeys } from "./sections/layer0/ApiKeys";
import { FirstConversation } from "./sections/layer0/FirstConversation";
import { DirectoryStructure } from "./sections/layer0/DirectoryStructure";
import { ConfigEssentials } from "./sections/layer0/ConfigEssentials";
import { SoulMdIntro } from "./sections/layer0/SoulMdIntro";
import { ConnectPlatform } from "./sections/layer0/ConnectPlatform";
import { ArchitectureOverview } from "./sections/layer0/ArchitectureOverview";
// Layer 1
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
// Layer 2
import { CustomTool } from "./sections/layer2/CustomTool";
import { PluginHooks } from "./sections/layer2/PluginHooks";
import { FullPlugin } from "./sections/layer2/FullPlugin";
import { MCPServer } from "./sections/layer2/MCPServer";
import { QualitySkill } from "./sections/layer2/QualitySkill";
import { MultiAgent } from "./sections/layer2/MultiAgent";
import { CronAutomation } from "./sections/layer2/CronAutomation";
import { MixtureOfAgents } from "./sections/layer2/MixtureOfAgents";
// Layer 3
import { FunctionCalling } from "./sections/layer3/FunctionCalling";
import { HermesModels } from "./sections/layer3/HermesModels";
import { AgentLoop } from "./sections/layer3/AgentLoop";
import { PromptBuilder } from "./sections/layer3/PromptBuilder";
import { ContextCompression } from "./sections/layer3/ContextCompression";
import { ToolInternals } from "./sections/layer3/ToolInternals";
import { GatewayArchitecture } from "./sections/layer3/GatewayArchitecture";
import { PTC } from "./sections/layer3/PTC";
import { RLGepa } from "./sections/layer3/RLGepa";
// Recipes
import { CodingAssistant } from "./sections/recipes/CodingAssistant";
import { Messenger } from "./sections/recipes/Messenger";
import { SmartHome } from "./sections/recipes/SmartHome";
import { ResearchAssistant } from "./sections/recipes/ResearchAssistant";
import { CommunityGallery } from "./sections/recipes/CommunityGallery";
// Ops
import { Troubleshoot } from "./sections/ops/Troubleshoot";
import { Patterns } from "./sections/ops/Patterns";
import { Upgrade } from "./sections/ops/Upgrade";
// Appendix
import { ConfigReference } from "./sections/appendix/ConfigReference";
import { Ecosystem } from "./sections/appendix/Ecosystem";
import { Glossary } from "./sections/appendix/Glossary";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Header onMenuToggle={() => setMenuOpen(!menuOpen)} />
      <div className="mx-auto flex max-w-[1200px]">
        <Sidebar mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="min-w-0 flex-1 px-6 lg:px-12">
          {/* Layer 0 · 初见 */}
          <WhatIsHermes />
          <Comparison />
          <Prerequisites />
          <Installation />
          <NousPortal />
          <ApiKeys />
          <FirstConversation />
          <DirectoryStructure />
          <ConfigEssentials />
          <SoulMdIntro />
          <ConnectPlatform />
          <ArchitectureOverview />
          {/* Layer 1 · 上手 */}
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
          {/* Layer 2 · 扩展 */}
          <CustomTool />
          <PluginHooks />
          <FullPlugin />
          <MCPServer />
          <QualitySkill />
          <MultiAgent />
          <CronAutomation />
          <MixtureOfAgents />
          {/* Layer 3 · 深入 */}
          <FunctionCalling />
          <HermesModels />
          <AgentLoop />
          <PromptBuilder />
          <ContextCompression />
          <ToolInternals />
          <GatewayArchitecture />
          <PTC />
          <RLGepa />
          {/* 实战菜谱 */}
          <CodingAssistant />
          <Messenger />
          <SmartHome />
          <ResearchAssistant />
          <CommunityGallery />
          {/* 运维手册 */}
          <Troubleshoot />
          <Patterns />
          <Upgrade />
          {/* 附录 */}
          <ConfigReference />
          <Ecosystem />
          <Glossary />
        </main>
      </div>
      <Footer />
    </div>
  );
}
