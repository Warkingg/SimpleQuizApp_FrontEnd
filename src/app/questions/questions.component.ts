import { AddThemeComponent } from './../add-theme/add-theme.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Theme} from '../model/Theme';
import {ThemeService} from '../service/theme.service';
import {AddLevelComponent} from '../level/add-level/add-level.component';
import {UpdateThemeComponent} from '../update-theme/update-theme.component';
import {Question} from '../model/Question';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  dialogRef: any;
  themes: Theme[];
  public editTheme: Theme;
  public deleteTheme: Theme;
  public showTheme: Theme;

  constructor(private dialog: MatDialog, private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.getThemes().subscribe(themes => {
      this.themes = themes;
    });
  }

  public openRegister() {
    this.dialogRef = this.dialog.open(AddThemeComponent, {
      width: '420px'
    });
  }
  public openUpdate(id: number){
    this.dialogRef = this.dialog.open(UpdateThemeComponent, {
      width: '420px'
    });
  }

  addLevel(id: number) {
    this.dialogRef = this.dialog.open(AddLevelComponent, {
      width: '420px',
      data: {id}
    });
  }
  public searchTheme(key: string): void {
    console.log(key);
    const results: Theme[] = [];
    for (const theme of this.themes) {
      if (theme.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(theme);
      }
    }
    this.themes = results;
    if (results.length === 0 || !key) {
      this.getTheme();
    }
  }
  public getTheme(): void {
    this.themeService.getThemes().subscribe(
      (response: Theme[]) => {
        this.themes = response;
        console.log(this.themes);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onUpdateTheme(theme: Theme): void {
    this.themeService.updateTheme(theme).subscribe(
      (response: Theme) => {
        console.log(response);
        this.getTheme();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteTheme(themeId: number): void {
    this.themeService.deleteTheme(themeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getTheme();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onOpenModal(theme: Theme, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addThemeModal');
    }
    if (mode === 'edit') {
      this.editTheme = theme;
      button.setAttribute('data-target', '#updateThemeModal');
    }
    if (mode === 'delete') {
      this.deleteTheme = theme;
      button.setAttribute('data-target', '#deleteThemeModal');
    }
    if (mode === 'show') {
      this.showTheme = theme;
      button.setAttribute('data-target', '#showThemeModal');
    }
    container.appendChild(button);
    button.click();
  }
}
