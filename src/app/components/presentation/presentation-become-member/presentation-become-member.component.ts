import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-presentation-become-member',
  templateUrl: './presentation-become-member.component.html',
  styleUrls: ['./presentation-become-member.component.scss']
})
export class PresentationBecomeMemberComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.prepareAccordion();
  }

  imageSource = environment.imageSource
  
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

}
