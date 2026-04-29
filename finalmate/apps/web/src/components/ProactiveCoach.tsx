import type { KnowledgeUnit } from '../types';

interface Props {
  activeUnit: KnowledgeUnit;
  onNext: () => void;
  onAddToMap: (label: string) => void;
  onStartQuiz: () => void;
}

export function ProactiveCoach({ activeUnit, onNext, onAddToMap, onStartQuiz }: Props) {
  const prompts = [
    { text: `继续学习「${activeUnit.title}」的下一层内容吗？`, action: onNext },
    { text: '要不要我用一道例题带你推一遍？', action: () => onAddToMap('例题推导') },
    { text: '现在进入 3 道小测，检测是否真的掌握？', action: onStartQuiz },
    { text: '是否把这个知识点加入你的思维导图？', action: () => onAddToMap(activeUnit.title) },
    { text: '这部分如果没懂，我可以换一种更生活化的讲法。', action: () => onAddToMap('生活化类比') }
  ];

  return (
    <section className="panel">
      <div className="panel-title">
        <div>
          <h2>阶段性主动推进</h2>
          <p>减少用户思考 Prompt 的成本，让系统带着学</p>
        </div>
        <span>▶️</span>
      </div>
      <div className="prompt-list">
        {prompts.map((prompt) => (
          <button key={prompt.text} onClick={prompt.action}>{prompt.text}<span>›</span></button>
        ))}
      </div>
    </section>
  );
}
