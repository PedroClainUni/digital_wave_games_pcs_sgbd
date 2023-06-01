export interface PostConfirmationCodesDTO {
    email: string;
    code?: string;
    expirationDate?: Date;
    accountId?: number
}
