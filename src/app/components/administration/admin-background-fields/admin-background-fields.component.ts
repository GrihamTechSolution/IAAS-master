import { Component, OnInit } from '@angular/core';
import { BackgroundField } from 'src/app/models/BackgroundField';
import { BackgroundFieldService } from 'src/app/services/background-field.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-admin-background-fields',
  templateUrl: './admin-background-fields.component.html',
  styleUrls: ['./admin-background-fields.component.scss']
})
export class AdminBackgroundFieldsComponent implements OnInit {

  backgroundFields: BackgroundField[] = [];
  field: BackgroundField = new BackgroundField();
  edit: boolean = false;

  constructor(private backgroundFieldService: BackgroundFieldService,
              private modalService: NgbModal,
              private notifier: NotifierService) { }

  ngOnInit(): void {
    this.backgroundFieldService.getBackgroundFields().subscribe(data => {
      this.backgroundFields = data;
    })
  }

  validateInput(){
    if (!this.field.name) {
      this.notifier.notify('error', 'Please insert field name!');
      return;
    }

    if (this.edit){
      this.backgroundFieldService.updateBackgroundField(this.field).subscribe(data => {
        if (data.status == 0){
          this.notifier.notify('success', 'Field updated!');
          this.field = new BackgroundField();
          this.edit = false;
        }
        else {
          this.notifier.notify('error', 'Error while updating field!');
        }
      })
    }
    else {
      this.backgroundFieldService.insertBackgroundField(this.field).subscribe(data => {
        if (data.status == 0){
          this.notifier.notify('success', 'Field inserted!');
          this.ngOnInit();
        }
        else {
          this.notifier.notify('error', 'Error while inserting field!');
        }
      })
    }
  }

  prepareForEdit(field){
    this.field = field;
    this.edit = true;
  }
}
