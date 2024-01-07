import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Region } from 'src/app/models/Region';
import { Country } from 'src/app/models/Country';
import { RegionService } from 'src/app/services/region.service';
import { CountryService } from 'src/app/services/country.service';
import { environment } from 'src/environments/environment';
import { CountryCategory } from 'src/app/models/CountryCategory';
import { CountryStatus } from 'src/app/models/CountryStatus';
import { CountryStatusService } from 'src/app/services/country-status.service';
import { CountryCategoryService } from 'src/app/services/country-category.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotifierService } from 'angular-notifier';

declare var $: any;

@Component({
  selector: 'app-expro-countries',
  templateUrl: './expro-countries.component.html',
  styleUrls: ['./expro-countries.component.scss']
})
export class ExproCountriesComponent implements OnInit {

  @ViewChild('countryModal')
  countryModal: TemplateRef<any>;

  modalRef: BsModalRef;

  regions: Region[] = [];
  countries: Country[] = [];
  helperCountries: Country[] = [];
  regionID: number;
  selectedCountry: Country = new Country();
  categories: CountryCategory[] = [];
  statuses: CountryStatus[] = [];
  c: Country = new Country();

  uploadImageSource = environment.uploadImageSource;

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
      console.log(this.c)
      if(this.c && this.c.isActive) {
        this.modalRef = this.modalService.show(this.countryModal);
        $('.modal-dialog').css({width: '80%'})
      }
      else {
        this.notifier.notify('success', 'This is not an IAAS country!');
      }
    },
  };

  constructor(private regionService: RegionService, 
              private countryService: CountryService,
              private countryStatusService: CountryStatusService,
              private countryCategoryService: CountryCategoryService,
              private modalService: BsModalService, 
              private notifier: NotifierService) { }

  ngOnInit(): void {

    this.countryStatusService.getCountryStatuses().subscribe(data => {
      this.statuses = data;
    })

    this.countryCategoryService.getCountryCategories().subscribe(data => {
      this.categories = data;
    })

    this.regionService.getRegions().subscribe(data => {
      this.regions = data;
    })

    this.countryService.getCountries().subscribe(data => {
      this.countries = data;

      let values = {};
      for (let i = 0; i < this.countries.length; i++) {
        let current = this.countries[i];
        if(current.isActive) {
          // eval("values." + current.code.toUpperCase() + " = '#8dc63f'");
          values[current.code.toUpperCase()] = '#8dc63f';
        }
      }
      this.options.series.regions[0].values = values;
      $('#world-map').vectorMap(this.options);
    })

    
  }

  filterByRegion() {
    this.helperCountries = this.countries.filter(e => e.regionID == this.regionID);
    setTimeout(this.prepareAccordion, 1);
  }

  prepareAccordion(){
    if ($('.accordion-box').length) {
	    $('.accordion-box .accordion .acc-btn').click(function() {
	        if ($(this).hasClass('active') !== true) {
	            $('.accordion-box .acc-btn').removeClass('active');
	        }

	        if ($(this).next('.acc-content').is(':visible')) {
	            $(this).removeClass('active');
	            $(this).next('.acc-content').slideUp(500);
	        } else {
	            $(this).addClass('active');
	            $('.accordion-box .acc-content').slideUp(500);
	            $(this).next('.acc-content').slideDown(500);
	        }
	    });
	}
  }

  showCountryDetails(id: number){
    this.selectedCountry = this.countries.filter(e => e.id == id)[0];
    console.log(this.selectedCountry);
  }

  apply(){
    if (confirm("Are you sure?")) {
      
    }
  }

}
