import { useEffect, useState } from 'react';
import PageCard from '../components/PageCard';
import { WORDS } from '../data/words';
import { playWordAudio } from '../services/audio';
import { learningStorage } from '../services/storage';
import { pickRandomWord } from '../utils/wordUtils';

function PracticePage() {
  const [currentWord, setCurrentWord] = useState(() => pickRandomWord(WORDS));
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    playWordAudio(currentWord.word, currentWord.audio_url);
  }, [currentWord]);

  const checkAnswer = () => {
    const isCorrect = answer.trim().toLowerCase() === currentWord.word.toLowerCase();
    setResult(isCorrect ? 'correct' : 'wrong');
    learningStorage.incrementPracticeCount();
    if (!isCorrect) {
      learningStorage.addWrongWord(currentWord.id);
    } else {
      learningStorage.removeWrongWord(currentWord.id);
    }
  };

  const nextQuestion = () => {
    setCurrentWord(pickRandomWord(WORDS));
    setAnswer('');
    setResult(null);
  };

  return (
    <PageCard title="自由練習模式">
      <div className="space-y-4">
        <p className="text-slate-600">請按播放後輸入你聽到的單字。</p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => playWordAudio(currentWord.word, currentWord.audio_url)}
            className="rounded-lg bg-brand px-4 py-2 font-medium text-white"
          >
            🔊 播放音訊
          </button>
          <button
            type="button"
            onClick={nextQuestion}
            className="rounded-lg bg-slate-200 px-4 py-2 font-medium"
          >
            下一題
          </button>
        </div>
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="輸入英文拼字"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand"
        />
        <button type="button" onClick={checkAnswer} className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white">
          提交答案
        </button>

        {result && (
          <div className={`rounded-lg p-3 ${result === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
            {result === 'correct' ? '答對了！' : `答錯了，正確答案是 ${currentWord.word}`}
            <p className="mt-1 text-sm">中文：{currentWord.meaning_zh}｜詞性：{currentWord.part_of_speech}</p>
          </div>
        )}
      </div>
    </PageCard>
  );
}

export default PracticePage;
