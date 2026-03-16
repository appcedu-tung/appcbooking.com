import PageCard from '../components/PageCard';
import { learningStorage } from '../services/storage';

function RecordsPage() {
  const practiceCount = learningStorage.getPracticeCount();
  const mockScores = learningStorage.getMockScores();
  const wrongWords = learningStorage.getWrongWords();

  return (
    <div className="space-y-6">
      <PageCard title="學習紀錄總覽">
        <ul className="space-y-2 text-slate-700">
          <li>自由練習作答次數：{practiceCount}</li>
          <li>模擬測驗完成次數：{mockScores.length}</li>
          <li>目前錯題數：{wrongWords.length}</li>
        </ul>
      </PageCard>

      <PageCard title="近期模擬測驗分數">
        {mockScores.length === 0 ? (
          <p className="text-slate-500">尚無測驗紀錄。</p>
        ) : (
          <ul className="space-y-2">
            {mockScores.map((record, idx) => (
              <li key={`${record.date}-${idx}`} className="rounded-lg bg-slate-100 p-3">
                <p>分數：{record.score} / 100（正確率 {record.accuracy}%）</p>
                <p className="text-sm text-slate-500">{new Date(record.date).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </PageCard>
    </div>
  );
}

export default RecordsPage;
