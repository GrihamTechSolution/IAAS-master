import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Events } from 'src/app/models/Events';
import { EventsService } from 'src/app/services/events-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: Events[] = [];
  uploadImageSource = environment.uploadImageSource


  constructor(private notifier: NotifierService,
              private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getAllEvents().subscribe(data => {
      console.log(data)
      this.events = data.data;
    })
  }

  deleteEvent(id:number) {
    if (confirm("Are you sure?")) {
      this.eventsService.deleteEvent(id).subscribe(data => {
        if (data.success) {
          this.notifier.notify('info', data.message);
          this.ngOnInit();
        }
        else {
          this.notifier.notify('error', data.message);
        }
      })
    }
  }

}
