// text-to-speech.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextToSpeechService {
  private speechSynthesis = window.speechSynthesis;
  private utterance: SpeechSynthesisUtterance;
  isWorkingSpeech = false;

  constructor() {
    if ('speechSynthesis' in window) {
      // Hỗ trợ Web Speech API
      this.isWorkingSpeech = true;
    } else {
      // Trình duyệt không hỗ trợ Web Speech API
      console.error('Trình duyệt không hỗ trợ Web Speech API');
      this.isWorkingSpeech = false;
      return;
    }
    this.utterance = new SpeechSynthesisUtterance();
  }

  speak(text: string, listenEnd: () => void): void {
    text = text.replaceAll(/&nbsp;/g, ' ');
    this.utterance.text = text;
    this.speechSynthesis.speak(this.utterance);
    this.utterance.onend = listenEnd;
  }

  pause(): void {
    this.speechSynthesis.pause();
  }

  resume(): void {
    this.speechSynthesis.resume();
  }

  cancel(): void {
    this.speechSynthesis.cancel();
  }

  checkIsWorkingSpeech() {
    return this.isWorkingSpeech;
  }
}
