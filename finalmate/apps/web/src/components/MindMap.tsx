import type { KnowledgeUnit } from '../types';

interface Props {
  activeUnit: KnowledgeUnit;
  customNodes: string[];
  input: string;
  onInput: (value: string) => void;
  onAdd: (label: string) => void;
}

export function MindMap({ activeUnit, customNodes, input, onInput, onAdd }: Props) {
  const nodes = [
    { id: 'root', label: activeUnit.title, x: 50, y: 50, root: true },
    { id: 'concept', label: '概念', x: 20, y: 22 },
    { id: 'why', label: '原理', x: 80, y: 22 },
    { id: 'example', label: '例子', x: 18, y: 76 },
    { id: 'exam', label: '题型', x: 82, y: 76 },
    { id: 'memory', label: '记忆方法', x: 50, y: 88 },
    ...customNodes.map((label, index) => ({ id: `custom-${index}`, label, x: 25 + ((index * 18) % 50), y: 38 + ((index * 11) % 24), custom: true }))
  ];

  return (
    <section className="panel">
      <div className="panel-title">
        <div>
          <h2>我的思维链条 / 思维导图</h2>
          <p>把“概念—原理—例子—题型—记忆方法”串起来</p>
        </div>
        <span>🧩</span>
      </div>
      <div className="mindmap">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {nodes.filter((n) => n.id !== 'root').map((n) => (
            <line key={n.id} x1="50" y1="50" x2={n.x} y2={n.y} />
          ))}
        </svg>
        {nodes.map((node) => (
          <div key={node.id} className={`mind-node ${node.root ? 'root' : ''} ${node.custom ? 'custom' : ''}`} style={{ left: `${node.x}%`, top: `${node.y}%` }}>
            {node.label}
          </div>
        ))}
      </div>
      <div className="add-node">
        <input value={input} onChange={(e) => onInput(e.target.value)} placeholder="例如：多对多联系、成绩属性……" />
        <button onClick={() => onAdd(input)}>加入</button>
      </div>
    </section>
  );
}
