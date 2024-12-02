import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { Country } from 'src/app/models/Country';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { CountryCategoryService } from 'src/app/services/country-category.service';
import { CountryStatusService } from 'src/app/services/country-status.service';
import { RegionService } from 'src/app/services/region.service';
import { CountryCategory } from 'src/app/models/CountryCategory';
import { CountryStatus } from 'src/app/models/CountryStatus';
import { Region } from 'src/app/models/Region';
import { Partner } from 'src/app/models/Partner';
import { Sponsor } from 'src/app/models/Sponsor';
import { PartnerService } from 'src/app/services/partner.service';
import { SponsorService } from 'src/app/services/sponsor.service';
import { forkJoin } from 'rxjs';
import { NotifierService } from 'angular-notifier';
declare var $: any;

@Component({
  selector: 'app-presentation-about-us',
  templateUrl: './presentation-about-us.component.html',
  styleUrls: ['./presentation-about-us.component.scss'],
})
export class PresentationAboutUsComponent implements OnInit {
  membersCount = {
    countTo: 10000,
    from: 0,
    duration: 2,
  };

  countriesCount = {
    countTo: 50,
    from: 0,
    duration: 2,
  };

  partnersCount = {
    countTo: 100,
    from: 0,
    duration: 2,
  };

  alumniCount = {
    countTo: 100000,
    from: 0,
    duration: 2,
  };

  options = {
    map: 'world_mill_en',
    backgroundColor: 'gray',
    series: {
      regions: [
        {
          values: {},
          attribute: 'fill',
        },
      ],
    },
    onRegionClick: (event, code) => {
      this.c = this.countries.filter(
        e => e.code.toLowerCase() == code.toLowerCase()
      )[0];
      if (this.c) {
        this.modalRef = this.modalService.show(this.countryModal);
        $('.modal-dialog').css({ width: '80%' });
      } else {
        this.notifier.notify('success', 'This is not an IAAS country!');
      }
    },
  };

  countries: Country[] = [];
  c: Country = new Country();
  modalRef: BsModalRef;
  @ViewChild('countryModal')
  countryModal: TemplateRef<any>;
  apiStaticUrl = `${environment.apiUrl}/`;
  categories: CountryCategory[] = [];
  statuses: CountryStatus[] = [];
  regions: Region[] = [];
  apiUrl = environment.apiUrl;
  imageSource = environment.imageSource;
  uploadImageSource = environment.uploadImageSource;

  sliderPartners: Partner[] = [];
  sliderSponsors: Sponsor[] = [];

  constructor(
    private countryService: CountryService,
    private modalService: BsModalService,
    private countryCategoryService: CountryCategoryService,
    private countryStatusService: CountryStatusService,
    private regionService: RegionService,
    private partnersService: PartnerService,
    private sponsorsService: SponsorService,
    private notifier: NotifierService
  ) {}

  ngOnInit(): void {
    this.countryCategoryService.getCountryCategories().subscribe(data => {
      this.categories = data;
    });

    this.countryStatusService.getCountryStatuses().subscribe(data => {
      this.statuses = data;
    });

    this.regionService.getRegions().subscribe(data => {
      this.regions = data;
    });

    this.countryService.getCountries().subscribe(data => {
      this.countries = data;

      let values = {};
      for (let i = 0; i < this.countries.length; i++) {
        let current = this.countries[i];
        switch (current.country_status.id) {
          case 1:
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
    });

    let partnersObs = this.partnersService.getPartners();
    let sponsorsObs = this.sponsorsService.getSponsors();

    forkJoin([partnersObs, sponsorsObs]).subscribe(data => {
      this.sliderPartners = data[0].filter(p => p.isShown == 1);
      this.sliderSponsors = data[1].filter(s => s.isShown == 1);

      setTimeout(function () {
        // $('.carousel-showmanymoveone .item').each(function(){
        //   var itemToClone = $(this);

        //   for (var i=1;i<6;i++) {
        //     itemToClone = itemToClone.next();

        //     // wrap around if at end of item collection
        //     if (!itemToClone.length) {
        //       itemToClone = $(this).siblings(':first');
        //     }

        //     // grab item, clone, add marker class, add to collection
        //     // console.log("THIS");
        //     // itemToClone.children(':first-child').clone()
        //     //   .addClass("cloneditem-"+(i))
        //     //   .appendTo($(this));
        //   }
        // });

        $('.carousel').carousel({
          interval: 1500,
        });
      }, 100);
    });
  }
}
