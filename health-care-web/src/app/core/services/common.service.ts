import { Injectable } from "@angular/core";
import { provinces } from '../data/provinces';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    constructor() {
        
    }

    getProvinces(): Observable<any[]> {
        return new Observable<any[]>(observer => {
            observer.next(provinces);
            observer.complete();
        });
    }
}