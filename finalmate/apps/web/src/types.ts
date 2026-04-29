export type KnowledgeType = 'concept' | 'formula' | 'process' | 'case' | 'mixed';

export interface MemoryMethod {
  name: string;
  content: string;
  appliesTo: KnowledgeType[];
}

export interface QuizItem {
  id: string;
  type: '选择题' | '填空题' | '简答题' | '计算题' | '案例题' | '判断题';
  question: string;
  answer: string;
  keywords: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface KnowledgeUnit {
  id: string;
  title: string;
  chapter: string;
  examWeight: number;
  mastery: number;
  status: 'todo' | 'learning' | 'done';
  type: string;
  tags: string[];
  summary: string;
  why: string;
  humanExplain: string;
  example: string;
  mistakes: string[];
  memoryMethods: MemoryMethod[];
  quiz: QuizItem[];
}

export interface Course {
  id: string;
  title: string;
  semester: string;
  examDate: string;
  teacher: string;
  units: KnowledgeUnit[];
}

export interface PaperDistribution {
  year: string;
  unitWeights: Record<string, number>;
}

export interface GradeResult {
  score: number;
  hitKeywords: string[];
  missingKeywords: string[];
  feedback: string;
  nextAction: string;
}
