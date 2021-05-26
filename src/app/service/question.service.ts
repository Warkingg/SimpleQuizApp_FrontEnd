import { Injectable } from '@angular/core';
import {Level} from '../model/Level';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Question} from '../model/Question';
import {Theme} from '../model/Theme';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  public addQuestion(question: Question, idLevel: number): Observable<Question> {
    return this.http.post<Question>(`http://localhost:8080/api/addQuestion/${idLevel}`, question);
  }

  public getQuestions(idLevel: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/getQuestions/${idLevel}`, );
  }
  public updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`http://localhost:8080/api/updateQuestion`, question);
  }

  public deleteQuestion(questionId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/deleteQuestion/${questionId}`);
  }
  public getQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>(`http://localhost:8080/api/getQuestion`);
  }
}
