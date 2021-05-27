import {Level} from './Level';

export interface Question {
  question: string;
  id: number;
  response1: string;
  response2: string;
  response3: string;
  response4: string;
  correct: string;
  level: Level;
}
