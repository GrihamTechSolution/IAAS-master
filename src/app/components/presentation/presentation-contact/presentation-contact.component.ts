import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-presentation-contact',
  templateUrl: './presentation-contact.component.html',
  styleUrls: ['./presentation-contact.component.scss'],
})
export class PresentationContactComponent implements OnInit {
  imageSource = environment.imageSource;

  constructor() {}

  ngOnInit(): void {}

  
  executiveBoard = [
    {
      name: 'Christopher Sawyer Bateman',
      title: 'President of IAAS World',
      img: `/assets/img/president.jpeg`,
      instalink:
        'https://www.instagram.com/alperenozturrk?igsh=MTZrMW5kZW40NHB0eg==',
      linkedinlink: 'https://www.linkedin.com/in/alperen-%C3%B6zt%C3%BCrk-611b7317a/',
      mail: "president@iaasworld.org"
    },
    {
      name: 'Marco Vinicio López Castillo',
      title: 'VP of Exchange',
      img: `/assets/img/vp_exchange.png`,
      instalink:
        'https://www.instagram.com/mark_lopez_aw?igsh=MXh2MzlyajcxNDQzNw==',
      linkedinlink: null,
      mail: 'vpexchange@iaasworld.org'
    },
    {
      name: 'Sagar Paudel',
      title: 'VP of External Relations',
      img: `/assets/img/vp_external.png`,
      mail: 'vpexternalrelations@iaasworld.org',
      instalink:
        'https://www.instagram.com/radioactive_sagar?igsh=MXIxYWludWR1dGU5Zw==',
      linkedinlink:
        'https://www.linkedin.com/in/paudelsagar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      name: 'S. M. Riaz-us Saleheen',
      title: 'VP of Communication',
      img: `/assets/img/vp_comm.png`,
      // instalink: 'https://www.instagram.com/smr_saleheen?igsh=Mmp1aGhod24zYzBv',
      // linkedinlink:
      //   'https://www.linkedin.com/in/saleheen767?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        mail: 'vpcommunication@iaasworld.org'
    },
    {
      name: 'Claudia Ximena Janampa Mallqui',
      title: 'VP of Finance',
      mail: 'vpfinance@iaasworld.org',
      img: `/assets/img/vp_finance.png`,
      instalink:
        'https://www.instagram.com/claudi_janampa?igsh=YWplaGdjZndveG45',
      linkedinlink:
        'https://www.linkedin.com/in/claudia-ximena-janampa-mallqui-325682228?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      name: 'Jannatul Ferdawsi Miti',
      title: 'Head of Control Board',
      img: `/assets/img/control_board.jpeg`,
      mail: 'controlboard@iaasworld.org',
      instalink:
        'https://www.instagram.com/yassirys_sanchez?igsh=aTIxeDBtcmJzbHZm',
      linkedinlink:
        'www.linkedin.com/in/jannatul-ferdawsi-miti-9a127a252',
    },
    {
      name: 'Insaf Beri',
      title: 'CB of Membership',
      img: `/assets/img/cb_membership.png`,
      mail: 'controlboard@iaasworld.org',
      instalink:
        'https://www.instagram.com/insafberi?igsh=MWU1MmkxeWFtMWRreQ==',
      linkedinlink:
        'https://www.linkedin.com/in/insaf-beri-a7222b219?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      name: 'Hajar Kouryani',
      title: 'CB of Finance',
      mail: 'controlboard@iaasworld.org',
      img: `/assets/img/cb_finance.png`,
      instalink:
        'https://www.instagram.com/hajar_kouryani?igsh=MTAzaW93YTYzZ3NzMw==',
      linkedinlink:
        'https://www.linkedin.com/in/hajar-kouryani-82b988254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
  ];
}
