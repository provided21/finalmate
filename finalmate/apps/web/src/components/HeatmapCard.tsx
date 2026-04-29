import type { KnowledgeUnit, PaperDistribution } from '../types';

interface Props {
  units: KnowledgeUnit[];
  papers: PaperDistribution[];
}

export function HeatmapCard({ units, papers }: Props) {
  return (
    <section className="panel">
      <div className="panel-title">
        <div>
          <h2>往年卷考点热力图</h2>
          <p>根据历年题型、分值和出现频率估算优先级</p>
        </div>
        <span>🔥</span>
      </div>
      <div className="heat-list">
        {units.map((unit) => (
          <div key={unit.id} className="heat-row">
            <div className="meta-row"><strong>{unit.title}</strong><span>{unit.examWeight}%</span></div>
            <div className="heat-bar"><span style={{ width: `${unit.examWeight}%` }} /></div>
          </div>
        ))}
      </div>
      <div className="paper-grid">
        {papers.map((paper) => (
          <div className="paper-box" key={paper.year}>
            <strong>{paper.year}</strong>
            <span>样卷解析</span>
          </div>
        ))}
      </div>
    </section>
  );
}
