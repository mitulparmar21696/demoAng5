import { InvoiceDetails } from "./invoice-detail.model";

export class InvoiceDetailForm {
    Description: string;
    Discount: number;  // pass discount value
    DiscountPercentage: number;
    DueBalance: number;
    DueDate: string;
    GrandTotal: number;
    Image: string;
    InvoiceDate: string;
    InvoiceDateTime: string;
    InvoiceDetails: InvoiceDetails[];
    InvoiceID: number;
    InvoiceNo: number;
    InvoiceStatus: string;
    InvoiceTitle: string;
    SubTotal: number;
    Tex: number;
    TotalTax: number;

    UserID: number;
    AdminID: number;
    UserName: string;
    EmailID: string;
    MobileNo: number;
    TotalAmount: number;
    
    BalanceDate: string;
    Quantity: number;
    Rate: number;
    IsDiscount: boolean;  // if discount available then pass 1(rs & percentage two type of discount)
    
    IsRupees: boolean; // if discount in rs then pass 1
    DisAmount: number;
    TaxAmount: number;
    BalanceDue: number;
    DiscountAmount: number;
    OprationType: string;
}
