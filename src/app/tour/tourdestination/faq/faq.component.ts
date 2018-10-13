import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IsActive } from '../../../shared/models/dd-isactive/IsActive.model';
import { Destinationfaq } from '../shared/destinationfaq.model';
import { SelectItem } from 'primeng/components/common/selectitem';
import { environment } from '../../../../environments/environment';
import { DestinationfaqService } from '../shared/destinationfaq.service';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  private DropdownIsActiveList = [
    new IsActive(true, "Active"),
    new IsActive(false, "Inactive")
  ];

  private isActiveId: any;

  private faqs: Destinationfaq[] = [];

  private faq: Destinationfaq;

  private selectedFAQs: Destinationfaq[];

  private actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];

  cols: any[] = [
    { field: 'Question', header: 'Question' },
    { field: 'Answer', header: 'Answer' },
    { field: 'OrderNo', header: 'OrderNo' },
    { field: 'IsActive', header: 'Status' }
  ];
  selectedFAQString: string = "";
  nameId: any;
  actionStatus: boolean;

  private buttonName: string = "ADD";

  private showTable: boolean = true;

  private isEqualQuestion: boolean = false;

  private isEqualOrderNo: boolean = false;

  private dfaq = new Destinationfaq();

  // setter(d: Destinationfaq) {
  //   this.dfaq = d;
  // }

  // getter() {
  //   return this.dfaq;
  // }

  readonly defaultImageUrl = environment.DefaultImageTourtype;

  private loading = false;

  constructor(private _fService: DestinationfaqService, private _cService: CommonService
    , private _router: Router) { }

  ngOnInit() {
    this.isActiveId = true;
    this.nameId = '1';
    if (this._cService.destinationId > 0) {
      this.loading = true;
      this.GetFAQList();
    } else {
      $(document).ready(function () {
        $("#destinationNav li").removeClass("active");
        $("#destinationNav li:nth-child(1)").addClass("active");
      });
      this._router.navigate(['tour/tourdestination/form/destination']);
    }
  }

  CustomAction() {
    //console.log(this.nameId);
    if (this.nameId && this.selectedFAQs && this.selectedFAQs.length > 0) {
      if (confirm('Are you sure to perform this action?') == true) {
        this.loading = true;
        this.selectedFAQs.forEach(element => {
          this.selectedFAQString += element.ID + ",";
        });
        this.selectedFAQString = this.selectedFAQString.length > 0 ? this.selectedFAQString.substring(0, this.selectedFAQString.length - 1) : ""

        if (this.nameId == 1 || this.nameId == 2) {
          if (this.nameId == 1)
            this.actionStatus = true;
          else
            this.actionStatus = false;
          // this._fService.ActionStatus(this.selectedFAQString, this.actionStatus).subscribe((data: any) => {
          //   this.GetFAQList();
          // }, (error) => {
          //   console.log(error);
          // });
          this.loading = false;
        }
        else if (this.nameId == 3) {
          // this._fService.ActionDelete(this.selectedFAQString).subscribe((data: any) => {
          //   this.GetFAQList();
          // }, (error) => {
          //   console.log(error);
          // });
          this.loading = false;
        }
        else {
          console.log('select valid action');
          this.loading = false;
        }
        this.selectedFAQString = "";
        this.nameId = -1;
      }
    }
    else {
      alert('Please select atleast one FAQ');
    }
    this.nameId = '1';
  }

  GetFAQList() {
    this._fService.GetDestinationFAQList(this._cService.destinationId).subscribe((data: any) => {
      //console.log(data.data);
      data.data.forEach(element => {
        element.IsActive = element.IsActive == 1 ? true : false;
      });
      this.faqs = data.data;
      this.loading = false;
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  DeleteFAQ(tt) {
    if (confirm('Are you sure to delete this record?') == true) {
      this.loading = true;
      this._fService.DeleteDestinationFAQ(tt).subscribe((data: any) => {
        this.GetFAQList();
      }, (error) => {
        console.log(error);
        this.loading = false;
      });
    }
  }

  SaveFAQDetails() {
    this.dfaq.IsActive = this.isActiveId;
    this.dfaq.DestinationID = this._cService.destinationId;
    if (this.dfaq.Question && this.dfaq.Question.trim() == "") {
      alert('Please enter question.');
    }
    else if (this.dfaq.Answer && this.dfaq.Answer.trim() == "") {
      alert('Please enter answer.');
    }
    else if (this.dfaq.OrderNo <= 0) {
      alert('Please enter order number more than 0');
    }
    else {
      this.loading = true;
      if (this.faqs && this.faqs.length > 0) {
        this.faqs.forEach(element => {
          if (element.Question == this.dfaq.Question) {
            this.isEqualQuestion = true;
          }
          if (element.OrderNo == this.dfaq.OrderNo) {
            this.isEqualOrderNo = true;
          }
        });
      }
      if (this.isEqualQuestion) {
        this.loading = false;
        alert('Question already exists');
        this.isEqualQuestion = false;
        this.isEqualOrderNo = false;
      }
      else if (this.isEqualOrderNo) {
        this.loading = false;
        alert('Order number already exists');
        this.isEqualQuestion = false;
        this.isEqualOrderNo = false;
      }
      else {
        if (this.dfaq.ID != undefined && this.dfaq.ID > 0) {
          this._fService.UpdateDestinationFAQ(this.dfaq).subscribe((data: any) => {
            this.faqs = data.data;
            this.loading = false;
          }, (error) => {
            console.log(error);
            this.loading = false;
          });
        }
        else {
          this._fService.InsertDestinationFAQ(this.dfaq).subscribe((data: any) => {
            this.faqs = data.data;
            this.loading = false;
          }, (error) => {
            console.log(error);
            this.loading = false;
          });
        }
        this.CancelForm();
      }
    }
  }


  UpdateFAQ(ufaq) {
    //this.isActiveId = ufaq.IsActive == 1 || true ? true : false;
    if (ufaq.IsActive === true || ufaq.IsActive === 1)
      this.isActiveId = true;
    else
      this.isActiveId = false;
    this.dfaq.ID = ufaq.ID;
    this.dfaq.Question = ufaq.Question;
    this.dfaq.Answer = ufaq.Answer;
    this.dfaq.OrderNo = ufaq.OrderNo;
    this.dfaq.IsActive = this.isActiveId;
    this.buttonName = "UPDATE";
  }


  CancelForm() {
    this.dfaq = new Destinationfaq();
    //this.faqs = [];    
    this.isActiveId = true;
    this.isEqualOrderNo = false;
    this.isEqualQuestion = false;
    this.buttonName = "ADD";
    //this.GetFAQList();
  }


  PreviousFAQ() {
    $(document).ready(function () {
      $("#destinationNav li").removeClass("active");
      $("#destinationNav li:nth-child(3)").addClass("active");
    });
    this._router.navigate(['tour/tourdestination/form/ieclusion']);
  }

  NextFAQ() {
    $(document).ready(function () {
      $("#destinationNav li").removeClass("active");
      $("#destinationNav li:nth-child(5)").addClass("active");
    });
    this._router.navigate(['tour/tourdestination/form/document']);
  }
}
