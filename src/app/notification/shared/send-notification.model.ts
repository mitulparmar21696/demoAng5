export class SendNotification {
    ID: number;
    UserID: number;
    IsEmail: boolean;
    Subject: string;
    Content: string;
    IsSMS: boolean;
    SMSText: string;
    IsPushNotification: boolean;
    PushNotificationText: string;
    LastChanged: string;
    IsActive: boolean;
}
