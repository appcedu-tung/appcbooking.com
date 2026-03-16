import { Link } from 'react-router-dom';
import PageCard from '../components/PageCard';
import StatBox from '../components/StatBox';
import { useProgressSummary } from '../hooks/useProgressSummary';

function HomePage() {
  const summary = useProgressSummary();

  return (
    <div className="space-y-6">
      <PageCard title="TOEIC 常用字彙 1000 字聽音拼字英語學習軟體">
        <p className="mb-5 text-slate-600">以聽音拼字為核心，快速提升 TOEIC 字彙熟悉度。</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/practice" className="rounded-lg bg-brand px-4 py-2 font-medium text-white">
            進入自由練習
          </Link>
          <Link to="/mock-test" className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white">
            進入模擬測驗
          </Link>
        </div>
      </PageCard>

      <PageCard title="學習進度摘要">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatBox label="自由練習次數" value={summary.practiceCount} />
          <StatBox label="已完成測驗" value={summary.totalTests} />
          <StatBox label="最近測驗分數" value={summary.latestScore} />
          <StatBox label="錯題累積" value={summary.wrongCount} />
        </div>
      </PageCard>
    </div>
  );
}

export default HomePage;
