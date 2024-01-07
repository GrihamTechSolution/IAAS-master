import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { FaqItem } from '@angular-material-extensions/faq';
import * as $ from 'jquery';
import { FaqCategoryService } from 'src/app/services/faq-category.service';
import { FaqService } from 'src/app/services/faq.service';
import { FAQCategory } from 'src/app/models/FAQCategory';
import { FAQ } from 'src/app/models/FAQ';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-expro-faq',
  templateUrl: './expro-faq.component.html',
  styleUrls: ['./expro-faq.component.scss']
})
export class ExproFaqComponent implements OnInit, AfterViewInit {

  faqCategories: FAQCategory[] = [];
  selectedFAQs: FAQ[] = [];
  allFAQs: FAQ[] = [];
  apiUrl = environment.apiUrl;

  imageSource = environment.imageSource


  constructor(private faqCategoryService: FaqCategoryService, 
              private faqService: FaqService) { }

  ngOnInit() {
    this.faqCategoryService.getFAQCategories().subscribe(data => {
      this.faqCategories = data;
    })
    
    this.faqService.getFaqs().subscribe(data => {
      this.allFAQs = data;
      for(let f of this.allFAQs) {
        f.faqContent.replace('{{apiUrl}}', this.apiUrl.toString());
      }
    })
    this.prepareAccordion();
  }

  ngAfterViewInit(){
    console.log('Render');
    
  }

  selectCat(id){
    this.selectedFAQs = this.allFAQs.filter(e => e.faqCategoryID == id);
    setTimeout(this.prepareAccordion, 1);
  }

  prepareAccordion(){
    if ($('.accordion-box').length) {

      $('.accordion-box .accordion .acc-btn').unbind('click');
      

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
      
      $('p').css({color: 'black !important'});

      // $('.table').css('border-collapse', 'collapse');
      // $('.table').css('border-spacing', 0);
      // $('.table').css('width', '100% !important');
      // $('.table').css('height', '100%');
      // $('.table').css('border', '1px double #b3b3b3');

      $('td').css('min-width', '2em');
      $('td').css('padding', '.4em');
      $('td').css('border', '1px solid #bfbfbf');

      $('tr').css('display', 'table-row');
      $('tr').css('width', '100%');
      $('.acc-content table').css({"color": "black"});

	}
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
