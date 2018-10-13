import { Component, OnInit } from '@angular/core';
import { Attraction, City, AttractionType } from '../shared/attraction.model';
import { AttractionService } from '../shared/attraction.service';
import { Router } from '@angular/router';
import { HeaderVariableService } from '../../../shared/services/headervariable/headervariable.service';
import { IsActive } from '../../../shared/models/dd-isactive/IsActive.model';
import { CountryService } from '../../../manage/country/shared/country.service';
import { Country } from '../../../manage/country/shared/country.model';
import { StateService } from '../../../manage/state/shared/state.service';
import { State } from '../../../manage/state/shared/state.model';

@Component({
  selector: 'app-attraction-form',
  templateUrl: './attraction-form.component.html',
  styleUrls: ['./attraction-form.component.css']
})
export class AttractionFormComponent implements OnInit {

  private attraction: Attraction;

  selectedDropwdownValue: IsActive = new IsActive(true, 'Active');

  private buttonName: string = 'Add';

  private isClickedOnce: boolean = false;

  private isInvalidFile: boolean = false;

  private DropdownIsActiveList = [
    new IsActive(true, 'Active'),
    new IsActive(false, 'Inactive')
  ];

  formData = new FormData();
  countries: Country[] = [];
  city: City[] = [];
  state: State[] = [];
  attractiontypes: AttractionType[] = [];
  private isActiveId: any;
  private tttype: any;
 
  private ttcountry: any;
  private ttstate: any;
  private ttcity: any;
  private ttfacility: any;

  private imageArray:any;
  private toSendObj:any;
  private countImage:any;
  private attractionDet:any;
  private imageObj:any;
  loading:any;
  selectedGame: Object = {};
  constructor(private _ttService: AttractionService,  private _stateService: StateService,   private _countryService: CountryService, private _router: Router, private _sharedHeaderService: HeaderVariableService) {
    this.isActiveId = true;
    this.tttype = 0;
  
    this.ttcountry = 0;
    this.ttstate = 0;
    this.ttcity = 0;
    this.ttfacility = 0;

    this.imageArray=[];
    this.attractionDet={};
    this.toSendObj={};
    this.countImage=0;
    this.imageObj='';
    this.loading=false;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this._countryService.Getlistingcountry().subscribe((data: any)=> {
      this.countries = data.data 
    })
    this._ttService.GetAttractionType().subscribe((data: any)=> {
      this.attractiontypes = data.data 
    })
   
   
    // Getcountrywisestatelist
   this.attraction = this._ttService.getter();
    if (this.attraction.ID == undefined) {
      this.buttonName = 'Add';
      
    } else {
      this.tttype = this.attraction.AttractionTypeID;
    
      this.ttcountry = this.attraction.CountryID;
      this.ttstate = this.attraction.StateID;
      this.ttcity = this.attraction.CityID;
      this.imageObj=this.attraction.Image
      this._ttService.GetCountryWiseState(this.ttcountry).subscribe((data: any) => {
       
        this.state = data.data;
      }, (error) => {
        console.log(error);
      });
      this._ttService.Getstatewisecity(this.ttstate).subscribe((data: any) => {
    
        this.city = data.data;
      }, (error) => {
        console.log(error);
      });
      this.buttonName = 'Update';
      this.getAttractionImag()
      this.attractionDet.attractionId=this.attraction.ID;
      this.attractionDet.attractionName=this.attraction.AttractionName;
    }
    if (this.attraction.IsActive !== undefined) {
      if (this.attraction.IsActive == true) {
        this.isActiveId = true;
      } else {
        this.isActiveId = false;
      }
    }
    this._sharedHeaderService.sharedHeaderString = 'Attraction';
  }
  getAttractionImag(){
    debugger
    this.toSendObj={
      attractionId:this.attraction.ID,
      attractionName:this.attraction.AttractionName
    };
    this._ttService.getAttractionImage(this.toSendObj).subscribe((data: any) => {
      debugger
    this.imageArray=data.data;
    this.imageArray.forEach(element => {
      if(element.IsMain==1){
        element.isChecked=true;
      }else{
        element.isChecked=false;
      }
    });
    }, (error) => {
      console.log(error);
    });
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
  onFileChanged(files){
    // this.imageArray = files.target.files;
    var imgArr=[]
    debugger
    imgArr = files.target.files;
    for(var i=0;i<imgArr.length;i++){
      debugger
      imgArr[i].isNew=true;
      this.imageArray.push(imgArr[i])
    }
    var urls=[];
    if (files) {
      
      for (let file of this.imageArray) {
        debugger
        if(file.isNew){
          debugger
        let reader = new FileReader();
        reader.onload = (e: any) => {
            file.isChecked=false;
            file.ImageName=e.target.result;
          }
        
        reader.readAsDataURL(file);
        }
      }
    }
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  processForm() {
    this.isClickedOnce = true;
    this.loading=true;
    const attractionName = $('#AttractionName').val().toString();
   
   
    if ($.trim(attractionName) === '') {
     this.attraction.AttractionName = '';
     this.loading=false;
      alert('Please add Attraction name.');
    } else {
      if (this.tttype=== 0) {
        this.attraction.AttractionType = '';
        this.loading=false;
         alert('Please select Attraction type.');
       } else {
        if (this.ttcountry === 0) {
          this.attraction.CountryID = 0;
          this.loading=false;
           alert('Please select country.');
         } else {
          if (this.ttstate === 0) {
            this.attraction.StateID = 0;
            this.loading=false;
             alert('Please select state.');
           } else {
            if (this.ttcity === 0) {
              this.attraction.CityID = 0;
              this.loading=false;
               alert('Please select city.');
             } else {
                this.attraction.IsActive = this.isActiveId;
              
                if (this.attraction.ID === undefined) {
                  this.attraction.AttractionTypeID = this.tttype;
                  
                  this.attraction.CountryID = this.ttcountry;
                  this.attraction.StateID = this.ttstate;
                  this.attraction.CityID = this.ttcity;
                  this._ttService.InsertAttraction(this.attraction).subscribe((tt: any) => {
                    if (tt.status === 200 || tt.status === '200') {

                      tt.data.forEach(element => {
                        if(element.AttractionName==this.attraction.AttractionName){
                          this.attractionDet.attractionId=element.ID;
                          this.attractionDet.attractionName=this.attraction.AttractionName;
                        }
                      });
                      alert(tt.message);
                      // this.UploadImageAfterInsert(tt.data[0].ID);
                      this.uploadImage()
                      // this._router.navigate(['/attraction/attractiondetails']);
                    } else {
                      this.loading=false;
                      alert('Attraction is already exist.');
                      console.log('Attraction is already exist.');
                    }
                  }, (error) => {
                    this.loading=false;
                    console.log(error);
                  });
                } else {
                  this.attraction.AttractionTypeID = this.tttype;
                  
                  this.attraction.CountryID = this.ttcountry;
                  this.attraction.StateID = this.ttstate;
                  this.attraction.CityID = this.ttcity;
                  this._ttService.UpdateAttraction(this.attraction).subscribe((tt: any) => {
                    // console.log(tt);
                    if (tt.status === 200 || tt.status === '200') {
                      debugger
                      this.attractionDet.attractionId=this.attraction.ID;
                      this.attractionDet.attractionName=this.attraction.AttractionName;
                      alert(tt.message);
                      this.uploadImage()
                      // this.UploadImageAfterInsert(this.attraction.ID);
                      // this.loading=false;
                      // this._router.navigate(['/attraction/attractiondetails']);
                    } else {
                      this.loading=false;
                      alert('Attraction is already exist.');
                      console.log('Attraction is already exist.');
                    }
                  }, (error) => {
                    this.loading=false;
                    console.log(error);
                  });
                }
              }
            }
          }
        }
      }
    this.isClickedOnce = false;
  }
  uploadImage(){

    var array = this.imageArray[this.countImage];
    debugger
    if(array.isNew){
      let forData:FormData = new FormData();
      // var forData= new FormData()
      forData.append('Data', array, array.name);
      this.toSendObj={
        attractionId:this.attractionDet.attractionId,
        Name:this.imageArray[this.countImage].name,
        attractionName:this.attractionDet.attractionName,
        operationtype:'insert',
        Ismain:1
      }
      if(array.isChecked == true){
        this.toSendObj.Ismain= 1;
      }else{
        this.toSendObj.Ismain= 0;
      }
      
      this._ttService.UploadAttractionImage(this.toSendObj,forData).subscribe((data: any) => {
        
        this.countImage++
        if(this.imageArray.length > this.countImage){
          
          this.uploadImage()
        }else{
          this.loading=false;
          this._router.navigate(['/attraction/attractiondetails']);
        }
        // return data;
      }, (error) => {
        this.loading=false;
        console.log(error);
      })
    }else{
      this.countImage++
      if(this.imageArray.length > this.countImage){
        
        this.uploadImage()
      }else{
        this.loading=false;
        this._router.navigate(['/attraction/attractiondetails']);
      }

    }
 
  }

  BackToAttraction() {
    this._router.navigate(['/attraction/attractiondetails']);

  }

  deleteAttractionImg(img,index){
    if(img.isNew){
      this.imageArray.splice(index,1)
    }else{
      var obj={
        imageId:img.ID,
        attractionId:this.attractionDet.attractionId,
        attractionName:this.attractionDet.attractionName,
      }
      this._ttService.deleteAttractionImage(obj).subscribe((data: any)=> {
        debugger
        this.imageArray.splice(index,1)
       debugger
      })
    }
    
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

  Getcountrywisestatelist(event) {
    this._ttService.GetCountryWiseState(event).subscribe((data: any) => {
    
      this.state = data.data;
      this.ttstate = 0;
      this.ttcity = 0;
    }, (error) => {
      console.log(error);
    });
  }
  Getstatewisecitylist(event) {
    this._ttService.Getstatewisecity(event).subscribe((data: any) => {
    
      this.city = data.data;
      this.ttcity = 0;
    }, (error) => {
      console.log(error);
    });
  }

}
