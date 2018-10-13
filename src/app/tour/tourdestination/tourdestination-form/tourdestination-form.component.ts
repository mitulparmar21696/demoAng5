import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-tourdestination-form',
  templateUrl: './tourdestination-form.component.html',
  styleUrls: ['./tourdestination-form.component.css']
})
export class TourdestinationFormComponent implements OnInit {

  settingLinks: Array<Object> = [];

  private dId: number = 0;

  constructor(private _cService: CommonService) { }

  ngOnInit() {
    this.dId = this._cService.destinationId;
    this.settingLinks = [
      {
        label: 'Destination',
        link: 'destination',
        isActive: true
      },
      {
        label: 'Destination Images',
        link: 'images',
        isActive: true
      },
      {
        label: 'Inclusion Exclusion',
        link: 'ieclusion',
        isActive: true
      },
      {
        label: 'FAQ',
        link: 'faq',
        isActive: true
      },
      {
        label: 'T&C',
        link: 'document',
        isActive: true
      },
    ];
    if (this.dId <= 0) {
      this.settingLinks.forEach((element: any) => {
        if (element.link != "destination") {
          element.isActive = false;
        }
      });
    }

    $(document).on('click', '#destinationNav li', function () {
      $("#destinationNav li").removeClass("active");
      $(this).addClass("active");
    });
  }



}
