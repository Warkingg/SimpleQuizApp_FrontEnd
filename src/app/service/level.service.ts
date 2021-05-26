import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Theme} from "../model/Theme";
import {Observable} from 'rxjs';
import {Level} from '../model/Level';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private http: HttpClient) { }

  public addLevel(level: Level, idTheme: number): Observable<Level> {
    return this.http.post<Level>(`http://localhost:8080/api/addLevel/${idTheme}`, level);
  }
  public getLevels(idTheme: number): Observable<Level[]> {
    return this.http.get<Level[]>(`http://localhost:8080/api/getLevels/${idTheme}`);
  }
  public getLevel(id: number): Observable<Level> {
    return this.http.get<Level>(`http://localhost:8080/api/getLevel/${id}`);
  }
  public getAllLevel(): Observable<Level[]> {
    return this.http.get<Level[]>(`http://localhost:8080/api/getAllLevels`);
  }
  public updateLevel(level: Level): Observable<Level> {
    return this.http.put<Level>(`http://localhost:8080/api/updateLevel`, level);
  }

  public deleteLevel(levelId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/deleteLevel/${levelId}`);
  }
}
