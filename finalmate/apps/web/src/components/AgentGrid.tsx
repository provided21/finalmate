const agents = [
  { icon: '📄', name: '资料解析 Agent', desc: '把 PPT、笔记、作业、往年卷拆成结构化知识点。' },
  { icon: '🎯', name: '考点分析 Agent', desc: '统计历年题型、分值、出现频率，生成复习优先级。' },
  { icon: '🧠', name: '人类化讲解 Agent', desc: '用例子、类比、步骤拆解讲懂原理，而不是复述定义。' },
  { icon: '💡', name: '记忆方法 Agent', desc: '按概念、公式、流程、简答题定制不同记忆策略。' }
];

export function AgentGrid() {
  return (
    <section className="agent-grid">
      {agents.map((agent) => (
        <article className="agent-card" key={agent.name}>
          <div className="agent-icon">{agent.icon}</div>
          <h3>{agent.name}</h3>
          <p>{agent.desc}</p>
        </article>
      ))}
    </section>
  );
}
