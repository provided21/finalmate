import type { KnowledgeUnit } from '../types';

interface Props {
  units: KnowledgeUnit[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function StudyRoadmap({ units, activeId, onSelect }: Props) {
  return (
    <section className="panel">
      <div className="panel-title">
        <div>
          <h2>复习路径</h2>
          <p>按考试重要程度与掌握度动态排序</p>
        </div>
        <span>🗺️</span>
      </div>
      <div className="roadmap-list">
        {units.map((unit, index) => (
          <button className={`roadmap-item ${activeId === unit.id ? 'active' : ''}`} key={unit.id} onClick={() => onSelect(unit.id)}>
            <div className="roadmap-top">
              <div>
                <span className="step">STEP {index + 1}</span>
                <strong>{unit.title}</strong>
              </div>
              <span>›</span>
            </div>
            <div className="progress"><span style={{ width: `${unit.mastery}%` }} /></div>
            <div className="meta-row"><span>掌握度 {unit.mastery}%</span><span>考频 {unit.examWeight}%</span></div>
          </button>
        ))}
      </div>
    </section>
  );
}
