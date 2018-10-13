import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable()
export class HeaderVariableService {

    sharedHeaderString : string = "Admin Panel";

    constructor(){
        
    }
}