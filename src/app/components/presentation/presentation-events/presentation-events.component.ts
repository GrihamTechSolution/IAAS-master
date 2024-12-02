import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { forkJoin } from 'rxjs';
import { Events } from 'src/app/models/Events';
import { EventsService } from 'src/app/services/events-service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-events',
  templateUrl: './presentation-events.component.html',
  styleUrls: ['./presentation-events.component.scss']
})
export class PresentationEventsComponent implements OnInit {

  apiUrl = environment.apiUrl;
  events: Events[] = []

  content = `<p style="margin-left:0px;">Are you ready to look into the future of cropping systems, meet fellow agricultural students and go on (real-life) excursions? During the International Conference for Youth in Agriculture 2022 (ICYA22) from 10-13th March, we will focus on old and new cropping systems and how they can develop under the topic of "Cropping systems for the future". In times of climate change, biodiversity loss, and changing societal demands, it is worth broadening your scope as a young person in the field of agriculture. ICYA22 will be the place to share your research, engage with others, go on (online) excursions and attend inspiring lectures during the biggest agricultural conference organised by students.</p><p style="margin-left:0px;">There are two options to join ICYA22:</p><p style="margin-left:0px;">In Bonn, Germany, we will welcome a group of 60 young people in the field of agriculture. Here you will get lectures from leading scientists and companies in agriculture. Bonn is located close to exciting institutions and has novel experiments going on. Offline attendance in Bonn starts from €50 to €150 depending on your country category for a three-night stay in Bonn, including food, drinks, accommodation, conference rooms, transportation in Bonn, excursions and the possibility to present your own work during a poster presentation. You can register for offline attendance for ICYA22 in Bonn, Germany, till the 1st of February via this form: <a href="https://forms.gle/xm9uxGrypDMjshH67">LINK</a>.</p><p style="margin-left:0px;">Online attendance is also possible and will be free. If you register, you will have the possibility to follow all the lectures from the conference in Bonn. However, for those that want to present their work and engage more with the offline attendees, it is possible to buy the ICYA+ package, including all kinds of additional extra's, including tools to improve your writing skills. This package will start from €10 to €25, depending on your country category. You can register for online attendance for ICYA 22 till the 1st of March via this form: <a href="https://forms.gle/TZ5RLwXgdPWmynH99">LINK</a>.</p><p style="margin-left:0px;">There are limited packages and spots available for offline attendance. So please don't wait too long and join us for ICYA22!</p><figure class="image"><img src="https://iaas-world-space-prd.s3.ap-south-1.amazonaws.com/uploads/1673196866651-icya2.png"></figure>`

  uploadImageSource = environment.uploadImageSource
  constructor(
    private eventService: EventsService,
    private router: Router, 
              private spinner: Ng4LoadingSpinnerService,
              private auth: UserService, 
              private notifier: NotifierService) { }

  ngOnInit(): void {
    this.spinner.show(); 

    const events = this.eventService.getAllEvents()

    forkJoin([events]).subscribe(data => {
      this.events = data[0].data
      console.log(this.events)
      this.spinner.hide()
    })

    
}

truncateHTML(text: string): string {

  let charlimit = 300;
  if(!text || text.length <= charlimit )
  {
      return text;
  }


let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
let shortened = without_html.substring(0, charlimit) + "...";
return shortened;
}
}