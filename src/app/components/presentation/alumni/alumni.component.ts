import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/Article';
import { ArticleCategory } from 'src/app/models/ArticleCategory';
import { ArticleCategoryService } from 'src/app/services/article-category.service';
import { environment } from 'src/environments/environment';
import { NotifierService } from 'angular-notifier';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.scss']
})
export class AlumniComponent implements OnInit {

  apiUrl = environment.apiUrl;
  articles: Article[] = [];
  category: ArticleCategory;
  alumniCategoryID = environment.alumniCategoryID;
  imageSource = environment.imageSource
  uploadImageSource = environment.uploadImageSource
  fileAdded: boolean = false;

  profilePicture: string;

  uploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/upload`,
    itemAlias: 'doc',
  });

  constructor(private articleCategoryService: ArticleCategoryService,private notifier: NotifierService,
    private loadingSpinner: Ng4LoadingSpinnerService,) { }



  ngOnInit(): void {

    this.articleCategoryService.getArticles().subscribe(data => {

      data = data.filter(a => a.articleCategoryID == this.alumniCategoryID && a.status == 1);

      data = data.sort((a1, a2) => a2.id - a1.id).filter(item => item.status == 1);

      if (data[0]) this.articles.push(data[0]);
      if (data[1]) this.articles.push(data[1]);
      if (data[2]) this.articles.push(data[2]);
      if (data[3]) this.articles.push(data[3]);

      this.articleCategoryService.getArticleCategoryByID(this.alumniCategoryID).subscribe(cat => {
        this.category = cat;
      })

      this.loadingSpinner.hide();

      this.uploader.onAfterAddingFile = file => {
        file.withCredentials = false;
        this.fileAdded = true;
        // Show spinner when cover image upload starts
        this.loadingSpinner.show();
        this.uploader.uploadAll();
      };
  
      this.uploader.onCompleteItem = (
        item: any,
        response: any,
        status: any,
        headers: any
      ) => {
        // Hide spinner when cover image upload finish
        this.loadingSpinner.hide();
        response = JSON.parse(response);
        if (response.status == 0) {
          console.log(response.filename);
          this.notifier.notify('success', 'Image uploaded!');
          this.profilePicture = response.filename;
          //this.addEditArticle();
        } else {
          this.notifier.notify('error', 'Error while uploading image!');
        }
      };
    })
  }

  onSubmit(form: any) {
    if (!form.valid) {
      this.notifier.notify('error', "Please, Fill all details");
      return;
    }
    form.value.linkedIn = form.value.linkedIn ? 1 : 0;
    form.value.facebook = form.value.facebook ? 1 : 0;
    form.value.whatsapp = form.value.whatsapp ? 1 : 0;
    form.value.receiveEmails = form.value.receiveEmails ? 1 : 0;

    if (form.value.agreeDetailsPhoto) {
      form.value.agreeDetailsPhoto = 1;
    }
    else {
      form.value.agreeDetailsPhoto = 0;
    }

    if (form.value.agree) {
      form.value.agree = 1;
    }
    else {
      form.value.agree = 0;
    }
    form.value.profilePhoto = this.profilePicture;
      this.articleCategoryService.insertAlumini(form.value).subscribe(response => {
        console.log("Form submitted successfully", response);
        this.notifier.notify('info', "Form submitted successfully");
         // **Reset the form**
    form.reset();
    // **Reset profile picture variable if needed**
    this.profilePicture = null;
      }, error => {
        this.notifier.notify('error', "Error submitting form");
        console.error("Error submitting form", error);
      });
  }

}
