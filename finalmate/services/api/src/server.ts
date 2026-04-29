import Fastify from 'fastify';
import cors from '@fastify/cors';
import { courseRoutes } from './routes/course.js';
import { agentRoutes } from './routes/agent.js';
import { quizRoutes } from './routes/quiz.js';
import { mindmapRoutes } from './routes/mindmap.js';

const app = Fastify({ logger: true });
const port = Number(process.env.PORT ?? 8787);
const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

await app.register(cors, { origin: corsOrigin });

app.get('/api/health', async () => ({
  ok: true,
  name: 'FinalMate API',
  mode: process.env.AI_PROVIDER ?? 'mock',
  time: new Date().toISOString()
}));

await app.register(courseRoutes, { prefix: '/api' });
await app.register(agentRoutes, { prefix: '/api' });
await app.register(quizRoutes, { prefix: '/api' });
await app.register(mindmapRoutes, { prefix: '/api' });

try {
  await app.listen({ port, host: '0.0.0.0' });
  app.log.info(`FinalMate API running at http://localhost:${port}/api/health`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
