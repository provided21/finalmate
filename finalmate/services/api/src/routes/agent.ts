import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { analyzePastPapers } from '../agents/examAgent.js';
import { explainUnit } from '../agents/explainAgent.js';
import { getMemoryMethods } from '../agents/memoryAgent.js';
import { nextStep } from '../agents/progressAgent.js';

const UnitSchema = z.object({ unitId: z.string() });

export async function agentRoutes(app: FastifyInstance) {
  app.post('/analyze/papers', async () => analyzePastPapers());

  app.post('/agents/explain', async (request, reply) => {
    const parsed = UnitSchema.safeParse(request.body);
    if (!parsed.success) return reply.status(400).send({ error: 'unitId is required' });
    return explainUnit(parsed.data.unitId);
  });

  app.post('/agents/memory', async (request, reply) => {
    const parsed = UnitSchema.safeParse(request.body);
    if (!parsed.success) return reply.status(400).send({ error: 'unitId is required' });
    return getMemoryMethods(parsed.data.unitId);
  });

  app.post('/study/next', async (request, reply) => {
    const parsed = UnitSchema.safeParse(request.body);
    if (!parsed.success) return reply.status(400).send({ error: 'unitId is required' });
    return nextStep(parsed.data.unitId);
  });
}
