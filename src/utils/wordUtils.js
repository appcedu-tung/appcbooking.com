export const pickRandomWord = (words) => words[Math.floor(Math.random() * words.length)];

export const shuffle = (list) => {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const createMockSet = (words, count = 10) => shuffle(words).slice(0, count);
