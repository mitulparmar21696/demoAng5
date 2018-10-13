import { Component, OnInit, ViewChild } from '@angular/core';
import { Cartype } from '../shared/cartype.model';
import { CartypeService } from '../shared/cartype.service';
import { Router } from '@angular/router';
import { HeaderVariableService } from '../../../shared/services/headervariable/headervariable.service';
import { IsActive } from '../../../shared/models/dd-isactive/IsActive.model';


@Component({
  selector: 'app-cartype-form',
  templateUrl: './cartype-form.component.html',
  styleUrls: ['./cartype-form.component.css']
})
export class CartypeFormComponent implements OnInit {


  //FOR INPUT RESET
  @ViewChild('carTypeImage')
  carTypeImage: any;

  private cartype: Cartype;

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

  constructor(private _ttService: CartypeService, private _router: Router, private _sharedHeaderService: HeaderVariableService) {
    this.isActiveId = true;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
   this.cartype = this._ttService.getter();
    if (this.cartype.ID == undefined) {
      this.buttonName = 'Add';
    } else {
      this.buttonName = 'Update';
    }
    if (this.cartype.IsActive !== undefined) {
      if (this.cartype.IsActive == true) {
        this.isActiveId = true;
      } else {
        this.isActiveId = false;
      }
    }
    this._sharedHeaderService.sharedHeaderString = 'Car Type';
  }

  onChange(event) {
    var files = event.srcElement.files;
    if( files[0].type  == 'image/png' ||  files[0].type == 'image/jpg'  ||  files[0].type == 'image/jpeg') {
      this.isInvalidFile = false;
      this.formData.append('Data', files[0], files[0].name);    
    }
    else {
      alert("Only Image files can be uploaded");
      this.resetImage();
      this.isInvalidFile = true;
      return this.isInvalidFile;
      
    }
  }


  processForm() {
    this.isClickedOnce = true;
    const cartypeName = $('#ttName').val().toString();
    if ($.trim(cartypeName) === '') {
     this.cartype.Name = '';
      alert('Please add car type name.');
    } else {
     this.cartype.IsActive = this.isActiveId;
      if (this.cartype.ID === undefined) {
        this._ttService.InsertCartype(this.cartype).subscribe((tt: any) => {
          if (tt.status === 200 || tt.status === '200') {
            
            this.UploadImageAfterInsert(tt.data[0].ID);
            
            this._ttService.setCarTypes(tt.data);
            this._router.navigate(['/manage/car_type']);
          } else {
            alert('Car type is already exist.');
            console.log('Car type is already exist.');
          }
        }, (error) => {
          console.log(error);
        });
      } else {
        this._ttService.UpdateCartype(this.cartype).subscribe((tt: any) => {
          // console.log(tt);
          if (tt.status === 200 || tt.status === '200') {
            this.UploadImageAfterInsert(this.cartype.ID);
            
            this._ttService.setCarTypes(tt.data);

            this._router.navigate(['/manage/car_type']);
          } else {
            alert('Car type is alrady exist.');
            console.log('Car type is already exist.');
          }
        }, (error) => {
          console.log(error);
        });
      }
    }
    this.isClickedOnce = false;
  }

  BackToCarType() {
    this._router.navigate(['/manage/car_type']);

  }

  UploadImageAfterInsert(id) {
    this._ttService.UploadImage(id, this.formData).subscribe((data: any) => {
      return data;
    }, (error) => {
      console.log(error);
    });
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


  resetImage() {
    console.log(this.carTypeImage.nativeElement.files);
    this.carTypeImage.nativeElement.value = "";
    console.log(this.carTypeImage.nativeElement.files);
}
}
