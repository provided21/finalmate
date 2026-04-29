interface UploadPanelProps {
  files: string[];
  onUpload: () => void;
}

export function UploadPanel({ files, onUpload }: UploadPanelProps) {
  return (
    <section className="panel dashed">
      <div className="panel-title">
        <div>
          <h2>课程资料入口</h2>
          <p>PPT、教材、笔记、作业、老师划重点、往年卷</p>
        </div>
        <span>⬆️</span>
      </div>
      <button className="primary full" onClick={onUpload}>模拟上传资料</button>
      <div className="file-list">
        {files.length === 0 ? (
          <div className="empty">还没有上传资料。上传后 Agent 会自动拆解重点。</div>
        ) : (
          files.map((file) => <div className="file-item" key={file}>📄 {file}</div>)
        )}
      </div>
    </section>
  );
}
