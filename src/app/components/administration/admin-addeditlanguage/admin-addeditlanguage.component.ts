import { Component, OnInit } from '@angular/core';
import { Language } from 'src/app/models/Language';
import { LanguageService } from 'src/app/services/language.service';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-addeditlanguage',
  templateUrl: './admin-addeditlanguage.component.html',
  styleUrls: ['./admin-addeditlanguage.component.scss']
})
export class AdminAddeditlanguageComponent implements OnInit {

  language: Language = new Language();
  edit: boolean = false;

  constructor(private notifier: NotifierService, 
              private languageService: LanguageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      if (data["id"]) {
        this.edit = true;
        this.languageService.getLanguageByID(+data["id"]).subscribe(lang => {
          this.language = lang;
        })
      }
    })
  }

  addEditLanguage(){
    if (this.edit) {
      this.languageService.updateLanguage(this.language).subscribe(data => {
        if (data.status == 0) {
          this.notifier.notify('info', 'Language updated!');
          this.router.navigateByUrl('/administration/languages');
        }
        else {
          this.notifier.notify('error', 'Error while updating language!');
        }
      })
    }
    else {
      this.languageService.insertLanguage(this.language).subscribe(data => {
        if (data.status == 0) {
          this.notifier.notify('info', 'Language inserted!');
          this.router.navigateByUrl('/administration/languages');
        }
        else {
          this.notifier.notify('error', 'Error while inserting language!');
        }
      })
    }
  }

  validateInput(){
    if (!this.language.name || !this.language.description) {
      this.notifier.notify('error', 'Please insert necessary category data!');
      return;
    }

    this.addEditLanguage();
  }

}
