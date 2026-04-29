interface HeaderProps {
  apiStatus: 'checking' | 'online' | 'offline';
  onRefresh: () => void;
}

export function Header({ apiStatus, onRefresh }: HeaderProps) {
  return (
    <header className="app-header">
      <div>
        <div className="eyebrow">🎓 AI 期末私教 · FinalMate</div>
        <h1>比网课更高效的大学生期末应试 Agent</h1>
        <p>
          自动解析课程资料与往年卷，识别重点分布，用人类能听懂的方式讲原理，阶段性主动推进复习，并生成思维导图、记忆方法、练习题与批改反馈。
        </p>
      </div>
      <div className="header-actions">
        <span className={`status ${apiStatus}`}>{apiStatus === 'online' ? 'API 在线' : apiStatus === 'offline' ? '离线 Mock' : '检测中'}</span>
        <button className="primary" onClick={onRefresh}>重新分析</button>
      </div>
    </header>
  );
}
