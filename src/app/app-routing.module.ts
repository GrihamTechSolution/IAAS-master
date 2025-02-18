import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/administration/main/main.component';
import { CountriesComponent } from './components/administration/countries/countries.component';
import { AddEditCountryComponent } from './components/administration/add-edit-country/add-edit-country.component';
import { SponsorsComponent } from './components/administration/sponsors/sponsors.component';
import { AddeditsponsorComponent } from './components/administration/addeditsponsor/addeditsponsor.component';
import { PartnersComponent } from './components/administration/partners/partners.component';
import { CategoriesComponent } from './components/administration/categories/categories.component';
import { AddeditpartnerComponent } from './components/administration/addeditpartner/addeditpartner.component';
import { AddedditcategoryComponent } from './components/administration/addedditcategory/addedditcategory.component';
import { ArticlesComponent } from './components/administration/articles/articles.component';
import { GaleriesComponent } from './components/administration/galeries/galeries.component';
import { AddeditarticleComponent } from './components/administration/addeditarticle/addeditarticle.component';
import { DownloadsComponent } from './components/administration/downloads/downloads.component';
import { AddeditdownloadComponent } from './components/administration/addeditdownload/addeditdownload.component';
import { ExprogramsComponent } from './components/administration/exprograms/exprograms.component';
import { ExprogramdetailsComponent } from './components/administration/exprogramdetails/exprogramdetails.component';
import { AddeditexprogramsComponent } from './components/administration/addeditexprograms/addeditexprograms.component';
import { ExprogramtimelineComponent } from './components/administration/exprogramtimeline/exprogramtimeline.component';
import { StudentsComponent } from './components/administration/students/students.component';
import { ApplicantsComponent } from './components/administration/applicants/applicants.component';
import { StudentProfileComponent } from './components/administration/student-profile/student-profile.component';
import { LoginComponent } from './components/expro/login/login.component';
import { RegisterComponent } from './components/expro/register/register.component';
import { ExproMainComponent } from './components/expro/expro-main/expro-main.component';
import { ExproHomeComponent } from './components/expro/expro-home/expro-home.component';
import { ExproFaqComponent } from './components/expro/expro-faq/expro-faq.component';
import { ExproContactComponent } from './components/expro/expro-contact/expro-contact.component';
import { FaqsComponent } from './components/administration/faqs/faqs.component';
import { AddEditFaqComponent } from './components/administration/add-edit-faq/add-edit-faq.component';
import { FaqCategoriesComponent } from './components/administration/faq-categories/faq-categories.component';
import { AddEditFaqCategoryComponent } from './components/administration/add-edit-faq-category/add-edit-faq-category.component';
import { PresentationMainComponent } from './components/presentation/presentation-main/presentation-main.component';
import { MyProfileComponent } from './components/presentation/my-profile/my-profile.component';
import { AdminOpTakersComponent } from './components/administration/admin-op-takers/admin-op-takers.component';
import { AddEditOpTakerComponent } from './components/administration/add-edit-op-taker/add-edit-op-taker.component';
import { AlumniComponent } from './components/presentation/alumni/alumni.component';
import { ContentHubComponent } from './components/presentation/content-hub/content-hub.component';
import { ContentHubSingleComponent } from './components/presentation/content-hub-single/content-hub-single.component';
import { PresentationsDownloadsComponent } from './components/presentation/presentations-downloads/presentations-downloads.component';
import { PresentationHomeComponent } from './components/presentation/presentation-home/presentation-home.component';
import { PresentationContactComponent } from './components/presentation/presentation-contact/presentation-contact.component';
import { ExproCountriesComponent } from './components/expro/expro-countries/expro-countries.component';
import { ExproInternshipsComponent } from './components/expro/expro-internships/expro-internships.component';
import { AdminInternshipsComponent } from './components/administration/admin-internships/admin-internships.component';
import { AdminStudentsComponent } from './components/administration/admin-students/admin-students.component';
import { AdminApplicationsComponent } from './components/administration/admin-applications/admin-applications.component';
import { AdminLanguagesComponent } from './components/administration/admin-languages/admin-languages.component';
import { AdminAddeditlanguageComponent } from './components/administration/admin-addeditlanguage/admin-addeditlanguage.component';
import { AdminBackgroundFieldsComponent } from './components/administration/admin-background-fields/admin-background-fields.component';
import { AdminAddeditinternshipComponent } from './components/administration/admin-addeditinternship/admin-addeditinternship.component';
import { ExproInternshipDetailComponent } from './components/expro/expro-internship-detail/expro-internship-detail.component';
import { InternshipStatusComponent } from './components/expro/internship-status/internship-status.component';
import { AdminStudentComponent } from './components/administration/admin-student/admin-student.component';
import { AdminInternshipStatusComponent } from './components/administration/admin-internship-status/admin-internship-status.component';
import { PresentationNetworkComponent } from './components/presentation/presentation-network/presentation-network.component';
import { PresentationBecomeMemberComponent } from './components/presentation/presentation-become-member/presentation-become-member.component';
import { PresentationBecomePartnerComponent } from './components/presentation/presentation-become-partner/presentation-become-partner.component';
import { PresentationStudyAbroadComponent } from './components/presentation/presentation-study-abroad/presentation-study-abroad.component';
import { PresentationAboutUsComponent } from './components/presentation/presentation-about-us/presentation-about-us.component';
import { UsersComponent } from './components/administration/users/users.component';
import { AddedituserComponent } from './components/administration/addedituser/addedituser.component';
import { ForgotPasswordComponent } from './components/presentation/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/presentation/reset-password/reset-password.component';
import { AdminStudyAbroadComponent } from './components/administration/admin-study-abroad/admin-study-abroad.component';
import { AdminAddeditStudyAbroadComponent } from './components/administration/admin-addedit-study-abroad/admin-addedit-study-abroad.component';
import { StudyAbroadListComponent } from './components/presentation/study-abroad-list/study-abroad-list.component';
import { PresentationShowStudyAbroadComponent } from './components/presentation/presentation-show-study-abroad/presentation-show-study-abroad.component';
import { FavouritesComponent } from './components/presentation/favourites/favourites.component';
import { MyBlogComponent } from './components/presentation/my-blog/my-blog.component';
import { MyBlogAddeditComponent } from './components/presentation/my-blog-addedit/my-blog-addedit.component';
import { ArticlesCategoryComponent } from './components/presentation/articles-category/articles-category.component';
import { VotingsComponent } from './components/administration/votings/votings.component';
import { AddEditVotingComponent } from './components/administration/addeditvoting/addeditvoting.component';
import { AddEditVotingQuestionComponent } from './components/administration/addeditvotingquestion/addeditvotingquestion.component';
import { DoVotingComponent } from './components/presentation/do-voting/do-voting.component';
import { VotingResultsComponent } from './components/administration/voting-results/voting-results.component';
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
import { ExproBackpackingComponent } from './components/expro/expro-backpacking/expro-backpacking.component';
import { ExproTestimonialsComponent } from './components/expro/expro-testimonials/expro-testimonials.component';
import { ExproTestimonialsDetalisComponent } from './components/expro/expro-testimonials-details/expro-testimonials-details.component';
import { ProjectsComponent } from './components/administration/projects/projects.component';
import { ProjectComponent } from './components/administration/project/projects.component';

const routes: Routes = [
  {
    path: 'newslettergeneration/preview/:ids',
    component: NewsletterGenerationArticleDetailsComponent,
  },
  {
    path: 'administration',
    component: MainComponent,
    children: [
      { path: 'votings', component: VotingsComponent },
      { path: 'voting/:id/results', component: VotingResultsComponent },
      { path: 'addeditvoting', component: AddEditVotingComponent },
      { path: 'addeditvoting/:id', component: AddEditVotingComponent },
      {
        path: 'addeditvoting/:votingId/addeditvotingquestion',
        component: AddEditVotingQuestionComponent,
      },
      {
        path: 'addeditvoting/:votingId/addeditvotingquestion/:id',
        component: AddEditVotingQuestionComponent,
      },
      {
        path: 'newslettergeneration',
        component: NewsletterGenerationComponent,
      },
      { path: 'events', component: EventsComponent },
      { path: 'projects', component: ProjectComponent },
      {
        path: 'addeditevents',
        component: AddEditEventsComponent,
      },
      {
        path: 'addeditevents/:id',
        component: AddEditEventsComponent,
      },
      {
        path: 'addeditprojects',
        component: AddEditEventsComponent,
      },
      {
        path: 'addeditprojects/:id',
        component: AddEditEventsComponent,
      },
      { path: 'countries', component: CountriesComponent },
      {
        path: 'addeditcountry',
        component: AddEditCountryComponent,
      },
      {
        path: 'addeditcountry/:id',
        component: AddEditCountryComponent,
      },
      {
        path: 'sponsors',
        component: SponsorsComponent,
      },
      {
        path: 'addeditsponsor',
        component: AddeditsponsorComponent,
      },
      {
        path: 'addeditsponsor/:id',
        component: AddeditsponsorComponent,
      },
      {
        path: 'partners',
        component: PartnersComponent,
      },
      {
        path: 'addeditpartner',
        component: AddeditpartnerComponent,
      },
      {
        path: 'addeditpartner/:id',
        component: AddeditpartnerComponent,
      },
      {
        path: 'studyAbroad',
        component: AdminStudyAbroadComponent,
      },
      {
        path: 'addeditstudyabroad',
        component: AdminAddeditStudyAbroadComponent,
      },
      {
        path: 'addeditstudyabroad/:id',
        component: AdminAddeditStudyAbroadComponent,
      },
      {
        path: 'articlecategories',
        component: CategoriesComponent,
      },
      {
        path: 'addeditcategory',
        component: AddedditcategoryComponent,
      },
      {
        path: 'addeditcategory/:id',
        component: AddedditcategoryComponent,
      },
      {
        path: 'articles',
        component: ArticlesComponent,
      },
      {
        path: 'addeditarticle',
        component: AddeditarticleComponent,
      },
      {
        path: 'addeditarticle/:id',
        component: AddeditarticleComponent,
      },
      {
        path: 'galleries',
        component: GaleriesComponent,
      },
      {
        path: 'downloads',
        component: DownloadsComponent,
      },
      {
        path: 'addeditdownload',
        component: AddeditdownloadComponent,
      },
      {
        path: 'addeditdownload/:id',
        component: AddeditdownloadComponent,
      },
      {
        path: 'exprograms',
        component: ExprogramsComponent,
      },
      {
        path: 'exprogramdetails',
        component: ExprogramdetailsComponent,
      },
      {
        path: 'addeditexprogram',
        component: AddeditexprogramsComponent,
      },
      {
        path: 'exprogramtimeline',
        component: ExprogramtimelineComponent,
      },
      {
        path: 'students',
        component: AdminStudentsComponent,
      },
      {
        path: 'student/:id',
        component: AdminStudentComponent,
      },
      {
        path: 'internshipStatus',
        component: AdminInternshipStatusComponent,
      },
      {
        path: 'applicants',
        component: ApplicantsComponent,
      },
      {
        path: 'studentProfile',
        component: StudentProfileComponent,
      },
      {
        path: 'faqs',
        component: FaqsComponent,
      },
      {
        path: 'addeditfaq',
        component: AddEditFaqComponent,
      },
      {
        path: 'addeditfaq/:id',
        component: AddEditFaqComponent,
      },
      {
        path: 'faqcategories',
        component: FaqCategoriesComponent,
      },
      {
        path: 'addeditfaqcategory',
        component: AddEditFaqCategoryComponent,
      },
      {
        path: 'addeditfaqcategory/:id',
        component: AddEditFaqCategoryComponent,
      },
      {
        path: 'optakers',
        component: AdminOpTakersComponent,
      },
      {
        path: 'addeditoptaker',
        component: AddEditOpTakerComponent,
      },
      {
        path: 'addeditoptaker/:id',
        component: AddEditOpTakerComponent,
      },
      {
        path: 'internships',
        component: AdminInternshipsComponent,
      },
      {
        path: 'addeditinternship',
        component: AdminAddeditinternshipComponent,
      },
      {
        path: 'addeditinternship/:id',
        component: AdminAddeditinternshipComponent,
      },
      {
        path: 'students',
        component: AdminStudentsComponent,
      },
      {
        path: 'applications',
        component: AdminApplicationsComponent,
      },
      {
        path: 'applicationsArchive',
        component: ApplicationsArchiveComponent,
      },
      {
        path: 'languages',
        component: AdminLanguagesComponent,
      },
      {
        path: 'addeditlanguage',
        component: AdminAddeditlanguageComponent,
      },
      {
        path: 'addeditlanguage/:id',
        component: AdminAddeditlanguageComponent,
      },
      {
        path: 'fields',
        component: AdminBackgroundFieldsComponent,
      },
      {
        path: 'iaas-users',
        component: UsersComponent,
      },
      {
        path: 'addedituser',
        component: AddedituserComponent,
      },
      {
        path: 'addedituser/:id',
        component: AddedituserComponent,
      },
      {
        path: 'internshipStatus/:id',
        component: InternshipStatusComponent,
      },
    ],
  },
  {
    path: 'expro',
    component: ExproMainComponent,
    children: [
      {
        path: 'home',
        component: ExproHomeComponent,
      },
      {
        path: 'testimonials',
        component: ExproTestimonialsComponent,
      },
      {
        path: 'testimonials/:id',
        component: ExproTestimonialsDetalisComponent,
      },
      {
        path: 'faq',
        component: ExproFaqComponent,
      },
      {
        path: 'contact',
        component: ExproContactComponent,
      },
      {
        path: 'countries',
        component: ExproCountriesComponent,
      },
      {
        path: 'internships',
        component: ExproInternshipsComponent,
      },
      {
        path: 'internshipDetails/:id',
        component: ExproInternshipDetailComponent,
      },
      {
        path: 'backpacking',
        component: ExproBackpackingComponent,
      },
    ],
  },
  {
    path: '',
    component: PresentationMainComponent,
    children: [
      {
        path: '',
        component: PresentationHomeComponent,
      },
      { path: 'projects', component: ProjectsComponent },
      {
        path: 'home',
        component: PresentationHomeComponent,
      },
      {
        path: 'profile',
        component: MyProfileComponent,
      },
      {
        path: 'alumni',
        component: AlumniComponent,
      },
      {
        path: 'about',
        component: PresentationAboutUsComponent,
      },
      {
        path: 'contentHub',
        component: ContentHubComponent,
      },
      {
        path: 'contentHub/:id',
        component: ContentHubSingleComponent,
      },
      {
        path: 'contentHub/category/:id',
        component: ArticlesCategoryComponent,
      },
      {
        path: 'downloads',
        component: PresentationsDownloadsComponent,
      },
      {
        path: 'contact',
        component: PresentationContactComponent,
      },
      {
        path: 'internshipStatus/:id',
        component: InternshipStatusComponent,
      },
      {
        path: 'internshipDetails/:id',
        component: ExproInternshipDetailComponent,
      },
      {
        path: 'network',
        component: PresentationNetworkComponent,
      },
      {
        path: 'becomeMember',
        component: PresentationBecomeMemberComponent,
      },
      {
        path: 'becomePartner',
        component: PresentationBecomePartnerComponent,
      },
      {
        path: 'becomeSponsor',
        component: BecomeSponsorComponent,
      },
      {
        path: 'studyAbroad',
        component: PresentationStudyAbroadComponent,
      },
      {
        path: 'studyAbroadAbout',
        component: PresentationStudyAbroadAboutComponent,
      },
      {
        path: 'studyAbroadUniversities',
        component: PresentationStudyAbroadUniversitiesComponent,
      },
      {
        path: 'studyAbroadStudents',
        component: PresentationStudyAbroadStudentsComponent,
      },
      {
        path: 'showStudyAbroadProgram/:id',
        component: PresentationShowStudyAbroadComponent,
      },
      {
        path: 'studyAbroadList',
        component: StudyAbroadListComponent,
      },
      {
        path: 'favourites',
        component: FavouritesComponent,
      },
      {
        path: 'myBlog',
        component: MyBlogComponent,
      },
      {
        path: 'myBlog/addedit',
        component: MyBlogAddeditComponent,
      },
      {
        path: 'myBlog/addedit/:id',
        component: MyBlogAddeditComponent,
      },
      {
        path: 'myInternships',
        component: MyProfileComponent,
      },
      {
        path: 'doVoting/:id',
        component: DoVotingComponent,
      },
      {
        path: 'icya',
        component: IcyaComponent,
      },
      {
        path: 'fayi',
        component: FayiComponent,
      },
      {
        path: 'events',
        component: PresentationEventsComponent,
      },
      {
        path: 'events/:id',
        component: PresentationEventsSingleComponent,
      },
      {
        path: 'projects',
        component: PresentationEventsComponent,
      },
      {
        path: 'projects/:id',
        component: PresentationEventsSingleComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'apply',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password/:guid',
    component: ResetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
