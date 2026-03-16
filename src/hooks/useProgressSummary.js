import { useMemo } from 'react';
import { learningStorage } from '../services/storage';

export const useProgressSummary = () => {
  return useMemo(() => {
    const practiceCount = learningStorage.getPracticeCount();
    const mockScores = learningStorage.getMockScores();
    const wrongWords = learningStorage.getWrongWords();
    const latestScore = mockScores[0]?.score ?? 0;

    return {
      practiceCount,
      totalTests: mockScores.length,
      latestScore,
      wrongCount: wrongWords.length,
    };
  }, []);
};
