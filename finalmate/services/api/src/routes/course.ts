import type { FastifyInstance } from 'fastify';
import { demoCourse, paperDistributions } from '../data/mockCourse.js';
import { getSortedStudyPath } from '../agents/progressAgent.js';

export async function courseRoutes(app: FastifyInstance) {
  app.get('/course/demo', async () => {
    return { course: demoCourse, papers: paperDistributions, studyPath: getSortedStudyPath() };
  });

  app.post('/files/mock-upload', async (request) => {
    const body = request.body as { filenames?: string[] };
    const filenames = body?.filenames?.length ? body.filenames : ['系统分析PPT.pdf', '2021-2024往年卷.pdf'];
    return {
      ok: true,
      files: filenames.map((name, index) => ({ id: `file-${index + 1}`, name, status: 'parsed' })),
      message: '资料已模拟上传并进入解析队列。'
    };
  });
}
