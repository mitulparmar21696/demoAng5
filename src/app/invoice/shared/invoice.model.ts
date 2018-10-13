import { InvoiceDetails } from "./invoice-detail.model";

export class Invoice {
    ID: number;
    UserID: number;
    AdminID: number;
    InvoiceNo: number;
    InvoiceDateTime: string;
    InvoiceDate: string;
    UserName: string;
    EmailID: string;
    MobileNo: number;
    TotalAmount: number;
    InvoiceStatus: boolean;
    DueDate: string;
    BalanceDate: string;
    Description: string;
    Quantity: number;
    Rate: number;
    GrandTotal: number;
    SubTotal: number;
    IsDiscount: boolean;  // if discount available then pass 1(rs & percentage two type of discount)
    Discount: number;  // pass discount value
    IsRupees: boolean; // if discount in rs then pass 1
    DisAmount: number;
    TaxAmount: number;
    InvoiceDetails: InvoiceDetails[];
    BalanceDue: number;
    DiscountAmount: number;
}
