import { demoCourse } from '../data/mockCourse.js';

export function explainUnit(unitId: string) {
  const unit = demoCourse.units.find((item) => item.id === unitId) ?? demoCourse.units[0];
  return {
    unitId: unit.id,
    title: unit.title,
    structure: ['这是什么', '为什么重要', '考试怎么考', '用例子讲懂', '常见失分点', '下一步练习'],
    answer: `${unit.title} 可以先从“${unit.summary}”理解。考试中它重要，是因为：${unit.why} 你可以这样记：${unit.humanExplain} 例子：${unit.example}`,
    nextPrompt: `继续学习「${unit.title}」的典型题做法吗？`
  };
}
