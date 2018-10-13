export class Hotel {
    ID: number;
    Address: string;
    CityID: number;
    CityName: string;
    StateID: number;
    CountryID: number;
    Description: string;
    DestinationID: number;
    Email: string;
    FacilityID: string;
    Landline: string;
    Landmark: string;
    Mobile: string;
    Name: string;
    PackageID: number;
    Rating: number;
    Star: number;
    Website: string;
    ZipCode: string;
    IsActive: boolean;
    FacilityName: string;
    FacilityType: string;
    HotelImage:any;
}
export class City {
    ID: number;
    IsActive: number;
    CityName: string;
    StateID: number;
    
}
export class Facility {
    ID: number;
    Name: string;    
}
