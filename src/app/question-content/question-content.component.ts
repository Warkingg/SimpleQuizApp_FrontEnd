import { AddThemeComponent } from './../add-theme/add-theme.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import {Question} from '../model/Question';
import {QuestionService} from '../service/question.service';
import {ActivatedRoute} from '@angular/router';
import {Response} from '../model/Response';
import {ResponseService} from '../service/response.service';
import {Level} from '../model/Level';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-question-content',
  templateUrl: './question-content.component.html',
  styleUrls: ['./question-content.component.css']
})
export class QuestionContentComponent implements OnInit {
  questions: Question[];
  responses: Response[];
  dialogRef: any;
  id: number;
  public editQuestion: Question;
  public deleteQuestion: Question;
  public showQuestion: Question;

  constructor(private dialog: MatDialog, private questionService: QuestionService, private route: ActivatedRoute,
              private responseService: ResponseService) {
    this.route.params.subscribe(
      params => {
        this.id = this.route.snapshot.params.id;
        this.questionService.getQuestions(this.id).subscribe(questions => {
          this.questions = questions;
        });
      }
    );
  }

  ngOnInit(): void {
  }

  public openRegister() {
    this.dialogRef = this.dialog.open(RegisterComponent, {
      width: '420px'
    });
  }

  findResponse(id: number) {
    this.responseService.getResponses(id).subscribe(res => {
      this.responses = res;
    });
  }
  public getQuestion(): void {
    this.questionService.getQuestions(this.id).subscribe(
      (response: Question[]) => {
        this.questions = response;
        console.log(this.questions);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onUpdateQuestion(question: Question): void {
    this.questionService.updateQuestion(question).subscribe(
      (response: Question) => {
        console.log(response);
        this.getQuestion()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteQuestion(questionId: number): void {
    this.questionService.deleteQuestion(questionId).subscribe(
      (response: void) => {
        console.log(response);
        this.getQuestion();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onOpenModal(question:Question, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addLevelModal');
    }
    if (mode === 'edit') {
      this.editQuestion = question;
      button.setAttribute('data-target', '#updateLevelModal');
    }
    if (mode === 'delete') {
      this.deleteQuestion = question;
      button.setAttribute('data-target', '#deleteLevelModal');
    }
    if (mode === 'show') {
      this.showQuestion = question;
      button.setAttribute('data-target', '#showLevelModal');
    }
    container.appendChild(button);
    button.click();
  }
}

