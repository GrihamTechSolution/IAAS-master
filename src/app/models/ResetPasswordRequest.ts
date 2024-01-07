export class ResetPasswordRequest {
    id: number;
    email: string; 
    isServed: number;
    guid: string; 
    created: Date;
    updated: Date;
    newPassword: string;
    newPasswordConfirm: string;
}