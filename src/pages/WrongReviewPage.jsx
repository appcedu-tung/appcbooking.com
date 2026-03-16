import { useMemo, useState } from 'react';
import PageCard from '../components/PageCard';
import { WORDS } from '../data/words';
import { playWordAudio } from '../services/audio';
import { learningStorage } from '../services/storage';

function WrongReviewPage() {
  const [wrongIds, setWrongIds] = useState(() => learningStorage.getWrongWords());
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [index, setIndex] = useState(0);

  const wrongWords = useMemo(() => WORDS.filter((w) => wrongIds.includes(w.id)), [wrongIds]);
  const current = wrongWords[index];

  const check = () => {
    if (!current) return;
    const ok = answer.trim().toLowerCase() === current.word.toLowerCase();
    setFeedback(ok ? 'correct' : 'wrong');
    if (ok) {
      const next = learningStorage.removeWrongWord(current.id);
      setWrongIds(next);
      setIndex(0);
      setAnswer('');
    }
  };

  if (!current) {
    return (
      <PageCard title="錯題複習">
        <p className="text-emerald-700">目前沒有錯題，繼續保持！</p>
      </PageCard>
    );
  }

  return (
    <PageCard title="錯題複習">
      <div className="space-y-4">
        <p className="text-slate-600">剩餘 {wrongWords.length} 題錯題</p>
        <button
          type="button"
          onClick={() => playWordAudio(current.word, current.audio_url)}
          className="rounded-lg bg-brand px-4 py-2 font-medium text-white"
        >
          🔊 播放音訊
        </button>
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="請輸入單字"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand"
        />
        <div className="flex gap-2">
          <button type="button" onClick={check} className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white">
            檢查答案
          </button>
          <button
            type="button"
            onClick={() => {
              setIndex((prev) => (prev + 1) % wrongWords.length);
              setAnswer('');
              setFeedback('');
            }}
            className="rounded-lg bg-slate-200 px-4 py-2 font-medium"
          >
            下一題
          </button>
        </div>
        {feedback === 'wrong' && (
          <p className="rounded-lg bg-rose-50 p-3 text-rose-700">答錯，正解：{current.word}（{current.meaning_zh}）</p>
        )}
        {feedback === 'correct' && <p className="rounded-lg bg-emerald-50 p-3 text-emerald-700">答對，已從錯題移除！</p>}
      </div>
    </PageCard>
  );
}

export default WrongReviewPage;
