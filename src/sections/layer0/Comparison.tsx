import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { FlipCard } from "../../components/ui/FlipCard";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const frameworks = [
  {
    front: (
      <>
        <h4 className="font-semibold text-accent">LangGraph</h4>
        <p className="mt-2 text-sm text-text-secondary">
          \u7F16\u6392\u6846\u67B6 &mdash; \u72B6\u6001\u673A + \u6709\u5411\u56FE
        </p>
      </>
    ),
    back: (
      <>
        <h4 className="font-semibold text-accent">LangGraph</h4>
        <p className="mt-2 text-sm text-text-secondary">
          \u6700\u9002\u5408\u751F\u4EA7\u7EA7\u591A Agent \u72B6\u6001\u7BA1\u7406\u3002\u57FA\u4E8E\u6709\u5411\u56FE\u5B9A\u4E49\u5DE5\u4F5C\u6D41\uFF0C
          \u6BCF\u4E2A\u8282\u70B9\u662F\u4E00\u4E2A Agent \u6216\u5DE5\u5177\u8C03\u7528\uFF0C\u8FB9\u8868\u793A\u72B6\u6001\u8F6C\u79FB\u3002
          \u4F18\u52BF\u662F\u53EF\u89C6\u5316\u548C\u53EF\u63A7\u6027\u5F3A\uFF0C\u4F46\u5B66\u4E60\u66F2\u7EBF\u9661\u5CED\u3002
        </p>
      </>
    ),
  },
  {
    front: (
      <>
        <h4 className="font-semibold text-accent">CrewAI</h4>
        <p className="mt-2 text-sm text-text-secondary">
          \u56E2\u961F\u534F\u4F5C\u6846\u67B6 &mdash; \u89D2\u8272\u5206\u5DE5
        </p>
      </>
    ),
    back: (
      <>
        <h4 className="font-semibold text-accent">CrewAI</h4>
        <p className="mt-2 text-sm text-text-secondary">
          \u6700\u9002\u5408\u4E1A\u52A1\u6D41\u7A0B\u81EA\u52A8\u5316\u3002\u901A\u8FC7\u5B9A\u4E49\u89D2\u8272\uFF08Agent\uFF09\u3001\u4EFB\u52A1\uFF08Task\uFF09\u548C\u56E2\u961F\uFF08Crew\uFF09\uFF0C
          \u6A21\u62DF\u4EBA\u7C7B\u56E2\u961F\u534F\u4F5C\u3002\u4E0A\u624B\u7B80\u5355\uFF0C\u4F46\u590D\u6742\u573A\u666F\u7684\u53EF\u63A7\u6027\u6709\u9650\u3002
        </p>
      </>
    ),
  },
  {
    front: (
      <>
        <h4 className="font-semibold text-accent">AutoGen</h4>
        <p className="mt-2 text-sm text-text-secondary">
          \u5BF9\u8BDD\u5F0F\u591A Agent &mdash; \u8FA9\u8BBA\u51B3\u7B56
        </p>
      </>
    ),
    back: (
      <>
        <h4 className="font-semibold text-accent">AutoGen</h4>
        <p className="mt-2 text-sm text-text-secondary">
          \u6700\u9002\u5408\u591A\u6A21\u578B\u8BA8\u8BBA\u573A\u666F\u3002\u591A\u4E2A Agent \u901A\u8FC7\u5BF9\u8BDD\u534F\u4F5C\uFF0C
          \u652F\u6301\u4EBA\u7C7B\u4ECB\u5165\u548C\u4EE3\u7801\u6267\u884C\u3002\u7075\u6D3B\u6027\u6781\u9AD8\uFF0C\u4F46\u7F16\u6392\u590D\u6742\u5EA6\u4E5F\u9AD8\u3002
        </p>
      </>
    ),
  },
  {
    front: (
      <>
        <h4 className="font-semibold text-accent">Hermes Agent</h4>
        <p className="mt-2 text-sm text-text-secondary">
          \u4E2A\u4EBA\u6301\u4E45\u5316 Agent &mdash; \u81EA\u8FDB\u5316
        </p>
      </>
    ),
    back: (
      <>
        <h4 className="font-semibold text-accent">Hermes Agent</h4>
        <p className="mt-2 text-sm text-text-secondary">
          \u6700\u9002\u5408\u4E2A\u4EBA Agent + \u6301\u7EED\u5B66\u4E60\u3002\u901A\u8FC7 Memory \u8BB0\u4F4F\u4F60\u7684\u504F\u597D\uFF0C
          \u901A\u8FC7 Skills \u7CFB\u7EDF\u5B66\u4E60\u65B0\u80FD\u529B\uFF0C\u8DE8\u4F1A\u8BDD\u6301\u7EED\u6210\u957F\u3002
          \u5355 Agent \u67B6\u6784\u7B80\u5355\u76F4\u63A5\uFF0C\u4F46\u4E0D\u9002\u5408\u590D\u6742\u591A Agent \u534F\u4F5C\u3002
        </p>
      </>
    ),
  },
];

export function Comparison() {
  return (
    <Section id="comparison">
      <TypewriterTitle
        text="0.2 \u548C\u5176\u4ED6\u6846\u67B6\u6709\u4EC0\u4E48\u4E0D\u540C"
        subtitle="\u70B9\u51FB\u5361\u7247\u7FFB\u8F6C\u67E5\u770B\u8BE6\u60C5"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {frameworks.map((fw, i) => (
          <FlipCard key={i} front={fw.front} back={fw.back} />
        ))}
      </div>

      <ExtendedReading
        links={[
          {
            title: "AI Agent Frameworks Compared (2025)",
            url: "https://www.turingpost.com/p/ai-agent-frameworks-compared",
            source: "TuringPost",
          },
        ]}
      />
    </Section>
  );
}
