export class Attraction {
    ID: number;
    AttractionName: string;
    AttractionType: string;
    City: string;
    CityID: number;
    CountryID: number;
    Description: string;

    AttractionTypeID: number;
    StateID: number;
    IsActive: boolean;
    CreateOn: string;
    ModifiedOn: string;
    Image: string;
}
export class AttractionType {
    AttractionID: number;
    AttractionName: string;
   
}
export class City {
    ID: number;
    IsActive: number;
    CityName: string;
    StateID: number;
    
}
