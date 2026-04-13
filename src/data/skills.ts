export interface SkillCategory { name: string; count: number; examples: string[]; }

export const skillCategories: SkillCategory[] = [
  { name: "software-development", count: 8, examples: ["git-workflow", "python-debug", "code-review"] },
  { name: "devops", count: 5, examples: ["docker-deploy", "ci-cd-setup", "log-analysis"] },
  { name: "research", count: 4, examples: ["paper-summary", "literature-review", "data-collection"] },
  { name: "data-science", count: 3, examples: ["pandas-analysis", "visualization", "ml-pipeline"] },
  { name: "creative", count: 4, examples: ["blog-writing", "story-generation", "image-prompt"] },
  { name: "github", count: 3, examples: ["pr-review", "issue-triage", "release-notes"] },
  { name: "mlops", count: 2, examples: ["model-evaluation", "training-pipeline"] },
  { name: "smart-home", count: 2, examples: ["scene-automation", "energy-monitoring"] },
];
