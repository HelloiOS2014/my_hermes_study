export interface ToolCategory { name: string; icon: string; tools: { name: string; description: string }[]; }

export const toolCategories: ToolCategory[] = [
  { name: "终端", icon: "⌨️", tools: [{ name: "terminal", description: "执行 shell 命令（支持 6 种后端）" }, { name: "process", description: "管理后台进程" }] },
  { name: "文件", icon: "📁", tools: [{ name: "read_file", description: "读取文件内容" }, { name: "write_file", description: "写入文件" }, { name: "patch", description: "精确修改代码段" }, { name: "search_files", description: "搜索文件内容" }] },
  { name: "Web 搜索", icon: "🔍", tools: [{ name: "web_search", description: "网页搜索" }, { name: "web_extract", description: "提取网页内容" }] },
  { name: "浏览器", icon: "🌐", tools: [{ name: "browser_navigate", description: "导航到 URL" }, { name: "browser_snapshot", description: "截取页面快照" }, { name: "browser_click", description: "点击元素" }, { name: "browser_type", description: "输入文本" }] },
  { name: "视觉/多模态", icon: "👁", tools: [{ name: "vision_analyze", description: "分析图片" }, { name: "image_generate", description: "生成图片" }, { name: "text_to_speech", description: "文本转语音" }] },
  { name: "记忆", icon: "🧠", tools: [{ name: "memory", description: "读写持久化笔记" }, { name: "session_search", description: "搜索历史对话" }] },
  { name: "Skills", icon: "📚", tools: [{ name: "skills_list", description: "列出 Skills 元数据" }, { name: "skill_view", description: "查看 Skill 内容" }, { name: "skill_manage", description: "管理 Skills" }] },
  { name: "协作", icon: "🤝", tools: [{ name: "delegate_task", description: "生成子 Agent" }, { name: "execute_code", description: "编程式工具调用" }, { name: "mixture_of_agents", description: "多模型推理" }] },
  { name: "系统", icon: "🏠", tools: [{ name: "todo", description: "任务规划" }, { name: "clarify", description: "向用户提问" }, { name: "send_message", description: "跨平台发消息" }, { name: "cronjob", description: "定时任务" }] },
  { name: "Home Assistant", icon: "🏡", tools: [{ name: "ha_list_entities", description: "列出设备" }, { name: "ha_get_state", description: "查询状态" }, { name: "ha_call_service", description: "控制设备" }] },
];
