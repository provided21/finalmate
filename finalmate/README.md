# FinalMate — AI-Powered Exam Prep Assistant

FinalMate is an AI study agent prototype designed for university students preparing for final exams. It's not a passive video player or a simple Q&A bot. Instead, it weaves a complete review loop: **material ingestion → past-exam trend analysis → human-like explanations → proactive stage-by-stage nudging → mind mapping → memory techniques → auto-generated quizzes with grading → personalized weak-spot drills**.

This is a runnable monorepo containing:

- `apps/web` — React + TypeScript frontend
- `services/api` — Fastify + TypeScript mock API server
- `packages/shared` — shared types between frontend and backend
- `docs` — product requirements, architecture, agent design, token budget
- `infra` — local Docker Compose example

> The current version uses mock data by default — no real LLM API key required. To go live, swap out `LLMAdapter` in `services/api/src/agents/llm.ts` with a real model call.

---

## 1. Quick Start

### Prerequisites

- Node.js 20+
- npm 10+

### Install dependencies

```bash
npm install
```

### Start both frontend and backend

```bash
npm run dev
```

Default URLs:

- Frontend: http://localhost:5173
- Backend health check: http://localhost:8787/api/health

### Frontend only

```bash
npm run dev:web
```

### Backend only

```bash
npm run dev:api
```

---

## 2. Current Features

### Frontend

- Simulated course material upload
- Past-exam topic heatmap
- Study roadmap ranked by **exam frequency × weakness level**
- Human-like explanation cards: what it is, why it matters, how it's tested, principle-by-example walkthroughs, common pitfalls
- Proactive coaching nudges: e.g. "Continue with XXX?", "Ready for a quiz?", "Add to mind map?"
- Mind map / reasoning chain visualization
- Quick custom node creation
- Memory technique agents: mnemonics, analogies, comparison tables, keyword skeletons
- Auto-generated quizzes with simulated grading
- Mistake notebook and weak-point alerts
- Token budget panel

### Backend

- Health check endpoint
- Demo course data endpoint
- Simulated material upload endpoint
- Past-exam analysis endpoint
- Proactive coaching endpoint
- Explanation endpoint
- Memory technique endpoint
- Quiz generation endpoint
- Grading endpoint
- Mind map node CRUD endpoints

---

## 3. Recommended Development Roadmap

1. Run the current mock version to verify the full interaction loop.
2. Replace `services/api/src/data/mockCourse.ts` with real course data.
3. Add PDF/DOCX parsing to chunk uploaded files into knowledge fragments.
4. Integrate vector retrieval for RAG over course materials and past exams.
5. Replace `LLMAdapter` with a real model provider.
6. Add user accounts, course spaces, persistent mistake logs, and long-term study plans.

---

## 4. Project Structure

```text
finalmate/
  apps/
    web/                 React frontend
  services/
    api/                 Fastify mock API server
  packages/
    shared/              Shared TypeScript types
  docs/                  Product & architecture docs
  infra/                 Local infrastructure examples
```

---

## 5. Design Philosophy

FinalMate is not about "watching lectures for you." It's about helping students get into effective review mode fast when the exam clock is ticking:

- Minimize prompt engineering — the system drives the conversation
- Explanations that feel like a real tutor, not a wiki page
- Past-exam data drives prioritization
- Quizzes verify real understanding, not just passive reading
- Visualizations help students build their own mental models
- Different memory techniques for different types of knowledge
