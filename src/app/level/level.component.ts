import { Component, OnInit } from '@angular/core';
import {Level} from "../model/Level";
import {LevelService} from "../service/level.service";
import {ActivatedRoute} from "@angular/router";
import {AddQuestionComponent} from "../add-question/add-question.component";
import {MatDialog} from "@angular/material/dialog";
import {Theme} from '../model/Theme';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {
  levels: Level[];
  idTheme: number;
  dialogRef: any;
  public editLevel: Level;
  public deleteLevel: Level;
  public showLevel: Level;

  constructor(private levelService: LevelService, private route: ActivatedRoute, private dialog: MatDialog) {
    this.route.params.subscribe(
      params => {
        this.idTheme = this.route.snapshot.params.id;
        this.levelService.getLevels(this.idTheme).subscribe(levels => {
          this.levels = levels;
        })
      }
    )
  }

  ngOnInit(): void {

  }
  public openRegister(id:number) {
    this.dialogRef = this.dialog.open(AddQuestionComponent, {
      width: '500px',
      data: {id}
    });
  }

  public getLevel(): void {
    this.levelService.getLevels(this.idTheme).subscribe(
      (response: Level[]) => {
        this.levels = response;
        console.log(this.levels);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onUpdateLevel(level: Level): void {
    this.levelService.updateLevel(level).subscribe(
      (response: Level) => {
        console.log(response);
        this.getLevel();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteTheme(levelId: number): void {
    this.levelService.deleteLevel(levelId).subscribe(
      (response: void) => {
        console.log(response);
        this.getLevel();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onOpenModal(level: Level, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addLevelModal');
    }
    if (mode === 'edit') {
      this.editLevel = level;
      button.setAttribute('data-target', '#updateLevelModal');
    }
    if (mode === 'delete') {
      this.deleteLevel = level;
      button.setAttribute('data-target', '#deleteLevelModal');
    }
    if (mode === 'show') {
      this.showLevel = level;
      button.setAttribute('data-target', '#showLevelModal');
    }
    container.appendChild(button);
    button.click();
  }
}
