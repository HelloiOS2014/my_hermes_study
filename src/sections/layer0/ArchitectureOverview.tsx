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
  { id: "core", label: "Agent Core", description: "\u6838\u5FC3\u8C03\u5EA6\u5668\uFF0C\u7BA1\u7406\u5BF9\u8BDD\u5FAA\u73AF\u548C\u5DE5\u5177\u8C03\u7528", color: "#58a6ff", x: 230, y: 40, linkTo: "cli-overview" },
  { id: "tools", label: "Tools", description: "47+ \u5185\u7F6E\u5DE5\u5177\uFF0C\u901A\u8FC7 MCP \u534F\u8BAE\u6269\u5C55", color: "#3fb950", x: 60, y: 160, linkTo: "tool-explorer" },
  { id: "memory", label: "Memory", description: "\u8DE8\u4F1A\u8BDD\u8BB0\u5FC6\u7CFB\u7EDF\uFF0C\u8BB0\u4F4F\u4F60\u7684\u504F\u597D", color: "#d29922", x: 230, y: 160, linkTo: "memory-system" },
  { id: "skills", label: "Skills", description: "\u53EF\u5B66\u4E60\u7684\u80FD\u529B\u6A21\u5757\uFF0C\u6301\u7EED\u8FDB\u5316", color: "#f85149", x: 400, y: 160, linkTo: "skills-system" },
  { id: "gateway", label: "Gateway", description: "\u8DE820+ \u5E73\u53F0\u7684\u6D88\u606F\u7F51\u5173", color: "#a371f7", x: 230, y: 290, linkTo: "messaging-platforms" },
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
        text="0.4 \u67B6\u6784\u9E1F\u77B0"
        subtitle="\u70B9\u51FB\u6A21\u5757\u8DF3\u8F6C\u5230\u8BE6\u7EC6\u7AE0\u8282"
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
