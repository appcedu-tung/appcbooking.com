const KEYS = {
  practiceCount: 'toeic_practice_count',
  mockScores: 'toeic_mock_scores',
  wrongWords: 'toeic_wrong_words',
};

const getJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const learningStorage = {
  getPracticeCount: () => Number(localStorage.getItem(KEYS.practiceCount) || 0),
  incrementPracticeCount: () => {
    const next = learningStorage.getPracticeCount() + 1;
    localStorage.setItem(KEYS.practiceCount, String(next));
    return next;
  },
  getMockScores: () => getJSON(KEYS.mockScores, []),
  addMockScore: (scoreRecord) => {
    const records = learningStorage.getMockScores();
    const updated = [scoreRecord, ...records].slice(0, 20);
    localStorage.setItem(KEYS.mockScores, JSON.stringify(updated));
    return updated;
  },
  getWrongWords: () => getJSON(KEYS.wrongWords, []),
  addWrongWord: (wordId) => {
    const current = new Set(learningStorage.getWrongWords());
    current.add(wordId);
    const updated = [...current];
    localStorage.setItem(KEYS.wrongWords, JSON.stringify(updated));
    return updated;
  },
  removeWrongWord: (wordId) => {
    const updated = learningStorage.getWrongWords().filter((id) => id !== wordId);
    localStorage.setItem(KEYS.wrongWords, JSON.stringify(updated));
    return updated;
  },
};
