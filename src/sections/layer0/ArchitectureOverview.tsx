import { useState } from "react";
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";

interface Module {
  id: string;
  label: string;
  description: string;
  color: string;
  x: number;
  y: number;
  linkTo: string;
}

const modules: Module[] = [
  { id: "core", label: "Agent Core", description: "核心调度器，管理对话循环和工具调用", color: "#58a6ff", x: 230, y: 40, linkTo: "cli-overview" },
  { id: "tools", label: "Tools", description: "47+ 内置工具，通过 MCP 协议扩展", color: "#3fb950", x: 60, y: 160, linkTo: "tool-explorer" },
  { id: "memory", label: "Memory", description: "跨会话记忆系统，记住你的偏好", color: "#d29922", x: 230, y: 160, linkTo: "memory-system" },
  { id: "skills", label: "Skills", description: "可学习的能力模块，持续进化", color: "#f85149", x: 400, y: 160, linkTo: "skills-system" },
  { id: "gateway", label: "Gateway", description: "跨20+ 平台的消息网关", color: "#a371f7", x: 230, y: 290, linkTo: "messaging-platforms" },
];

const connections: [string, string][] = [
  ["core", "tools"],
  ["core", "memory"],
  ["core", "skills"],
  ["core", "gateway"],
];

function getCenter(m: Module) {
  return { cx: m.x + 50, cy: m.y + 30 };
}

export function ArchitectureOverview() {
  const [hovered, setHovered] = useState<string | null>(null);

  const handleClick = (linkTo: string) => {
    document.getElementById(linkTo)?.scrollIntoView({ behavior: "smooth" });
  };

  const moduleMap = Object.fromEntries(modules.map((m) => [m.id, m]));

  return (
    <Section id="architecture">
      <TypewriterTitle
        text="0.12 架构鸟瞰"
        subtitle="点击模块跳转到详细章节"
      />

      <div className="mt-4 flex justify-center">
        <svg
          viewBox="0 0 560 400"
          className="w-full max-w-[560px]"
          role="img"
          aria-label="Hermes Agent Architecture Diagram"
        >
          {/* Connection lines */}
          {connections.map(([fromId, toId]) => {
            const from = getCenter(moduleMap[fromId]);
            const to = getCenter(moduleMap[toId]);
            return (
              <line
                key={`${fromId}-${toId}`}
                x1={from.cx}
                y1={from.cy}
                x2={to.cx}
                y2={to.cy}
                stroke={hovered === fromId || hovered === toId ? "#58a6ff" : "#30363d"}
                strokeWidth={hovered === fromId || hovered === toId ? 2.5 : 1.5}
                strokeDasharray={hovered === fromId || hovered === toId ? "none" : "6 4"}
                style={{ transition: "all 0.3s ease" }}
              />
            );
          })}

          {/* Module boxes */}
          {modules.map((m) => {
            const isHovered = hovered === m.id;
            return (
              <g
                key={m.id}
                className="cursor-pointer"
                onMouseEnter={() => setHovered(m.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClick(m.linkTo)}
              >
                <rect
                  x={m.x}
                  y={m.y}
                  width={100}
                  height={60}
                  rx={8}
                  fill={isHovered ? `${m.color}22` : "#0d1117"}
                  stroke={isHovered ? m.color : `${m.color}66`}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  style={{ transition: "all 0.3s ease" }}
                />
                <text
                  x={m.x + 50}
                  y={m.y + 35}
                  textAnchor="middle"
                  fill={m.color}
                  fontSize={13}
                  fontWeight={600}
                >
                  {m.label}
                </text>

                {/* Tooltip */}
                {isHovered && (
                  <g>
                    <rect
                      x={m.x - 40}
                      y={m.y - 38}
                      width={180}
                      height={30}
                      rx={6}
                      fill="#161b22"
                      stroke="#30363d"
                      strokeWidth={1}
                    />
                    <text
                      x={m.x + 50}
                      y={m.y - 18}
                      textAnchor="middle"
                      fill="#8b949e"
                      fontSize={11}
                    >
                      {m.description}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </Section>
  );
}
