import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-presentation-contact',
  templateUrl: './presentation-contact.component.html',
  styleUrls: ['./presentation-contact.component.scss']
})
export class PresentationContactComponent implements OnInit {

  imageSource = environment.imageSource

  constructor() { }

  ngOnInit(): void {
  }

  executiveBoard = [
    {
      name: "Rabi Raut",
      title: "President of IAAS World",
      img: `/assets/img/president.png`,
      instalink:'https://www.instagram.com/rabi_vk_18/?hl=en',
      linkedinlink:'https://www.linkedin.com/in/rabi-raut-000792221/'
    },
    {
      name: "Yassirys Michelle Sanchez",
      title: "VP of Exchange",
      img: `/assets/img/vp_exchange.png`,
      instalink:'https://instagram.com/yassirys_sanchez?igshid=OGQ5ZDc2ODk2ZA==',
      linkedinlink:'http://www.linkedin.com/in/yassirys-s%C3%A1nchez-5a6a301a2'
    },
    {
      name: "Prem Prakash Budhathoki",
      title: "VP of External Relations",
      img: `/assets/img/vp_external.png`,
      instalink:'https://instagram.com/prem_budhathoki174?igshid=NzZlODBkYWE4Ng==',
      linkedinlink:'https://www.linkedin.com/in/prem-prakash-budhathoki'
    },
    {
      name: "Anggela Diana Teresa Artica",
      title: "VP of Communication",
      img: `/assets/img/vp_comm.jpeg`,
      instalink:'https://www.instagram.com/thepinkcranberry/?hl=en',
      linkedinlink:'https://www.linkedin.com/in/anggela-artica-880b69113/'
    },
    {
      name: "Michele Tredesini",
      title: "VP of Finance",
      img: `/assets/img/vp_finance.jpg`,
      instalink:'https://instagram.com/michele_tredesini?igshid=OGQ5ZDc2ODk2ZA==',
      linkedinlink:null
    },
    {
      name: "Kulayman Conteh",
      title: "Head of Control Board",
      img: `assets/img/cb_head.png`,
      instalink:null,
      linkedinlink:'https://www.linkedin.com/in/kulayman-conteh-8a20b41a3'
    },
    {
      name: "Ole Moors",
      title: "CB of Membership",
      img: `/assets/img/cb_membership.png`,
      instalink:'https://www.instagram.com/ole_moors/',
      linkedinlink:'https://www.linkedin.com/in/ole-moors-9443221b0/'
    },
    {
      name: "Khaoula Boukaici",
      title: "CB of Finance",
      img: `/assets/img/cb_finance.png`,
      instalink:'https://www.instagram.com/khaoula.bk24/',
      linkedinlink:'http://www.linkedin.com/in/khaoula-boukaici-52a142238'
    },
  ]

}
