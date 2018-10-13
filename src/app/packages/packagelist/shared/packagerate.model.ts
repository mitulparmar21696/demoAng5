export class Packagerate {
    ID: number;
    PackageID: number;
    CurrencyID: number;
    PersonType: boolean;   //1 for per person & 0 for per couple
    Rate: number;
    RateDescription: string;
    ThreeSharingRate: number;
    ThreeSharingRateDescription: string;
    FourSharingRate: number;
    FourSharingRateDescription: string;
    PackageRateTypeID: number;
    PackageRateTypeDescription: string;
    FromDate: string;
    ToDate: string;
    Childrate_bed: number;
    Childrate_BedDescription: string;
    Childrate: number;
    ChildrateDescription: string;
    Infant: number;
    InfantDescription: string;
    IsActive: boolean;
}

