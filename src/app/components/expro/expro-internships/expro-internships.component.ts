import { Component, OnInit } from '@angular/core';
import { InternshipService } from 'src/app/services/internship.service';
import { Internship } from 'src/app/models/Internship';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Region } from 'src/app/models/Region';
import { RegionService } from 'src/app/services/region.service';
import { Country } from 'src/app/models/Country';
import { CountryService } from 'src/app/services/country.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-expro-internships',
  templateUrl: './expro-internships.component.html',
  styleUrls: ['./expro-internships.component.scss']
})
export class ExproInternshipsComponent implements OnInit {

  internships: Internship[] = [];
  filteredInternships: Internship[] = [];
  regions: Region[] = [];
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  internshipTypes: {id, name}[] = [{id: 2, name: 'Libertas'}, {id: 1, name: 'Archimedes'}, {id: 3, name: 'Ceres'}]; 
  selectedRegionID: number;
  selectedCountryID: number;
  selectedInternshipTypeID: number;

  imageSource = environment.imageSource
  uploadImageSource = environment.uploadImageSource

  constructor(private internshipService: InternshipService,
              private spinner: Ng4LoadingSpinnerService,
              private regionService: RegionService,
              private countryService: CountryService) { }

  ngOnInit(): void {
    this.spinner.show();

    this.regionService.getRegions().subscribe(data => {
      this.regions = data;
    })

    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
      this.filteredCountries = data;
    })

    this.internshipService.getInternships().subscribe(data => {
      if ( data && data.length > 0 )
      {
        this.internships = data.filter(internship => internship.isShown);
        this.filteredInternships = this.internships;
        console.log(this.filteredInternships)
      }
      
      this.spinner.hide();
    })
  }

  filterCountries(){
    if (this.selectedRegionID) {
      this.selectedCountryID = null;
      this.filteredCountries = this.countries.filter(e => e.regionID == this.selectedRegionID);
    }
    else {
      this.filteredCountries = this.countries;
    }
  }

  filterInternships(){
    if (this.selectedCountryID) {
      this.filteredInternships = this.internships.filter(e => e.countryID == this.selectedCountryID);
    }
    else {
      //this.filteredInternships = this.internships;
      this.filteredInternships = this.internships.filter(e => this.filteredCountries.map(country => country.id).indexOf(e.countryID) > -1);
    }

    if (this.selectedInternshipTypeID) 
      this.filteredInternships = this.filteredInternships.filter(e => e.typeID == this.selectedInternshipTypeID);
  }

}
