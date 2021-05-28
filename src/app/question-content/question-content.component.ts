import {AddThemeComponent} from './../add-theme/add-theme.component';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RegisterComponent} from '../register/register.component';
import {Question} from '../model/Question';
import {QuestionService} from '../service/question.service';
import {ActivatedRoute} from '@angular/router';
import {Response} from '../model/Response';
import {ResponseService} from '../service/response.service';
import {Level} from '../model/Level';
import {HttpErrorResponse} from '@angular/common/http';
import {LevelService} from '../service/level.service';

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
  levels: Level[] = [];
  editQuestion: Question;
  deleteQuestion: Question;
  showQuestion: Question;

  constructor(private dialog: MatDialog, private questionService: QuestionService, private route: ActivatedRoute,
              private responseService: ResponseService, private levelService: LevelService) {
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
    this.levelService.getAllLevel().subscribe(levels => {
      this.levels = levels;
    });
  }

  public openRegister() {
    this.dialogRef = this.dialog.open(RegisterComponent, {
      width: '420px'
    });
  }

  // findResponse(id: number) {
  //   this.responseService.getResponses(id).subscribe(res => {
  //     this.responses = res;
  //   });
  // }

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
    this.questionService.updateQuestion(question, question.id).subscribe(
      (response: Question) => {
        console.log(response);
        this.getQuestion();
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

  public onOpenModal(question: Question, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addQuestionModal');
    }
    if (mode === 'edit') {
      this.editQuestion = question;
      button.setAttribute('data-target', '#updateQuestionModal');
    }
    if (mode === 'delete') {
      this.deleteQuestion = question;
      button.setAttribute('data-target', '#deleteQuestionModal');
    }
    if (mode === 'show') {
      this.showQuestion = question;
      button.setAttribute('data-target', '#showQuestionModal');
    }
    container.appendChild(button);
    button.click();
  }

  cancel() {
    this.dialog.closeAll();
  }
}

