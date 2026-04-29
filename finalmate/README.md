# FinalMate 期末冲刺助手

FinalMate 是一个面向大学生期末应试的 AI 学习 Agent 原型项目。它不是普通网课播放器，也不是单纯问答机器人，而是把「资料解析 → 往年卷考点分析 → 人类化讲解 → 阶段性主动推进 → 思维导图 → 记忆方法 → 出题批改 → 错题强化」做成一个完整复习闭环。

本压缩包是一个可运行的完整项目文件夹，包含：

- `apps/web`：React + TypeScript 前端页面
- `services/api`：Fastify + TypeScript Mock API 服务
- `packages/shared`：前后端共享类型
- `docs`：产品说明、系统架构、Agent 设计、Token 预算
- `infra`：本地 Docker Compose 示例

> 当前版本默认使用 Mock 数据，不需要真实大模型 API key。后续可以把 `services/api/src/agents/llm.ts` 中的 `LLMAdapter` 替换成真实模型调用。

---

## 1. 快速启动

### 环境要求

- Node.js 20+
- npm 10+

### 安装依赖

```bash
npm install
```

### 同时启动前端和后端

```bash
npm run dev
```

默认地址：

- 前端：http://localhost:5173
- 后端：http://localhost:8787/api/health

### 只启动前端

```bash
npm run dev:web
```

### 只启动后端

```bash
npm run dev:api
```

---

## 2. 当前已实现功能

### 前端

- 课程资料上传模拟
- 往年卷考点热力图
- 按「考频 × 薄弱程度」排序的复习路径
- 人类化讲解卡片：是什么、为什么重要、怎么考、例子讲原理、失分点
- 阶段性主动推进：例如「继续学习 XXX 吗」「是否进入小测」「是否加入思维导图」
- 思维导图 / 思维链条可视化
- 快速创建个性化节点
- 记忆方法 Agent：口诀、类比、对比表、关键词骨架
- 自动出题与模拟批改
- 错题本和薄弱点提示
- Token 预算面板

### 后端

- 健康检查接口
- Demo 课程数据接口
- 资料上传模拟接口
- 往年卷分析接口
- 主动推进接口
- 讲解接口
- 记忆方法接口
- 出题接口
- 批改接口
- 思维导图节点接口

---

## 3. 推荐开发顺序

1. 先运行当前 Mock 版，确认页面和交互闭环。
2. 将 `services/api/src/data/mockCourse.ts` 替换为真实课程数据。
3. 接入 PDF / DOCX 解析模块，把上传文件切成知识片段。
4. 接入向量检索，用课程材料和往年卷作为 RAG 知识库。
5. 替换 `LLMAdapter`，接入真实模型。
6. 引入用户系统、课程空间、长期错题本和复习计划。

---

## 4. 项目目录

```text
finalmate/
  apps/
    web/                 React 前端
  services/
    api/                 Fastify 后端 Mock API
  packages/
    shared/              共享类型
  docs/                  产品与架构文档
  infra/                 本地基础设施示例
```

---

## 5. 设计目标

FinalMate 的核心不是「替学生看网课」，而是帮学生在期末时间很短的场景下快速进入有效复习：

- 少让用户想 Prompt
- 多让系统主动推进
- 讲解像真人老师
- 根据往年卷判断重点
- 用题目检测是否真的掌握
- 用可视化帮助学生建立自己的知识结构
- 针对不同知识点给不同记忆方法

