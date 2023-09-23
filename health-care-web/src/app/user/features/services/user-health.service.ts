
import { Observable } from 'rxjs';
import { quizs } from './data';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserHealthService {
    constructor() { }
    getQuizs() {
        return new Observable<any[]>(observer => {
            observer.next(quizs);
        });
    }
}