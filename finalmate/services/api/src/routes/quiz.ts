import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { generateQuiz, gradeAnswer } from '../agents/quizAgent.js';

const QuizSchema = z.object({ unitId: z.string() });
const GradeSchema = z.object({ quizId: z.string(), answer: z.string() });

export async function quizRoutes(app: FastifyInstance) {
  app.post('/quiz/generate', async (request, reply) => {
    const parsed = QuizSchema.safeParse(request.body);
    if (!parsed.success) return reply.status(400).send({ error: 'unitId is required' });
    return generateQuiz(parsed.data.unitId);
  });

  app.post('/grade', async (request, reply) => {
    const parsed = GradeSchema.safeParse(request.body);
    if (!parsed.success) return reply.status(400).send({ error: 'quizId and answer are required' });
    return gradeAnswer(parsed.data.quizId, parsed.data.answer);
  });
}
