import { Component, OnInit } from '@angular/core';
import { Setting } from '../shared/setting.model';
import { SettingService } from '../shared/setting.service';
import { Router } from '@angular/router';
import { HeaderVariableService } from '../../../shared/services/headervariable/headervariable.service';
import { IsActive } from '../../../shared/models/dd-isactive/IsActive.model';

@Component({
  selector: 'app-setting-form',
  templateUrl: './setting-form.component.html',
  styleUrls: ['./setting-form.component.css']
})
export class SettingFormComponent implements OnInit {

  private setting: Setting;

  selectedDropwdownValue: IsActive = new IsActive(true, 'Active');

  private buttonName: string = 'Add';

  private isClickedOnce: boolean = false;

  private isInvalidFile: boolean = false;

  private DropdownIsActiveList = [
    new IsActive(true, 'Active'),
    new IsActive(false, 'Inactive')
  ];

  formData = new FormData();

  private isActiveId: any;
  loading:any;
  constructor(private _ttService: SettingService, private _router: Router, private _sharedHeaderService: HeaderVariableService) {
    this.isActiveId = true;
    this.loading=false;
  }

  ngOnInit() {
    this.setting = this._ttService.getter();
    if (this.setting.ID == undefined) {
      this.buttonName = 'Add';
    } else {
      this.buttonName = 'Update';
    }
    if (this.setting.IsActive !== undefined) {
      if (this.setting.IsActive == true) {
        this.isActiveId = true;
      } else {
        this.isActiveId = false;
      }
    }
    this._sharedHeaderService.sharedHeaderString = 'Setting';
  }
  onChange(event) {
    const files = event.srcElement.files;

    if (!this.validateFile(files[0].name)) {

      this.isInvalidFile = true;
      return this.isInvalidFile;
    }
    this.isInvalidFile = false;
    this.formData.append('Data', files[0], files[0].name);
  }

  // onSelect(IsActiveIds) {
  //   this.selectedDropwdownValue = null;
  //   for (var i = 0; i < this.DropdownIsActiveList.length; i++) {
  //     if (this.DropdownIsActiveList[i].id == IsActiveIds) {
  //       this.selectedDropwdownValue = this.DropdownIsActiveList[i];
  //     }
  //   }
  // }

  processForm() {
    this.loading=true;
    this.isClickedOnce = true;
    const settingkey = $('#ttName').val().toString();
    const settingttvalue = $('#ttvalue').val().toString();
    if ($.trim(settingkey) === '') {
     this.setting.SettingKey = '';
     this.loading=false;
      alert('Please add settings key.');
    } else {
      if ($.trim(settingttvalue) === '') {
        this.setting.Value = '';
        this.loading=false;
         alert('Please add settings value.');
       } else {
     this.setting.IsActive = this.isActiveId;
      if (this.setting.ID === undefined) {
        this._ttService.InsertSetting(this.setting).subscribe((tt: any) => {
          if (tt.status === 200 || tt.status === '200') {
            alert(tt.message);
            this.loading=false;
            this._router.navigate(['/settings/settings']);
          } else {
            this.loading=false;
            alert('Setting is already exist.');
            console.log('Setting is already exist.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      } else {
        this._ttService.UpdateSetting(this.setting).subscribe((tt: any) => {
          // console.log(tt);
          if (tt.status === 200 || tt.status === '200') {
            alert(tt.message);
            this.loading=false;
            this._router.navigate(['/settings/settings']);
          } else {
            this.loading=false;
            alert('Setting is already exist.');
            console.log('Setting is already exist.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      }
    }
    }
    this.isClickedOnce = false;
  }

  BackTosetting() {
    this._router.navigate(['/settings/setting']);

  }

  

  validateFile(name: String) {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() === 'png' || ext.toLowerCase() === 'jpg'
      || ext.toLowerCase() === 'jpeg' || ext.toLowerCase() === 'img') {
      return true;
    } else {
      return false;
    }
  }
}
