import { useEffect, useMemo, useState } from 'react';
import { AgentGrid } from './components/AgentGrid';
import { Header } from './components/Header';
import { HeatmapCard } from './components/HeatmapCard';
import { LessonView } from './components/LessonView';
import { MindMap } from './components/MindMap';
import { ProactiveCoach } from './components/ProactiveCoach';
import { QuizPanel } from './components/QuizPanel';
import { StudyRoadmap } from './components/StudyRoadmap';
import { TokenPanel } from './components/TokenPanel';
import { UploadPanel } from './components/UploadPanel';
import { mockCourse, mockPapers } from './data/mock';
import { apiGet } from './lib/api';
import type { Course, PaperDistribution } from './types';

function sortUnits(course: Course) {
  return [...course.units].sort((a, b) => {
    const scoreA = a.examWeight * 0.65 + (100 - a.mastery) * 0.35;
    const scoreB = b.examWeight * 0.65 + (100 - b.mastery) * 0.35;
    return scoreB - scoreA;
  });
}

export default function App() {
  const [course, setCourse] = useState<Course>(mockCourse);
  const [papers, setPapers] = useState<PaperDistribution[]>(mockPapers);
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [activeId, setActiveId] = useState('erd');
  const [files, setFiles] = useState(['系统分析PPT.pdf', '2021-2024往年卷.pdf']);
  const [customNodes, setCustomNodes] = useState(['考试重点', '易错点']);
  const [nodeInput, setNodeInput] = useState('');

  const sortedUnits = useMemo(() => sortUnits(course), [course]);
  const activeUnit = course.units.find((unit) => unit.id === activeId) ?? course.units[0];

  async function loadCourse() {
    setApiStatus('checking');
    try {
      const data = await apiGet<{ course: Course; papers: PaperDistribution[] }>('/course/demo');
      setCourse(data.course);
      setPapers(data.papers);
      setApiStatus('online');
    } catch {
      setCourse(mockCourse);
      setPapers(mockPapers);
      setApiStatus('offline');
    }
  }

  useEffect(() => {
    loadCourse();
  }, []);

  function goNext() {
    const index = sortedUnits.findIndex((unit) => unit.id === activeId);
    const next = sortedUnits[(Math.max(index, 0) + 1) % sortedUnits.length];
    setActiveId(next.id);
  }

  function addNode(label: string) {
    const clean = label.trim();
    if (!clean) return;
    setCustomNodes((prev) => [...new Set([...prev, clean])].slice(-10));
    setNodeInput('');
  }

  function uploadMock() {
    const pool = ['老师划重点.docx', '2022-2024往年卷.pdf', '课堂笔记.md', '作业与实验报告.pdf'];
    const next = pool.find((name) => !files.includes(name));
    setFiles(next ? [...files, next] : [...files, `补充资料-${files.length + 1}.pdf`]);
  }

  function startQuiz() {
    document.getElementById('quiz-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="app-shell">
      <Header apiStatus={apiStatus} onRefresh={loadCourse} />
      <main className="layout">
        <aside className="left-column">
          <UploadPanel files={files} onUpload={uploadMock} />
          <StudyRoadmap units={sortedUnits} activeId={activeId} onSelect={setActiveId} />
        </aside>

        <section className="main-column">
          <AgentGrid />
          <LessonView unit={activeUnit} />
          <QuizPanel unit={activeUnit} onWrong={(label) => addNode(`错题：${label}`)} />
          <TokenPanel />
        </section>

        <aside className="right-column">
          <HeatmapCard units={sortedUnits} papers={papers} />
          <ProactiveCoach activeUnit={activeUnit} onNext={goNext} onAddToMap={addNode} onStartQuiz={startQuiz} />
          <MindMap activeUnit={activeUnit} customNodes={customNodes} input={nodeInput} onInput={setNodeInput} onAdd={addNode} />
        </aside>
      </main>
    </div>
  );
}
