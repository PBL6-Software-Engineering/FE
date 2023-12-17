// openai.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OPENAI_KEY } from '../constants/api.constant';

const model = 'gpt-3.5-turbo-1106';
@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) {}

  sendMessage(text: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + OPENAI_KEY,
    });

    const requestBody = {
      model: model,
      messages: [
        {
          role: 'user',
          content: text,
        },
      ],
      max_tokens: 1024,
    };

    return this.http.post(this.apiUrl, requestBody, { headers });
  }
}
