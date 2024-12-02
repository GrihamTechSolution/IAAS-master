import { Component, OnInit } from '@angular/core';
import { Language } from 'src/app/models/Language';
import { LanguageService } from 'src/app/services/language.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrls: ['./admin-languages.component.scss']
})
export class AdminLanguagesComponent implements OnInit {

  languages: Language[] = [];

  constructor(private languageService: LanguageService,
              private notifier: NotifierService) { }

  ngOnInit(): void {
    this.languageService.getLanguages().subscribe(data => {
      this.languages = data;
    })
  }

  deleteLanguage(id:number) {
    if (confirm("Are you sure?")) {
      this.languageService.deleteLanguage(id).subscribe(data => {
        if (data.status == 0) {
          this.notifier.notify('info', 'Language deleted!');
          this.ngOnInit();
        }
        else {
          this.notifier.notify('error', 'Error while updating language!');
        }
      })
    }
  }

}
