import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Level} from "../model/Level";
import {Observable} from "rxjs";
import {Response} from "../model/Response";
import {Theme} from '../model/Theme';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private http: HttpClient) { }

  public addResponse(response: Response, idQuestion: number): Observable<Response> {
    return this.http.post<Response>(`http://localhost:8080/api/addResponse/${idQuestion}`, response);
  }
  public getResponses(idQuestion: number): Observable<Response[]> {
    return this.http.get<Response[]>(`http://localhost:8080/api/getResponses/${idQuestion}`);
  }

  public updateResponses(reponse: Response): Observable<Response> {
    return this.http.put<Response>(`http://localhost:8080/api/update`, reponse);
  }

  public deleteResponses(responseId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/delete/${responseId}`);
  }
  public getResponse(): Observable<Response[]> {
    return this.http.get<Response[]>(`http://localhost:8080/api/getRespone`);
  }
}
