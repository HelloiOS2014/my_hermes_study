import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { TabPanel } from "../../components/ui/TabPanel";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const trajectoryExample = [
  "# RL 训练数据收集 (save_trajectories=True)",
  "# 每次 agent 交互自动保存为 JSONL",
  "",
  '{"session_id": "abc123",',
  ' "turn": 1,',
  ' "input": "帮我重构这个函数",',
  ' "actions": [',
  '   {"tool": "read_file", "args": {"path": "src/utils.py"},',
  '    "result": "def messy_func():..."},',
  '   {"tool": "write_file", "args": {"path": "src/utils.py",',
  '    "content": "def clean_func():..."},',
  '    "result": "success"}',
  " ],",
  ' "outcome": "positive",',
  ' "reward_signal": 0.85,',
  ' "tokens_used": 2340}',
].join("\n");

const gepaFlow = [
  "# GEPA: Genetic-Pareto Prompt Evolution",
  "# Powered by DSPy integration",
  "",
  "Population = initialize_prompts(seed_prompt, n=20)",
  "",
  "for generation in range(max_generations):",
  "    # 1. Evaluate each prompt variant",
  "    scores = []",
  "    for prompt in Population:",
  "        accuracy = evaluate(prompt, test_suite)",
  "        cost = estimate_token_cost(prompt)",
  "        scores.append((accuracy, cost))",
  "",
  "    # 2. Pareto frontier selection",
  "    #    (maximize accuracy, minimize cost)",
  "    frontier = pareto_select(Population, scores)",
  "",
  "    # 3. Genetic operations",
  "    children = []",
  "    for parent in frontier:",
  "        child = mutate(parent)  # LLM-guided mutation",
  "        child = crossover(parent, random.choice(frontier))",
  "        children.append(child)",
  "",
  "    # 4. Population update",
  "    Population = frontier + children",
  "",
  "# Output: Pareto-optimal prompts",
  "best_prompts = pareto_select(Population, final_scores)",
].join("\n");

export function RLGepa() {
  return (
    <Section id="rl-gepa">
      <h3 className="text-xl font-semibold">RL 训练 + GEPA 自进化</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        Hermes Agent 不仅能在运行时学习（Memory + Skills），还支持
        <strong>离线自进化</strong>：通过 RL 训练优化决策，通过 GEPA 自动进化 prompt。
        这是真正的「自我进化 AI Agent」。
      </p>

      <TabPanel
        tabs={[
          {
            label: "RL 训练",
            content: (
              <div className="space-y-4">
                <p className="text-sm text-text-secondary">
                  开启 <code>save_trajectories</code> flag 后，agent 的每次交互都会保存为
                  JSONL 格式的 trajectory 数据——包含输入、工具调用序列、结果和奖励信号。
                </p>

                <CodeBlock
                  code={trajectoryExample}
                  lang="json"
                  title="Trajectory 数据格式 (JSONL)"
                />

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      title: "trajectory_compressor",
                      desc: "压缩冗余 trajectory，去除重复模式和无效探索路径",
                    },
                    {
                      title: "batch_runner",
                      desc: "批量重跑 trajectory 数据，验证改进效果并收集新的训练信号",
                    },
                    {
                      title: "Tinker-Atropos",
                      desc: "基于 trajectory 数据的强化学习训练器，优化 agent 的决策策略",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-lg border border-border bg-bg-card p-4"
                    >
                      <code className="text-xs font-bold text-accent">
                        {item.title}
                      </code>
                      <p className="mt-2 text-sm text-text-secondary">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            label: "GEPA 自进化",
            content: (
              <div className="space-y-4">
                <p className="text-sm text-text-secondary">
                  <strong>GEPA (Genetic-Pareto Prompt Evolution)</strong> 是一套自动 prompt 优化系统。
                  它将 prompt 视为「基因」，通过遗传算法在 Pareto 前沿上搜索最优解——
                  同时优化准确率和 token 成本。集成 DSPy 框架实现自动化评估和变异。
                </p>

                <CodeBlock
                  code={gepaFlow}
                  lang="python"
                  title="GEPA 算法流程 (伪代码)"
                />

                <p className="text-sm text-text-secondary">
                  GEPA 可以自动优化三类目标：
                </p>
                <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                  <li>
                    <strong>Skills</strong>：优化 Skill 的指令文本，提高执行成功率
                  </li>
                  <li>
                    <strong>Tools</strong>：优化工具的 description 和参数说明
                  </li>
                  <li>
                    <strong>Prompts</strong>：优化 system prompt 的各层内容
                  </li>
                </ul>
              </div>
            ),
          },
        ]}
      />

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        {[
          { value: "0 GPU", label: "无需 GPU 训练" },
          { value: "~$2-10", label: "单次 GEPA 运行成本" },
          { value: "ICLR 2026", label: "Oral Paper" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-bg-card p-5 text-center"
          >
            <div className="text-2xl font-bold text-accent">{stat.value}</div>
            <div className="mt-1 text-sm text-text-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-text-secondary">
        GEPA 的核心优势在于<strong>不需要 GPU 训练</strong>——
        它通过 API 调用 LLM 完成变异和评估，整个优化过程只需要 API credits。
        单次运行成本约 $2-10，即可生成一组 Pareto 最优 prompt。
        该工作已被 ICLR 2026 接收为 Oral paper。
      </p>

      <ExtendedReading
        links={[
          {
            title: "hermes-agent-self-evolution Repository",
            url: "https://github.com/NousResearch/hermes-agent-self-evolution",
            source: "GitHub",
          },
          {
            title: "GEPA: Genetic-Pareto Prompt Evolution (arXiv)",
            url: "https://arxiv.org/abs/2501.xxxxx",
            source: "arXiv",
          },
          {
            title: "DSPy: Programming with Foundation Models",
            url: "https://github.com/stanfordnlp/dspy",
            source: "GitHub",
          },
        ]}
      />
    </Section>
  );
}
