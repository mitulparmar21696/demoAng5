export class Destination {
    ID: number;
    DestinationID :number;
    TourTypeID: number;
    TourCategory: string; // pass id in comma separeted
    CountryID: string; // pass id in comma separeted
    DestinationName: string;
    BestTimeToVisit: string; // from backpanel if select nov(12) to jan(1) then you need to pass 11,12,1
    Description: string;
    HotelID: string; // pass id in comma separeted
    Document: string; // always pass blank
    IsCustomize: number; // always pass 0
    CurrencyID: number;
    Priority: number;
    MetaDescription: string;
    MetaTitle: string;
    MetaKeywords: string;
    IsActive: boolean;
    OperationType: string;

}
