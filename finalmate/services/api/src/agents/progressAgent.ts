import { demoCourse } from '../data/mockCourse.js';

export function getSortedStudyPath() {
  return [...demoCourse.units].sort((a, b) => {
    const scoreA = a.examWeight * 0.65 + (100 - a.mastery) * 0.35;
    const scoreB = b.examWeight * 0.65 + (100 - b.mastery) * 0.35;
    return scoreB - scoreA;
  });
}

export function nextStep(unitId: string) {
  const path = getSortedStudyPath();
  const index = path.findIndex((unit) => unit.id === unitId);
  const current = index >= 0 ? path[index] : path[0];
  const next = path[(Math.max(index, 0) + 1) % path.length];

  return {
    current,
    next,
    prompts: [
      `继续学习「${current.title}」的下一层内容吗？`,
      '要不要我用一道例题带你推一遍？',
      '现在进入 3 道小测，检测是否真的掌握？',
      '是否把这个知识点加入你的思维导图？',
      '如果刚才没听懂，我可以换一种更生活化的讲法。'
    ]
  };
}
