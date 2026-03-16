import { useMemo, useState } from 'react';
import PageCard from '../components/PageCard';
import { WORDS } from '../data/words';
import { playWordAudio } from '../services/audio';
import { learningStorage } from '../services/storage';
import { createMockSet } from '../utils/wordUtils';

function MockTestPage() {
  const [questions, setQuestions] = useState(() => createMockSet(WORDS, 10));
  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[index];

  const result = useMemo(() => {
    if (!finished) return null;

    let correct = 0;
    const wrongItems = [];

    questions.forEach((q) => {
      const input = (answers[q.id] || '').trim().toLowerCase();
      if (input === q.word.toLowerCase()) {
        correct += 1;
      } else {
        wrongItems.push(q);
        learningStorage.addWrongWord(q.id);
      }
    });

    const score = correct * 10;
    const accuracy = Math.round((correct / questions.length) * 100);
    learningStorage.addMockScore({ score, accuracy, date: new Date().toISOString() });

    return { score, accuracy, wrongItems };
  }, [finished, answers, questions]);

  const finishTest = () => setFinished(true);

  const resetTest = () => {
    setQuestions(createMockSet(WORDS, 10));
    setAnswers({});
    setIndex(0);
    setFinished(false);
  };

  if (finished && result) {
    return (
      <PageCard title="模擬測驗結果">
        <div className="space-y-4">
          <p className="text-lg font-semibold">總分：{result.score} / 100</p>
          <p className="text-slate-600">正確率：{result.accuracy}%</p>
          <div>
            <h3 className="mb-2 font-semibold">錯題清單</h3>
            {result.wrongItems.length === 0 ? (
              <p className="text-emerald-600">全對！太厲害了 🎉</p>
            ) : (
              <ul className="list-inside list-disc space-y-1 text-slate-700">
                {result.wrongItems.map((item) => (
                  <li key={item.id}>
                    {item.word}（{item.meaning_zh}）
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="button" onClick={resetTest} className="rounded-lg bg-brand px-4 py-2 font-medium text-white">
            再測一次
          </button>
        </div>
      </PageCard>
    );
  }

  return (
    <PageCard title="模擬測驗模式（10 題）">
      <div className="space-y-4">
        <p className="text-slate-600">第 {index + 1} / {questions.length} 題</p>
        <button
          type="button"
          onClick={() => playWordAudio(current.word, current.audio_url)}
          className="rounded-lg bg-brand px-4 py-2 font-medium text-white"
        >
          🔊 播放音訊
        </button>
        <input
          value={answers[current.id] || ''}
          onChange={(e) => setAnswers((prev) => ({ ...prev, [current.id]: e.target.value }))}
          placeholder="輸入你聽到的單字"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
            disabled={index === 0}
            className="rounded-lg bg-slate-200 px-4 py-2 font-medium disabled:opacity-40"
          >
            上一題
          </button>
          {index < questions.length - 1 ? (
            <button
              type="button"
              onClick={() => setIndex((prev) => Math.min(prev + 1, questions.length - 1))}
              className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white"
            >
              下一題
            </button>
          ) : (
            <button type="button" onClick={finishTest} className="rounded-lg bg-rose-600 px-4 py-2 font-medium text-white">
              交卷
            </button>
          )}
        </div>
      </div>
    </PageCard>
  );
}

export default MockTestPage;
