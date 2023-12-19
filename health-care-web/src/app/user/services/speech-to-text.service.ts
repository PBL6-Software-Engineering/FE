import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpeechToTextService {
  private recognition: any;

  constructor(private zone: NgZone) {
    this.recognition = new ((window as any)['webkitSpeechRecognition'] ||
      (window as any)['SpeechRecognition'])();
    this.recognition.continuous = false;
    this.recognition.lang = 'vi-VN'; // Ngôn ngữ mặc định
  }

  startListening(callback: (text: string) => void): void {
    this.recognition.onresult = (event: any) => {
      this.zone.runOutsideAngular(() => {
        const transcript = event.results[0][0].transcript;
        console.log('transcript', transcript);
        callback(transcript);
      });
    };

    this.recognition.start();
  }

  stopListening(): void {
    this.recognition.stop();
  }
}
