import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
//import * as $ from 'jquery';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Country } from 'src/app/models/Country';
import { CountryService } from 'src/app/services/country.service';
import { CountryCategory } from 'src/app/models/CountryCategory';
import { CountryStatus } from 'src/app/models/CountryStatus';
import { environment } from 'src/environments/environment';
import { Region } from 'src/app/models/Region';
import { CountryCategoryService } from 'src/app/services/country-category.service';
import { CountryStatusService } from 'src/app/services/country-status.service';
import { RegionService } from 'src/app/services/region.service';
import { NotifierService } from 'angular-notifier';

declare var $ : any;

@Component({
  selector: 'app-project-network',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

  modalRef: BsModalRef;
  @ViewChild('countryModal')
  countryModal: TemplateRef<any>;

  // colors: 
  // full - #8dc63f
  // candidate - yellow 
  // frozen - blue 
  // other white

  options = {
    map: 'world_mill_en',
    backgroundColor: 'gray',
    series: {
      regions: [{
          values: {
              
          },
          attribute: 'fill'
      }]
    }, 
    onRegionClick: (event, code) => {
      this.c = this.countries.filter(e => e.code.toLowerCase() == code.toLowerCase())[0];
      if (this.c) {
        this.modalRef = this.modalService.show(this.countryModal);
        $('.modal-dialog').css({width: '80%'})
      }
      else {
        this.notifier.notify('success', 'This is not an IAAS country!');
      }
    },
  };

  countries: Country[] = [];
  categories: CountryCategory[] = [];
  statuses: CountryStatus[] = [];
  regions: Region[] = [];
  uploadImageSource = `${environment.uploadImageSource}`;
  c: Country = new Country();

  constructor(private modalService: BsModalService, 
              private countryService: CountryService, 
              private countryCategoryService: CountryCategoryService,
              private countryStatusService: CountryStatusService,
              private regionService: RegionService, 
              private notifier: NotifierService) { }

  ngOnInit(): void {

    this.countryCategoryService.getCountryCategories().subscribe(data => {
      this.categories = data;
    })

    this.countryStatusService.getCountryStatuses().subscribe(data => {
      this.statuses = data;
    })

    this.regionService.getRegions().subscribe(data => {
      this.regions = data;
    })

    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
      let values = {};
      for (let i = 0; i < this.countries.length; i++) {
        let current = this.countries[i];
        switch(current.country_status.id) {
          case 1 : 
            values[current.code.toUpperCase()] = '#8dc63f';
          break;
          case 2: 
            values[current.code.toUpperCase()] = 'blue';
          break;
          case 3:
            values[current.code.toUpperCase()] = 'yellow';
          break;
          
        }

      }

      this.options.series.regions[0].values = values;

      console.log(this.options);
      $('#world-map').vectorMap(this.options);
    })


    
  }
}
