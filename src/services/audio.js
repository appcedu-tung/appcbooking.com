export const playWordAudio = (word, audioUrl = '') => {
  if (audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play().catch(() => undefined);
    return;
  }

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};
