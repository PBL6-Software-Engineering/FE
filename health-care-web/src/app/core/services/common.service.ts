import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { linkApi } from "../constants/api.constant";

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}

  getProvinces(): Observable<any> {
    return this.http.get<any>(`${linkApi}/province`);
  }
}