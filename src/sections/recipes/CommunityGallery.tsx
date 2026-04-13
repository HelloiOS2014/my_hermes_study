import { Section } from "../../components/layout/Section";
import { CardGrid } from "../../components/ui/CardGrid";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const communityProjects = [
  {
    title: "autonovel",
    icon: "\u{1F4D6}",
    description: "10 万字小说生成 pipeline",
    detail: (
      <p>
        全自动长篇小说生成框架。Agent 负责大纲规划、角色设定、章节撰写和前后一致性检查，
        通过 Memory 维护人物关系图谱和情节线索，可以持续产出连贯的 10 万字以上长篇作品。
        <br />
        <a href="https://github.com/hermes-agent/autonovel" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          GitHub: hermes-agent/autonovel
        </a>
      </p>
    ),
  },
  {
    title: "hermescraft",
    icon: "\u{1F3AE}",
    description: "Minecraft 伴侣",
    detail: (
      <p>
        在 Minecraft 中运行的 Hermes Agent 伴侣。拥有持久记忆，能记住地图上的建筑位置、
        玩家偏好和物品存放处。通过游戏内聊天交互，可以帮助采集资源、规划建筑、导航地形。
        <br />
        <a href="https://github.com/hermes-agent/hermescraft" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          GitHub: hermes-agent/hermescraft
        </a>
      </p>
    ),
  },
  {
    title: "hermes-incident-commander",
    icon: "\u{1F6A8}",
    description: "SRE 自愈 Agent",
    detail: (
      <p>
        面向生产环境的 SRE 事件响应 Agent。监控告警后自动诊断根因，执行预定义的修复 runbook，
        在 Slack 中实时汇报进度。支持自动扩容、服务重启、日志分析等操作，
        将 MTTR（平均修复时间）缩短 70%。
        <br />
        <a href="https://github.com/hermes-agent/hermes-incident-commander" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          GitHub: hermes-agent/hermes-incident-commander
        </a>
      </p>
    ),
  },
  {
    title: "hermes-life-os",
    icon: "\u{1F3E0}",
    description: "个人操作系统",
    detail: (
      <p>
        将 Hermes 打造为个人生活操作系统。通过持续学习你的日常模式——起床时间、常去的餐厅、
        工作习惯——自动安排日程、推荐饮食、提醒待办。集成日历、健康数据和智能家居，
        成为真正懂你的 AI 助手。
        <br />
        <a href="https://github.com/hermes-agent/hermes-life-os" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          GitHub: hermes-agent/hermes-life-os
        </a>
      </p>
    ),
  },
  {
    title: "opencode-hermes-multiagent",
    icon: "\u{1F916}",
    description: "17 Agent 协作",
    detail: (
      <p>
        大规模多 Agent 协作系统。17 个专业化 Agent（架构师、前端、后端、测试、DevOps、
        文档等）通过消息总线协调工作，各自拥有独立的 SOUL.md 和 Skills。
        适用于大型项目的端到端开发，从需求分析到部署全流程自动化。
        <br />
        <a href="https://github.com/hermes-agent/opencode-hermes-multiagent" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          GitHub: hermes-agent/opencode-hermes-multiagent
        </a>
      </p>
    ),
  },
];

export function CommunityGallery() {
  return (
    <Section id="recipe-gallery">
      <h3 className="text-xl font-semibold">社区精选案例展廊</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        Hermes 社区中涌现了许多令人惊叹的项目——从自动写小说到管理生产环境，
        从 Minecraft 伴侣到 17 个 Agent 协作开发。点击卡片查看详情。
      </p>

      <div className="mt-6">
        <CardGrid columns={2} cards={communityProjects} />
      </div>

      <ExtendedReading
        links={[
          {
            title: "awesome-hermes-agent：社区项目完整列表",
            url: "https://github.com/0xNyk/awesome-hermes-agent",
            source: "GitHub",
          },
          {
            title: "Hermes Agent 社区 Discord",
            url: "https://discord.gg/hermes-agent",
            source: "Discord",
          },
        ]}
      />
    </Section>
  );
}
