import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './components/app/app.component';
import { MainComponent } from './components/administration/main/main.component';
import { CountriesComponent } from './components/administration/countries/countries.component';

import { DataTableModule } from 'angular-6-datatable';
import { CountToModule } from 'angular-count-to';
import { AddEditCountryComponent } from './components/administration/add-edit-country/add-edit-country.component';

import { FormsModule } from '@angular/forms';
import { SponsorsComponent } from './components/administration/sponsors/sponsors.component';
import { AddeditsponsorComponent } from './components/administration/addeditsponsor/addeditsponsor.component';
import { PartnersComponent } from './components/administration/partners/partners.component';
import { AddeditpartnerComponent } from './components/administration/addeditpartner/addeditpartner.component';
import { CategoriesComponent } from './components/administration/categories/categories.component';
import { AddedditcategoryComponent } from './components/administration/addedditcategory/addedditcategory.component';
import { ArticlesComponent } from './components/administration/articles/articles.component';
import { AddeditarticleComponent } from './components/administration/addeditarticle/addeditarticle.component';
import { GaleriesComponent } from './components/administration/galeries/galeries.component';
import { SingleGalleryComponent } from './components/administration/single-gallery/single-gallery.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DownloadsComponent } from './components/administration/downloads/downloads.component';
import { AddeditdownloadComponent } from './components/administration/addeditdownload/addeditdownload.component';
import { ExprogramsComponent } from './components/administration/exprograms/exprograms.component';
import { AddeditexprogramsComponent } from './components/administration/addeditexprograms/addeditexprograms.component';
import { ExprogramdetailsComponent } from './components/administration/exprogramdetails/exprogramdetails.component';
import { ExprogramtimelineComponent } from './components/administration/exprogramtimeline/exprogramtimeline.component';
import { StudentsComponent } from './components/administration/students/students.component';
import { ApplicantsComponent } from './components/administration/applicants/applicants.component';
import { StudentProfileComponent } from './components/administration/student-profile/student-profile.component';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { LoginComponent } from './components/expro/login/login.component';
import { RegisterComponent } from './components/expro/register/register.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotifierModule } from 'angular-notifier';
import { ExproHomeComponent } from './components/expro/expro-home/expro-home.component';
import { ExproMainComponent } from './components/expro/expro-main/expro-main.component';
import { ExproContactComponent } from './components/expro/expro-contact/expro-contact.component';
import { ExproFaqComponent } from './components/expro/expro-faq/expro-faq.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaqsComponent } from './components/administration/faqs/faqs.component';
import { AddEditFaqComponent } from './components/administration/add-edit-faq/add-edit-faq.component';
import { FaqCategoriesComponent } from './components/administration/faq-categories/faq-categories.component';
import { AddEditFaqCategoryComponent } from './components/administration/add-edit-faq-category/add-edit-faq-category.component';
import { MyProfileComponent } from './components/presentation/my-profile/my-profile.component';
import { PresentationMainComponent } from './components/presentation/presentation-main/presentation-main.component';
import { AdminOpTakersComponent } from './components/administration/admin-op-takers/admin-op-takers.component';
import { AddEditOpTakerComponent } from './components/administration/add-edit-op-taker/add-edit-op-taker.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { AlumniComponent } from './components/presentation/alumni/alumni.component';
import { ContentHubComponent } from './components/presentation/content-hub/content-hub.component';
import { ContentHubSingleComponent } from './components/presentation/content-hub-single/content-hub-single.component';
import { PresentationHomeComponent } from './components/presentation/presentation-home/presentation-home.component';
import { PresentationsDownloadsComponent } from './components/presentation/presentations-downloads/presentations-downloads.component';
import { PresentationContactComponent } from './components/presentation/presentation-contact/presentation-contact.component';
import { ExproCountriesComponent } from './components/expro/expro-countries/expro-countries.component';
import { ExproInternshipsComponent } from './components/expro/expro-internships/expro-internships.component';
import { AdminInternshipsComponent } from './components/administration/admin-internships/admin-internships.component';
import { AdminAddeditinternshipComponent } from './components/administration/admin-addeditinternship/admin-addeditinternship.component';
import { AdminStudentsComponent } from './components/administration/admin-students/admin-students.component';
import { AdminApplicationsComponent } from './components/administration/admin-applications/admin-applications.component';
import { AdminLanguagesComponent } from './components/administration/admin-languages/admin-languages.component';
import { AdminAddeditlanguageComponent } from './components/administration/admin-addeditlanguage/admin-addeditlanguage.component';
import { AdminBackgroundFieldsComponent } from './components/administration/admin-background-fields/admin-background-fields.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExproInternshipDetailComponent } from './components/expro/expro-internship-detail/expro-internship-detail.component';
import { InternshipStatusComponent } from './components/expro/internship-status/internship-status.component';
import { AdminStudentComponent } from './components/administration/admin-student/admin-student.component';
import { AdminInternshipStatusComponent } from './components/administration/admin-internship-status/admin-internship-status.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { PresentationNetworkComponent } from './components/presentation/presentation-network/presentation-network.component';
import { PresentationAboutUsComponent } from './components/presentation/presentation-about-us/presentation-about-us.component';
import { PresentationBecomeMemberComponent } from './components/presentation/presentation-become-member/presentation-become-member.component';
import { PresentationBecomePartnerComponent } from './components/presentation/presentation-become-partner/presentation-become-partner.component';
import { PresentationStudyAbroadComponent } from './components/presentation/presentation-study-abroad/presentation-study-abroad.component';
import { AboutUsMapComponent } from './components/presentation/about-us-map/about-us-map.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ForgotPasswordComponent } from './components/presentation/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/presentation/reset-password/reset-password.component';
import { UsersComponent } from './components/administration/users/users.component';
import { AddedituserComponent } from './components/administration/addedituser/addedituser.component';
import { AdminStudyAbroadComponent } from './components/administration/admin-study-abroad/admin-study-abroad.component';
import { AdminAddeditStudyAbroadComponent } from './components/administration/admin-addedit-study-abroad/admin-addedit-study-abroad.component';
import { PresentationShowStudyAbroadComponent } from './components/presentation/presentation-show-study-abroad/presentation-show-study-abroad.component';
import { StudyAbroadListComponent } from './components/presentation/study-abroad-list/study-abroad-list.component';
import { UrlSafePipe } from './pipes/UrlSafePipe';
import { SafeHtmlPipe } from './pipes/SafeHtmlPipe';
import { ShortenArticleContentPipe } from './pipes/ShortenArticleContent';
import { FavouritesComponent } from './components/presentation/favourites/favourites.component';
import { MyBlogComponent } from './components/presentation/my-blog/my-blog.component';
import { MyBlogAddeditComponent } from './components/presentation/my-blog-addedit/my-blog-addedit.component';
import { ArticlesCategoryComponent } from './components/presentation/articles-category/articles-category.component';
import { MainMenuComponent } from './common/main-menu/main-menu.component';
import { VotingsComponent } from './components/administration/votings/votings.component';
import { AddEditVotingComponent } from './components/administration/addeditvoting/addeditvoting.component';
import { AddEditVotingQuestionComponent } from './components/administration/addeditvotingquestion/addeditvotingquestion.component';
import { DoVotingComponent } from './components/presentation/do-voting/do-voting.component';
import { VotingResultsComponent } from './components/administration/voting-results/voting-results.component';
import { ChartsModule } from 'ng2-charts';
import { PresentationStudyAbroadAboutComponent } from './components/presentation/presentation-study-abroad-about/presentation-study-abroad-about.component';
import { PresentationStudyAbroadUniversitiesComponent } from './components/presentation/presentation-study-abroad-universities/presentation-study-abroad-universities.component';
import { PresentationStudyAbroadStudentsComponent } from './components/presentation/presentation-study-abroad-students/presentation-study-abroad-students.component';
import { NewsletterGenerationComponent } from './components/administration/newsletter-generation/newsletter-generation.component';
import { NewsletterGenerationArticleDetailsComponent } from './components/administration/newsletter-generation-article-details/newsletter-generation-article-details.component';
import { BecomeSponsorComponent } from './components/presentation/become-sponsor/become-sponsor.component';
import { ApplicationsArchiveComponent } from './components/administration/applications-archive/applications-archive.component';
import { IcyaComponent } from './components/presentation/icya/icya.component';
import { FayiComponent } from './components/presentation/fayi/fayi.component';
import { EventsComponent } from './components/administration/events/events.component';
import { AddEditEventsComponent } from './components/administration/add-edit-events/add-edit-events.component';
import { PresentationEventsComponent } from './components/presentation/presentation-events/presentation-events.component';
import { PresentationEventsSingleComponent } from './components/presentation/presentation-events-single/presentation-events-single.component';
import { FooterComponent } from './common/footer/footer.component';
import { ExproBackpackingComponent } from './components/expro/expro-backpacking/expro-backpacking.component';
import { ExproTestimonialsComponent } from './components/expro/expro-testimonials/expro-testimonials.component';
import { ExproTestimonialsDetalisComponent } from './components/expro/expro-testimonials-details/expro-testimonials-details.component';
import { ProjectsComponent } from './components/administration/projects/projects.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CountriesComponent,
    AddEditCountryComponent,
    SponsorsComponent,
    AddeditsponsorComponent,
    PartnersComponent,
    AddeditpartnerComponent,
    CategoriesComponent,
    AddedditcategoryComponent,
    ArticlesComponent,
    AddeditarticleComponent,
    GaleriesComponent,
    SingleGalleryComponent,
    DownloadsComponent,
    AddeditdownloadComponent,
    ExprogramsComponent,
    AddeditexprogramsComponent,
    ExprogramdetailsComponent,
    ProjectsComponent,
    ExprogramtimelineComponent,
    StudentsComponent,
    ApplicantsComponent,
    StudentProfileComponent,
    ExproHomeComponent,
    ExproMainComponent,
    ExproContactComponent,
    ExproFaqComponent,
    LoginComponent,
    RegisterComponent,
    FaqsComponent,
    AddEditFaqComponent,
    FaqCategoriesComponent,
    AddEditFaqCategoryComponent,
    MyProfileComponent,
    PresentationMainComponent,
    AdminOpTakersComponent,
    AddEditOpTakerComponent,
    AlumniComponent,
    ContentHubComponent,
    ContentHubSingleComponent,
    PresentationHomeComponent,
    PresentationsDownloadsComponent,
    PresentationContactComponent,
    ExproCountriesComponent,
    ExproInternshipsComponent,
    AdminInternshipsComponent,
    AdminAddeditinternshipComponent,
    AdminStudentsComponent,
    AdminApplicationsComponent,
    AdminLanguagesComponent,
    AdminAddeditlanguageComponent,
    AdminBackgroundFieldsComponent,
    ExproInternshipDetailComponent,
    InternshipStatusComponent,
    AdminStudentComponent,
    AdminInternshipStatusComponent,
    PresentationNetworkComponent,
    PresentationAboutUsComponent,
    PresentationBecomeMemberComponent,
    PresentationBecomePartnerComponent,
    PresentationStudyAbroadComponent,
    AboutUsMapComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UsersComponent,
    AddedituserComponent,
    AdminStudyAbroadComponent,
    AdminAddeditStudyAbroadComponent,
    PresentationShowStudyAbroadComponent,
    StudyAbroadListComponent,
    UrlSafePipe,
    SafeHtmlPipe,
    ShortenArticleContentPipe,
    FavouritesComponent,
    MyBlogComponent,
    MyBlogAddeditComponent,
    ArticlesCategoryComponent,
    MainMenuComponent,
    VotingsComponent,
    AddEditVotingComponent,
    AddEditVotingQuestionComponent,
    DoVotingComponent,
    VotingResultsComponent,
    PresentationStudyAbroadAboutComponent,
    PresentationStudyAbroadUniversitiesComponent,
    PresentationStudyAbroadStudentsComponent,
    NewsletterGenerationComponent,
    NewsletterGenerationArticleDetailsComponent,
    BecomeSponsorComponent,
    ApplicationsArchiveComponent,
    IcyaComponent,
    FayiComponent,
    EventsComponent,
    AddEditEventsComponent,
    PresentationEventsComponent,
    PresentationEventsSingleComponent,
    FooterComponent,
    ExproBackpackingComponent,
    ExproTestimonialsComponent,
    ExproTestimonialsDetalisComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng4LoadingSpinnerModule,
    DataTableModule,
    FormsModule,
    CKEditorModule,
    HttpClientModule,
    FileUploadModule,
    NgSelectModule,
    Daterangepicker,
    CountToModule,
    ModalModule.forRoot(),
    NotifierModule.withConfig({
      // Custom options in here
      position: {
        horizontal: {
          position: 'right',
          distance: 200,
        },
        vertical: {
          position: 'top',
          distance: 50,
        },
      },
      behaviour: {
        autoHide: 5000,
        stacking: 5,
      },
    }),
    BrowserAnimationsModule,
    MatExpansionModule,
    NgImageSliderModule,
    NgbModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
