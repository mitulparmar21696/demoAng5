export class Package {
    ID: number;
    DestinationID: number;
    PackageName: string;
    Day: number;
    Night: number;
    Description: string;
    Notes: string;
    IsDiscount: boolean;  // if discount available then pass 1(rs & percentage two type of discount)
    Discount: number;  // pass discount value
    IsRupees: boolean; // if discount in rs then pass 1
    FacilityID: string;
    UserID: number; // pass 0
    IsCustomize: number; // pass 0
    IsFixedDate: boolean; //if isfixdate = 0 then pass blank in fixdate,if 1 then pass selected dates
    FixedDate: string;
    IsGroupPackage: boolean; // it package is group tour then pass 1
    MinAmountPaid: number;
    IsActive: boolean;
    PackageImage : string;
}
