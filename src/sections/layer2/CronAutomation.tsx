import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { FoldPanel } from "../../components/ui/FoldPanel";

const cronBasicExample = `# 使用 cronjob tool 创建定时任务
# Agent 在对话中调用 cronjob tool：
{
    "name": "cronjob",
    "parameters": {
        "action": "create",
        "name": "morning-briefing",
        "schedule": "0 8 * * 1-5",
        "task": "总结今天的日程、待办事项和重要邮件，生成晨报",
        "profile": "work-assistant"
    }
}

# cron 表达式速查：
# ┌───────────── 分 (0-59)
# │ ┌─────────── 时 (0-23)
# │ │ ┌───────── 日 (1-31)
# │ │ │ ┌─────── 月 (1-12)
# │ │ │ │ ┌───── 周几 (0-7, 0和7都是周日)
# │ │ │ │ │
# * * * * *
# 0 8 * * 1-5    每周一到五早上 8:00
# */30 * * * *    每 30 分钟
# 0 0 1 * *      每月 1 号零点`;

const telegramExample = `# 实际场景：每天早上推送晨报到 Telegram

# 1. 创建定时任务
hermes cron create \\
  --name "daily-briefing" \\
  --schedule "0 8 * * *" \\
  --task "
    1. 用 web_search 查看今日科技新闻前 5 条
    2. 检查 GitHub 仓库的新 issues 和 PRs
    3. 读取日历获取今日日程
    4. 汇总以上信息，格式化为简洁晨报
    5. 通过 send_message 发送到 Telegram
  " \\
  --profile work-assistant

# 2. 查看已创建的定时任务
hermes cron list
# NAME              SCHEDULE      NEXT RUN           STATUS
# daily-briefing    0 8 * * *     2025-01-16 08:00   active
# weekly-review     0 18 * * 5    2025-01-17 18:00   active

# 3. 手动触发一次（测试用）
hermes cron trigger daily-briefing

# 4. 查看执行日志
hermes cron logs daily-briefing --last 5`;

const webhookExample = `# Webhook 触发：外部事件触发 Agent 执行
# 配置 config.yaml
webhooks:
  github-push:
    path: "/hooks/github-push"
    secret: "\${WEBHOOK_SECRET}"
    task: |
      收到 GitHub push 事件。
      分析 push 的 commits，检查是否有：
      1. 破坏性变更（breaking changes）
      2. 缺少测试的新代码
      3. 安全相关的改动
      生成简要报告并发送到 Slack #code-review。
    profile: code-reviewer

  alert-handler:
    path: "/hooks/alerts"
    task: |
      收到系统告警。分析告警内容，
      判断严重程度并决定是否需要立即通知 on-call 人员。
    profile: ops-assistant

# 启动 webhook 监听
hermes webhook serve --port 8080`;

export function CronAutomation() {
  return (
    <Section id="cron-automation">
      <h3 className="text-xl font-semibold">定时任务与自动化</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        Agent 不必等你说话才行动。通过 <code>cronjob</code> tool 和 Webhook 触发器，
        Hermes 可以在预定时间或外部事件触发时自主执行任务——晨报推送、代码审查、系统监控都可以自动化。
      </p>

      <div className="mt-6 space-y-1 rounded-lg border border-border">
        <FoldPanel title="cronjob Tool 基础" badge="核心" defaultOpen>
          <p className="mb-3 text-sm text-text-secondary">
            cronjob 是一个内置 Tool，Agent 可以在对话中创建、查看和管理定时任务。
            每个任务在触发时会启动一个新的 Agent session 来执行预定义的 task。
          </p>
          <CodeBlock code={cronBasicExample} lang="bash" title="cronjob 基础" />
        </FoldPanel>

        <FoldPanel title="实战：每日晨报推送到 Telegram" badge="示例">
          <p className="mb-3 text-sm text-text-secondary">
            一个完整的自动化场景：Agent 每天早上自动收集信息、汇总晨报、推送到你的 Telegram。
          </p>
          <CodeBlock code={telegramExample} lang="bash" title="每日晨报" />
        </FoldPanel>

        <FoldPanel title="Webhook 触发器" badge="进阶">
          <p className="mb-3 text-sm text-text-secondary">
            除了定时触发，Hermes 还支持 Webhook——外部系统（如 GitHub、监控告警）
            发送 HTTP 请求就能触发 Agent 执行任务。
          </p>
          <CodeBlock code={webhookExample} lang="yaml" title="Webhook 配置" />
        </FoldPanel>
      </div>

      {/* Tip */}
      <div className="mt-6 rounded-lg border border-accent/30 bg-accent/5 p-4">
        <p className="text-sm text-text-secondary">
          <strong className="text-accent">Tip：</strong>
          定时任务的每次执行都会创建独立的 session，你可以通过{" "}
          <code>hermes session list</code> 查看历史执行记录，
          通过 <code>hermes cron logs</code> 查看执行日志和输出。
          如果任务失败，Agent 会在日志中记录错误原因。
        </p>
      </div>
    </Section>
  );
}
