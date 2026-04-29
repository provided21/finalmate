import { demoCourse, paperDistributions } from '../data/mockCourse.js';

export function analyzePastPapers() {
  const unitScores = demoCourse.units.map((unit) => {
    const weights = paperDistributions.map((paper) => paper.unitWeights[unit.id] ?? 0);
    const average = Math.round(weights.reduce((a, b) => a + b, 0) / Math.max(weights.length, 1));
    const trend = weights[weights.length - 1] - weights[0];
    return {
      unitId: unit.id,
      title: unit.title,
      averageWeight: average,
      originalWeight: unit.examWeight,
      trend,
      suggestion:
        unit.examWeight >= 85
          ? '优先复习，适合先讲概念再做综合题。'
          : unit.mastery < 40
          ? '掌握度偏低，建议做专项强化。'
          : '保持复习，配合小测巩固。'
    };
  });

  return {
    courseId: demoCourse.id,
    papers: paperDistributions,
    unitScores,
    summary: '往年卷显示 ERD、事件列表、银行系统建模出现频率较高，适合优先复习。'
  };
}
