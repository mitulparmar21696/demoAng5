import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-package-form',
  templateUrl: './package-form.component.html',
  styleUrls: ['./package-form.component.css']
})
export class PackageFormComponent implements OnInit {

  settingLinks: Array<Object> = [];

  private dId: number = 0;

  constructor(private _cService: CommonService) { }

  ngOnInit() {
    this.dId = this._cService.packageId;
    this.settingLinks = [
      {
        label: 'Package',
        link: 'package',
        isActive: true
      },
      {
        label: 'Package Rate',
        link: 'packagerate',
        isActive: true
      },
      {
        label: 'Itinerary',
        link: 'itinerary',
        isActive: true
      },
      {
        label: 'Itinerary Photos',
        link: 'itineraryphotos',
        isActive: true
      },
      {
        label: 'Package Hotel',
        link: 'packagehotel',
        isActive: true
      },
      {
        label: 'Inclusion & Exclusion',
        link: 'packageinclusion',
        isActive: true
      },
      {
        label: 'Package FAQ',
        link: 'packagefaq',
        isActive: true
      },
      // {
      //   label: 'Tour Info',
      //   link: 'packagetourinfo',
      //   isActive: true
      // },
      {
        label: 'Support',
        link: 'packagesupport',
        isActive: true
      },
    ];
    if (this.dId <= 0) {
      this.settingLinks.forEach((element: any) => {
        if (element.link != "package") {
          element.isActive = false;
        }
      });
    }

    $(document).on('click', '#packageNav li', function () {
      $("#packageNav li").removeClass("active");
      $(this).addClass("active");
    });
  }

}
