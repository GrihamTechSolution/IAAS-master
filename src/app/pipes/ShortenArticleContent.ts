import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'shortenArticleContent'
})
export class ShortenArticleContentPipe implements PipeTransform {

  constructor() {}
  transform(value) {
        let startIndex: number = value.indexOf('<p>');
        let endIndex: number = value.indexOf('</p>');
        let shortArticleContent = '';
        let currentArticlePart = '';

        while(shortArticleContent.length < 100 && startIndex >= 0 && endIndex >= 0){
            currentArticlePart = value.substring((startIndex + 3), (endIndex));
            shortArticleContent = shortArticleContent + '<p>' + currentArticlePart.substr(0, 100-shortArticleContent.length) + '</p>';
            value = value.substring(endIndex + 4);
            startIndex = value.indexOf('<p>');
            endIndex = value.indexOf('</p>');
        }

        return shortArticleContent;
  }

}
