import { Component, OnInit } from '@angular/core';
import {Theme} from '../model/Theme';
import {ThemeService} from '../service/theme.service';

@Component({
  selector: 'app-update-theme',
  templateUrl: './update-theme.component.html',
  styleUrls: ['./update-theme.component.css']
})
export class UpdateThemeComponent implements OnInit {
  theme: Theme = {} as Theme;
  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
  }
  updateTheme() {
    this.themeService.updateTheme(this.theme).subscribe(theme => {
      this.theme = theme ;
      window.location.reload();
    });
  }
}

