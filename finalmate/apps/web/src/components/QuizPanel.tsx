import { useState } from 'react';
import type { GradeResult, KnowledgeUnit } from '../types';

interface Props {
  unit: KnowledgeUnit;
  onWrong: (label: string) => void;
}

export function QuizPanel({ unit, onWrong }: Props) {
  const [selected, setSelected] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<GradeResult | null>(null);
  const quiz = unit.quiz[selected] ?? unit.quiz[0];

  function grade() {
    const hitKeywords = quiz.keywords.filter((keyword) => answer.includes(keyword));
    const missingKeywords = quiz.keywords.filter((keyword) => !answer.includes(keyword));
    const base = answer.trim().length === 0 ? 0 : Math.round((hitKeywords.length / Math.max(quiz.keywords.length, 1)) * 100);
    const score = answer.trim().length === 0 ? 0 : Math.min(96, Math.max(35, base));
    const result: GradeResult = {
      score,
      hitKeywords,
      missingKeywords,
      feedback: score >= 75 ? '回答方向正确，可以继续补充关键词和完整表述。' : '当前答案覆盖不足，建议先抓住标准答案中的核心关键词，再分点展开。',
      nextAction: missingKeywords.length ? `建议补充：${missingKeywords.slice(0, 3).join('、')}` : '进入同类题变式训练。'
    };
    setFeedback(result);
    if (score < 75) onWrong(unit.title);
  }

  return (
    <section className="panel quiz-panel" id="quiz-panel">
      <div className="panel-title">
        <div>
          <h2>出题与批改 Agent</h2>
          <p>根据当前考点自动出题、评分、指出失分点</p>
        </div>
        <span>✅</span>
      </div>

      <div className="quiz-tabs">
        {unit.quiz.map((item, index) => (
          <button className={selected === index ? 'active' : ''} key={item.id} onClick={() => { setSelected(index); setAnswer(''); setFeedback(null); }}>
            {item.type}
          </button>
        ))}
      </div>

      <div className="question-box">
        <span>题目</span>
        <strong>{quiz.question}</strong>
      </div>

      <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="在这里输入你的答案，系统会模拟批改并指出失分点……" />

      <div className="button-row">
        <button className="primary" onClick={grade}>提交批改</button>
        <button className="ghost" onClick={() => setFeedback({ score: 100, hitKeywords: quiz.keywords, missingKeywords: [], feedback: `参考答案：${quiz.answer}`, nextAction: '看完参考答案后，建议自己关掉答案再复述一遍。' })}>查看参考答案</button>
      </div>

      {feedback && (
        <div className="feedback">
          <div><strong>{feedback.score}</strong><span>模拟得分 / 100</span></div>
          <p>{feedback.feedback}</p>
          <p>{feedback.nextAction}</p>
          {feedback.missingKeywords.length > 0 && <small>缺失关键词：{feedback.missingKeywords.join('、')}</small>}
        </div>
      )}
    </section>
  );
}
