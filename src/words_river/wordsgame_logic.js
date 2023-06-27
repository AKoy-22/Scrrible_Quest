export function speakWord(word) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
  
      // Set the voice
      const voices = speechSynthesis.getVoices();
  
      const selVoice = Math.round(Math.floor(Math.random() * 4) + 1);
      const selectedVoice = voices[selVoice];
      utterance.voice = selectedVoice;
  
      // Set the pitch
      utterance.pitch = 1.5;
      //set the speed
      utterance.rate = 0.7;
  
      speechSynthesis.speak(utterance);
    } else {
      console.log('Speech synthesis is not supported in this browser.');
    }
  }
  
  
  export function logAvailableVoices() {
    if ('speechSynthesis' in window) {
      const voices = speechSynthesis.getVoices();
      console.log(voices);
    } else {
      console.log('Speech synthesis is not supported in this browser.');
    }
  }
  