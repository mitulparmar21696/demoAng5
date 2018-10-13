import { Component, OnInit } from '@angular/core';
import {BookingService} from '../shared/booking.service'
@Component({
  selector: 'app-booking-listing',
  templateUrl: './booking-listing.component.html',
  styleUrls: ['./booking-listing.component.css']
})
export class BookingListingComponent implements OnInit {
  private bookings:any;
  private loading:any;
  private cols: any[] = [
    { field: 'UserName', header: 'USer Name' },
    { field: 'PackageName', header: 'Package Name' },
    { field: 'BookingRefNo', header: 'Booking Ref.' },
    { field: 'DepartureDatetime', header: 'Depart. Date' },
    { field: 'Email', header: 'Email' },
    { field: 'EndDate', header: 'End Date' },
    { field: 'IsActive', header: 'Status' },
  ];
  constructor(private _ttService:BookingService) {
    this.bookings=[]
    this.loading=false;
   }

  ngOnInit() {
    this.loading=true;
    this.getBookingList();
  }
  getBookingList(){
    this._ttService.getBookingList().subscribe((data: any) => {
      this.bookings=data.data;
      this.loading=false;
    }, (error) => {
      console.log(error);
    });
  }

}
