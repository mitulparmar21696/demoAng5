import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ArrayToStringService {

    convertedString: string = "";
    convertedArray: any = [];
    convertedIntegerArray: number[] = [];
    constructor() { }

    ArrayToStringConvert(AnyArray) {
        this.convertedString = "";
        if (AnyArray && AnyArray.length > 0) {
            AnyArray.forEach(element => {
                this.convertedString += element + ",";
            });
            //console.log(this.convertedString);
            if (this.convertedString != "") {
                this.convertedString = this.convertedString.substring(0, (this.convertedString.length) - 1);
            }
        }
        return this.convertedString;
    }

    StringToStringArrayConvert(AnyString) {
        this.convertedArray = [];
        if (AnyString && AnyString.length > 0) {
            let SplitedString = AnyString.split(",");
            for (let index = 0; index < SplitedString.length; index++) {
                this.convertedArray.push(SplitedString[index]);
            }
        }
        return this.convertedArray;
    }

    StringToIntegerArrayConvert(AnyString) {
        this.convertedIntegerArray = [];
        if (AnyString && AnyString.length > 0) {
            let SplitedString = AnyString.split(",");
            for (let index = 0; index < SplitedString.length; index++) {
                this.convertedIntegerArray.push(+SplitedString[index]);
            }
        }
        return this.convertedIntegerArray;
    }

    DateArrayToStringofDateConvert(AnyArray) {
        this.convertedString = "";
        if (AnyArray && AnyArray.length > 0) {
            AnyArray.forEach(element => {
                let fixedDateFormat = new Date(element);
                let dd: number = fixedDateFormat.getDate();
                let mm: number = fixedDateFormat.getMonth() + 1;
                let yyyy: number = fixedDateFormat.getFullYear();
                let dateString: string = dd + '/' + mm + '/' + yyyy
                this.convertedString += dateString + ",";
            });
            //console.log(this.convertedString);
            if (this.convertedString != "") {
                this.convertedString = this.convertedString.substring(0, (this.convertedString.length) - 1);
            }
        }
        return this.convertedString;
    }

    StringofDatesToDateArrayConvert(AnyString) {
        this.convertedArray = [];
        if (AnyString && AnyString.length > 0) {
            let SplitedString = AnyString.split(",");
            for (let index = 0; index < SplitedString.length; index++) {
                this.convertedArray.push(new Date(SplitedString[index]));
            }
        }
        return this.convertedArray;
    }
}