import type { KnowledgeUnit } from '../types';

interface Props {
  unit: KnowledgeUnit;
}

export function LessonView({ unit }: Props) {
  return (
    <section className="lesson-card">
      <div className="lesson-head">
        <div>
          <div className="tag-row">{unit.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
          <h2>{unit.title}</h2>
          <p>{unit.chapter} · {unit.type}</p>
        </div>
        <div className="score-box"><strong>{unit.mastery}%</strong><span>掌握度</span></div>
      </div>

      <div className="two-col">
        <InfoBox icon="📘" title="这是什么" text={unit.summary} />
        <InfoBox icon="🎯" title="为什么重要" text={unit.why} />
      </div>

      <InfoBox icon="💬" title="像真人老师一样讲懂" text={unit.humanExplain} border />
      <InfoBox icon="✨" title="举例讲原理" text={unit.example} border />

      <div className="two-col">
        <div className="warn-box">
          <h3>常见失分点</h3>
          <ul>{unit.mistakes.map((m) => <li key={m}>{m}</li>)}</ul>
        </div>
        <div className="memory-box">
          <h3>记忆方法 Agent</h3>
          {unit.memoryMethods.map((method) => (
            <div className="memory-item" key={method.name}>
              <strong>{method.name}</strong>
              <p>{method.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoBox({ icon, title, text, border }: { icon: string; title: string; text: string; border?: boolean }) {
  return (
    <article className={`info-box ${border ? 'border' : ''}`}>
      <h3>{icon} {title}</h3>
      <p>{text}</p>
    </article>
  );
}
