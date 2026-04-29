import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

const NodeSchema = z.object({ label: z.string().min(1), group: z.string().optional() });

export async function mindmapRoutes(app: FastifyInstance) {
  app.get('/mindmap/demo', async () => {
    return {
      nodes: [
        { id: 'root', label: '系统分析与设计', group: 'concept' },
        { id: 'erd', label: 'ERD', group: 'exam' },
        { id: 'events', label: '事件列表', group: 'exam' },
        { id: 'memory', label: '记忆方法', group: 'memory' }
      ],
      edges: [
        ['root', 'erd'],
        ['root', 'events'],
        ['root', 'memory']
      ]
    };
  });

  app.post('/mindmap/node', async (request, reply) => {
    const parsed = NodeSchema.safeParse(request.body);
    if (!parsed.success) return reply.status(400).send({ error: 'label is required' });
    return {
      node: {
        id: `custom-${Date.now()}`,
        label: parsed.data.label,
        group: parsed.data.group ?? 'custom'
      }
    };
  });
}
