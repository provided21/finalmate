import { demoCourse } from '../data/mockCourse.js';
import type { GradeResult } from '../types.js';

export function generateQuiz(unitId: string) {
  const unit = demoCourse.units.find((item) => item.id === unitId) ?? demoCourse.units[0];
  return {
    unitId: unit.id,
    title: unit.title,
    quiz: unit.quiz
  };
}

export function gradeAnswer(quizId: string, answer: string): GradeResult {
  const allQuiz = demoCourse.units.flatMap((unit) => unit.quiz);
  const quiz = allQuiz.find((item) => item.id === quizId) ?? allQuiz[0];
  const normalized = answer.trim();
  const hitKeywords = quiz.keywords.filter((keyword) => normalized.includes(keyword));
  const missingKeywords = quiz.keywords.filter((keyword) => !normalized.includes(keyword));
  const base = normalized.length === 0 ? 0 : Math.round((hitKeywords.length / Math.max(quiz.keywords.length, 1)) * 100);
  const score = normalized.length === 0 ? 0 : Math.min(96, Math.max(35, base));

  return {
    score,
    hitKeywords,
    missingKeywords,
    feedback:
      score >= 75
        ? '回答方向正确，建议继续补充关键词并分点展开，考试中可以拿到较高分。'
        : '当前答案覆盖不足，建议先抓住标准答案中的核心关键词，再用“原因 + 例子 + 结论”补完整。',
    nextAction:
      missingKeywords.length > 0
        ? `下一步建议补充：${missingKeywords.slice(0, 3).join('、')}。`
        : '下一步可以进入同类题变式训练。'
  };
}
